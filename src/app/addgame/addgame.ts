import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service'; 
import { API_ENDPOINT } from '../../../config/constants';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-addgame',
  standalone: true,
  imports: [CommonModule, FormsModule ,RouterModule],
  templateUrl: './addgame.html',
  styleUrls: ['./addgame.scss']
})
export class Addgame {
  game_name = '';
  price: number | null = null;
  description = '';
  category_id: number | null = null;
  imageFile: File | null = null;
  addgameForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  imagePreview: string | ArrayBuffer | null = null;
  uid: string | null = null;
  name: string | null = null;
  email: string | null = null;
  role: string | null = null;
  avatarUrl: string | null = null;

  constructor(private fb: FormBuilder,
      private http: HttpClient,
      private appService: AppService,
      private router: Router) {
      this.addgameForm = this.fb.group({
      game_name: ['', Validators.required],
      price: ['', [Validators.required]],
      description: ['', Validators.required],
      category_id: ['', Validators.required]
    });
  }
  ngOnInit(): void {   // <-- ต้องมี method นี้
    this.appService.loadUserFromStorage();

    this.uid = this.appService.uid;
    this.name = this.appService.name;
    this.email = this.appService.email;
    this.role = this.appService.role;
    this.avatarUrl = this.appService.avatarUrl;
  }
   onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (file) {
      this.selectedFile = file;

      // แสดง preview รูป
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedFile = null;
      this.previewUrl = null;
    }
  }

  private logFormData(fd: FormData) {
    // วิธีดู FormData: iterate entries
    console.log('--- FormData contents ---');
    for (const pair of Array.from(fd.entries())) {
      console.log(pair[0], pair[1]);
    }
    console.log('-------------------------');
  }

saveGame() {
  // ตรวจสอบ field ที่ห้ามว่าง
    if (!this.game_name.trim() || !this.description.trim()) {
      alert('กรุณากรอกชื่อเกมและรายละเอียด');
      return;
    }

    const formData = new FormData();
    formData.append('game_name', this.game_name.trim());
    formData.append('price', (this.price ?? 0).toString());          // ถ้า null ส่ง 0
    formData.append('description', this.description.trim());
    formData.append('category_id', (this.category_id ?? 0).toString()); // ถ้า null ส่ง 0
    
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }


  this.http.post(`${API_ENDPOINT}/addgame`, formData, { observe: 'response' })
    .subscribe({
      next: (res: any) => {
          alert(res.message || 'เพิ่มเกมสำเร็จ');

          // เคลียร์ฟอร์ม
          this.game_name = '';
          this.price = null;
          this.description = '';
          this.category_id = null;
          this.selectedFile = null;
          this.previewUrl = null;
        this.router.navigate(['/admin']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('HTTP error', err);
        const msg = err.error?.error || err.message || 'Unknown error';
        alert('Error: ' + msg);
      }
    });
}

}
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  selectedFile!: File; // ใช้ definite assignment

  imagePreview: string | ArrayBuffer | null = null;


  constructor(private http: HttpClient, private router: Router) {}

saveGame() {
  if (!this.game_name || !this.price || !this.description || !this.category_id ) {
    alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
    return;
  }
  

  const formData = new FormData();
  formData.append('game_name', this.game_name);
  formData.append('price', this.price.toString());
  formData.append('description', this.description);
  formData.append('category_id', this.category_id.toString());
  formData.append('image', this.selectedFile); // ต้องตรงกับ upload.single("image")

  this.http.post('https://apigameshop-2yg2.vercel.app/api/games', formData)
    .subscribe({
      next: (res: any) => {
        alert(res.message);
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error('API error:', err);
        alert(err.error?.error || 'เกิดข้อผิดพลาดในการเพิ่มเกม');
      }
    });
}

// สำหรับ preview รูป
onFileChange(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result as string;
    reader.readAsDataURL(file);
  }
}



}
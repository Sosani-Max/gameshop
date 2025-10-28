import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_ENDPOINT } from '../../../config/constants';
import { AppService } from '../app.service'; 
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule,ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit{
  registerForm: any;
  uid: string | null = null;
  name: string | null = null;
  email: string | null = null;
  role: string | null = null;
  avatarUrl: string | null = null;
  selectedFile: File | null = null;
  profileForm: FormGroup;

 constructor(private router : Router,
  private fb: FormBuilder,
  private appService: AppService,
  private http: HttpClient){
    // สร้าง form
    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    // โหลดค่า user จาก service
    this.appService.loadUserFromStorage();

    // patch ค่าลง form
    this.profileForm.patchValue({
      name: this.appService.name,
      email: this.appService.email
    });

    // แสดง avatar เดิม
    this.avatarUrl = this.appService.avatarUrl;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges() {
    console.log('Form value:', this.profileForm.value);
    console.log('Selected file:', this.selectedFile);

    // TODO: ส่งไป backend และ update AppService
  }

 } 

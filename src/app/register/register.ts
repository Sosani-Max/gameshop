import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { API_ENDPOINT } from '../../../config/constants';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  registerForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      conpass: ['', Validators.required]
    });
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

  onSubmit() {
  if (!this.registerForm.valid) {
    alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    return;
  }

  const { password, conpass } = this.registerForm.value;

  // เช็คว่ารหัสผ่านตรงกันหรือไม่
  if (password !== conpass) {
    alert('รหัสผ่านไม่ตรงกัน');
    return; // ไม่ส่งข้อมูลไปยัง API
  }

  const formData = new FormData();
  formData.append('name', this.registerForm.get('name')?.value);
  formData.append('email', this.registerForm.get('email')?.value);
  formData.append('password', password);
  if (this.selectedFile) {
    formData.append('avatar', this.selectedFile);
  }

  console.log('API_ENDPOINT =', API_ENDPOINT);
  // this.logFormData(formData);

  this.http.post(`${API_ENDPOINT}/register`, formData, { observe: 'response' })
    .subscribe({
      next: (response) => {
        console.log('Response status:', response.status);
        console.log('Response body:', response.body);
        alert('Register successful!');
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('HTTP error', err);
        const msg = err.error?.error || err.message || 'Unknown error';
        alert('Error: ' + msg);
      }
    });
}

}

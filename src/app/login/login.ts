import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.http.post('http://localhost:3000/login', this.loginForm.value)
        .subscribe({
          next: (res: any) => {
            // ตรวจสอบ role ที่ backend ส่งมา
            if (res.role === 'admin') {
              alert(res.message || 'เข้าสู่ระบบสำเร็จ (Admin)');
              this.router.navigate(['/admin']); // ไปหน้า admin
            } else if (res.role === 'user') {
              alert(res.message || 'เข้าสู่ระบบสำเร็จ');
              this.router.navigate(['/homelogin']); // ไปหน้า user/home
            } else {
              alert('ไม่พบบทบาทผู้ใช้');
            }
          },
          error: (err) => {
            alert(err.error?.error || 'เกิดข้อผิดพลาด');
          }
        });
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  }
}

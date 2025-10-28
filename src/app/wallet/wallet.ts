import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../app.service'; 
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '../../../config/constants';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './wallet.html',
  styleUrls: ['./wallet.scss']
})
export class Wallet implements OnInit {

  uid: string | null = null;
  name: string | null = null;
  email: string | null = null;
  role: string | null = null;
  avatarUrl: string | null = null;
  wallet: number | null = null;
  depositAmount: number | null = null; // ค่า input

  constructor(
    private router : Router,
    private appService: AppService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // โหลดข้อมูล user
    this.appService.loadUserFromStorage();

    this.uid = this.appService.uid;
    this.name = this.appService.name;
    this.email = this.appService.email;
    this.role = this.appService.role;
    this.avatarUrl = this.appService.avatarUrl;

    // subscribe wallet ให้ reactive
    this.appService.wallet$.subscribe(wallet => {
      this.wallet = wallet;
    });
  }

  // เลือกยอดเติมเงินจากปุ่ม preset
  selectAmount(amount: number) {
    this.depositAmount = amount;
  }

  deposit() {
  if (!this.depositAmount || this.depositAmount <= 0) {
    alert('กรุณากรอกจำนวนเงินที่ต้องการเติม');
    return;
  }

  const amount = this.depositAmount;

  // เรียก API เติมเงินจริง
  this.http.post<{ newWallet: number }>(`${API_ENDPOINT}/wallet`, {
    uid: this.uid,
    wallet: amount
  }).subscribe({
    next: (res) => {
      console.log('เติมเงินสำเร็จ', res);

      // อัพเดต wallet ใน BehaviorSubject
      this.appService.updateWallet(res.newWallet);

      // ถ้าต้องการให้ setUser เก็บค่าใน localStorage ด้วย
      this.appService.setUser({
        uid: this.uid!,
        name: this.name!,
        email: this.email!,
        role: this.role!,
        avatarUrl: this.avatarUrl,
        wallet: res.newWallet
      });

      // ล้าง input
      this.depositAmount = null;
    },
    error: (err) => {
      console.error('เติมเงินล้มเหลว', err);
      alert('เติมเงินล้มเหลว');
    }
  });
}

  
}

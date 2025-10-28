import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppService, CartItem, Game } from '../app.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_ENDPOINT } from '../../../config/constants';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule ],
  templateUrl: './basket.html',
  styleUrl: './basket.scss'
})
export class Basket implements OnInit{
  uid: string | null = null;
  name: string | null = null;
  email: string | null = null;
  role: string | null = null;
  avatarUrl: string | null = null;

  wallet: number | null = null;
  games: Game[] = [];
  
 
  showModal: boolean = false;

   basket: any[] = [];
  
  cart: any[] = [];

total: number = 0;
discountedTotal: number | null = null;
discountCode: string = '';

 constructor(
  private router : Router,
  private appService: AppService,
  private http: HttpClient)
  {}

  ngOnInit(): void {
    this.appService.loadUserFromStorage();

    this.uid = this.appService.uid;
    this.name = this.appService.name;
    this.email = this.appService.email;
    this.role = this.appService.role;
    this.avatarUrl = this.appService.avatarUrl;
    this.appService.wallet$.subscribe(wallet => {
    this.wallet = wallet;
    });
    

    this.appService.loadBasket();
    this.appService.basket$.subscribe(items => {
     this.appService.basket$.subscribe(items => {
    this.cart = items;
    this.calculateTotal();
  });
  });
this.appService.loadBasket();
  this.appService.basket$.subscribe(c => {
    this.cart = c;
    this.total = this.appService.getTotal(); // อัปเดตยอดรวม
  });

    
  }
 calculateTotal() {
  this.total = this.cart.reduce((sum, g) => sum + Number(g.price || 0), 0);
  this.discountedTotal = null; // reset ถ้าไม่มีโค้ด
}

  removeItem(game_id: number) {
  this.appService.removeFromBasket(game_id);
}

  openModal() {
    if (this.cart.length === 0) return alert('ไม่มีเกมในตะกร้า');
    this.showModal = true;
    
  }

  closeModal() {
    this.showModal = false;
  }

  applyDiscount() {
  if (!this.discountCode) return;

  this.http.post(`${API_ENDPOINT}/code`, { uid: this.appService.uid, code: this.discountCode })
    .subscribe({
      next: (res: any) => {
        const persen = Number(res.persen || 0);
        this.discountedTotal = this.total - (this.total * persen / 100);
        
        alert(`โค้ดใช้ได้! ลด ${persen}%`);
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.error || "โค้ดใช้ไม่ได้");
        this.discountedTotal = null;
      }
    });
}

pay() {
  if (!this.uid) return alert('ไม่พบผู้ใช้');

  // รวมราคาปกติทั้งหมด
  const totalOriginal = this.cart.reduce((sum, g) => sum + g.price, 0);

  // ใช้ nullish coalescing ให้ discountedTotal เป็น 0 ถ้า null
  const discounted = this.discountedTotal ?? 0;

  // ตรวจว่ามีส่วนลดหรือไม่
  const useDiscount = discounted > 0 && discounted < totalOriginal;

  // สร้าง payload ของเกมแต่ละเกม
  const gamesPayload = this.cart.map(g => ({
    game_id: g.game_id,
    game_name: g.game_name,
    price: useDiscount
      ? (g.price / totalOriginal) * discounted // แบ่งส่วนลดตามสัดส่วน
      : g.price
  }));

  // สร้าง payload สำหรับ POST
  const payload = {
    uid: this.uid,
    games: gamesPayload,
    totalPrice: useDiscount ? discounted : totalOriginal,
    discountCode: this.discountCode || null
  };

  // เรียก API buygame
  this.http.post(`${API_ENDPOINT}/buygame`, payload).subscribe({
    next: (res: any) => {
      alert(`ซื้อสำเร็จ! จำนวนเกม: ${this.cart.length}, รวมราคา: ${res.totalPrice} Bath`);
      
      // อัปเดต wallet ใน AppService ให้ล่าสุด
      this.appService.updateWallet(res.newWallet);
      this.appService.setUser({
        uid: this.uid!,
        name: this.name!,
        email: this.email!,
        role: this.role!,
        avatarUrl: this.avatarUrl,
        wallet: res.newWallet
      });
      this.loadMyGames();

      // ล้างตะกร้า
      this.appService.clearBasket();
      this.discountCode = '';
      this.showModal = false;
    },
    error: err => {
      console.error(err);
      alert(err.error?.error || 'ซื้อเกมล้มเหลว');
    }
  });
}
loadMyGames() {
    if (!this.uid) return; // ป้องกัน uid เป็น null

    this.appService.getMyGames(this.uid).subscribe({
      next: res => {
        this.games = res.games;
      },
      error: err => {
        console.error('โหลดเกมล้มเหลว', err);
      }
    });
  }

}

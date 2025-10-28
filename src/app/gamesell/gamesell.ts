import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppService, CartItem } from '../app.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_ENDPOINT } from '../../../config/constants';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-gamesell',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './gamesell.html',
  styleUrl: './gamesell.scss'
})
export class Gamesell implements OnInit {
  uid: string | null = null;
  name: string | null = null;
  email: string | null = null;
  role: string | null = null;
  avatarUrl: string | null = null;
  selectedGame: any = null;
  wallet: number | null = null;


  constructor(private router: Router,
    private appService: AppService,
    private http: HttpClient) {
  }
  ngOnInit(): void {
    this.appService.loadUserFromStorage();

    this.uid = this.appService.uid;
    this.name = this.appService.name;
    this.email = this.appService.email;
    this.role = this.appService.role;
    this.avatarUrl = this.appService.avatarUrl;
    this.appService.selectedGame$.subscribe(game => {
      this.selectedGame = game;
    });
    this.appService.wallet$.subscribe(wallet => {
      this.wallet = wallet;
    });
  }

  addToCart() {
  if (!this.selectedGame) return;

  const item: CartItem = {
    game_id: this.selectedGame.game_id,
    game_name: this.selectedGame.game_name,
    price: this.selectedGame.price,
    image: this.selectedGame.image,
    category_type: this.selectedGame.category_type,
    release_date: this.selectedGame.release_date,
    sale_count: this.selectedGame.sale_count,
    description: this.selectedGame.description
  };

  this.appService.addToBasket(item);
  alert('เพิ่มในตะกร้าสำเร็จ!');
}


  goToBasket() {
    this.router.navigate(['/basket']); // ใช้ Angular Router
  }

  goToPayment() {
    this.router.navigate(['/make-payment']); // หรือส่ง cart ไปหน้าชำระเงิน
  }
}

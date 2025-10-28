import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { API_ENDPOINT } from '../../config/constants';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

export interface CartItem {
  game_id: number;
  game_name: string;
  price: number;
  image?: string;
  category_type?: string;
  release_date?: string;  // หรือ Date
  sale_count?: number;
  description?: string;
}

export interface Game {
  game_id: string;
  game_name: string;
  price: number;
  category: string;
  description: string;
  release_date: string;
  image: string;

}

@Injectable({ providedIn: 'root' })
export class AppService {
  private basketSubject = new BehaviorSubject<any[]>([]);
  basket$ = this.basketSubject.asObservable();
  

  private cart: CartItem[] = [];
  private selectedBuyGameSubject = new BehaviorSubject<any>(null);
  selectedBuyGame$ = this.selectedBuyGameSubject.asObservable();

  private topGamesSource = new BehaviorSubject<any[]>([]);
  topGames$ = this.topGamesSource.asObservable();

  private walletSource = new BehaviorSubject<number | null>(null);
  wallet$ = this.walletSource.asObservable();

  private gamesSource = new BehaviorSubject<any[]>([]);
  games$ = this.gamesSource.asObservable();

  private selectedGameSource = new BehaviorSubject<any | null>(null);
  selectedGame$ = this.selectedGameSource.asObservable();

  uid: string | null = null;
  name: string | null = null;
  email: string | null = null;
  role: string | null = null;
  avatarUrl: string | null = null;

  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) { 
    if (isPlatformBrowser(this.platformId)) {
      this.loadBasket();
    }
  }

  setUser(user: { uid: string, name: string, email: string, role: string, avatarUrl: string | null, wallet: number }) {
    this.uid = user.uid;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.avatarUrl = user.avatarUrl;

    // ใช้ BehaviorSubject แทน
    this.walletSource.next(user.wallet);

    localStorage.setItem('user', JSON.stringify(user));
  }

  loadUserFromStorage() {
    const stored = localStorage.getItem('user');
    if (stored) {
      const user = JSON.parse(stored);
      this.uid = user.uid;
      this.name = user.name;
      this.email = user.email;
      this.role = user.role;
      this.avatarUrl = user.avatarUrl;
      this.walletSource.next(user.wallet);
    }
  }

  updateWallet(amount: number) {
    this.walletSource.next(amount);
  }

  clearUser() {
    this.uid = null;
    this.name = null;
    this.email = null;
    this.role = null;
    this.avatarUrl = null;
    this.walletSource.next(null);
    localStorage.removeItem('user');
  }
  isLoggedIn(): boolean {
    return !!this.uid
      ;
  }

  setGames(games: any[]) {
    this.gamesSource.next(games);
  }

  selectGame(game: any) {
    this.selectedGameSource.next(game);
  }

getMyGames(uid: string): Observable<{ games: Game[] }> {
    return this.http.get<{ games: Game[] }>(`${API_ENDPOINT}/mygame?uid=${uid}`);
  }

  loadTopGames() {
    this.http.get<{ topGames: any[] }>(`${API_ENDPOINT}/topsell`)
      .subscribe({
        next: res => this.topGamesSource.next(res.topGames),
        error: err => console.error('โหลด Top Games ล้มเหลว', err)
      });
  }

  setTopGames(games: any[]) {
    this.topGamesSource.next(games);
  }

  loadBasket() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('basket');
      if (saved) this.basketSubject.next(JSON.parse(saved));
    }
  }

  saveBasket() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('basket', JSON.stringify(this.basketSubject.value));
    }
  }

  calculateTotal(): number {
  return this.basketSubject.value.reduce((sum, g) => sum + Number(g.price || 0), 0);
}

// --- แก้ฟังก์ชัน add/remove เพื่ออัปเดต total อัตโนมัติ ---
addToBasket(game: any) {
  const current = [...this.basketSubject.value];
  if (!current.find(g => g.game_id === game.game_id)) {
    current.push(game);
    this.basketSubject.next(current);
    this.saveBasket();
  }
}

removeFromBasket(game_id: any) {
  const current = this.basketSubject.value.filter(g => g.game_id !== game_id);
  this.basketSubject.next(current);
  this.saveBasket();
}

// --- ฟังก์ชันใหม่สำหรับดึง total ---
getTotal(): number {
  return this.calculateTotal();
}

  clearBasket() {
    this.basketSubject.next([]);
    this.saveBasket();
  }

  
  

}

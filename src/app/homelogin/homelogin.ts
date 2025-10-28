import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppService } from '../app.service'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_ENDPOINT } from '../../../config/constants';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-homelogin',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule ],
  templateUrl: './homelogin.html',
  styleUrl: './homelogin.scss'
})
export class Homelogin implements OnInit{
  //  games: { game_name: string; price: number; image: string }[] = [];
  topGames: any[] = [];
  games: any[] = [];
  searchTerm: string = '';

  uid: string | null = null;
  name: string | null = null;
  email: string | null = null;
  role: string | null = null;
  avatarUrl: string | null = null;
  wallet: number | null = null;


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
    

    this.loadAllGames();
    this.appService.loadTopGames();

    // subscribe เพื่อรับข้อมูลล่าสุด
    this.appService.topGames$.subscribe(games => {
      this.topGames = games;
      console.log('Top 10 Games:', this.topGames);
    });
  }
  
   loadAllGames() {
    this.http.get<{ games: any[] }>(`${API_ENDPOINT}/allgame`)
      .subscribe({
        next: (res) => {
          this.games = res.games;
          this.appService.setGames(res.games);
        },
        error: (err) => {
          console.error(err);
          alert('ไม่สามารถโหลดข้อมูลเกมได้');
        }
      });
  }
  onSearchChange() {
    const query = this.searchTerm.trim();

    if (query === '') {
      this.loadAllGames(); // ถ้าเคลียร์ช่องค้นหา ให้โหลดทั้งหมด
    } else {
      this.searchGames(query).subscribe({
        next: (res) => {
          this.games = res.games;
        },
        error: (err) => console.error('ค้นหาเกมล้มเหลว', err)
      });
    }
  }
  searchGames(query: string) {
    return this.http.get<any>(`${API_ENDPOINT}/searchgame?q=${query}`);
  }
  onSelectGame(game: any) {
    this.appService.selectGame(game);  // ส่ง game ที่ถูกเลือก
    this.router.navigate(['/gamesell']); // ไปหน้า gamesell
  }
   scrollLeft() {
    const container = document.getElementById('sellerContainer');
    if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    const container = document.getElementById('sellerContainer');
    if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
  }

 } 
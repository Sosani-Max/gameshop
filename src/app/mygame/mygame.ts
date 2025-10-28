import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppService, Game } from '../app.service';

@Component({
  selector: 'app-mygame',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './mygame.html',
  styleUrls: ['./mygame.scss'] // แก้จาก styleUrl → styleUrls
})
export class Mygame implements OnInit {
  games: Game[] = [];

  uid: string | null = null;
  name: string | null = null;
  email: string | null = null;
  role: string | null = null;
  avatarUrl: string | null = null;
  wallet: number | null = null;

  constructor(
    private router: Router,
    private appService: AppService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // โหลดข้อมูล user จาก storage
    this.appService.loadUserFromStorage();

    this.uid = this.appService.uid;
    this.name = this.appService.name;
    this.email = this.appService.email;
    this.role = this.appService.role;
    this.avatarUrl = this.appService.avatarUrl;

    // subscribe wallet
    this.appService.wallet$.subscribe(wallet => {
      this.wallet = wallet;
    });

    // โหลดเกมของผู้ใช้
    this.loadMyGames();
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppService } from '../app.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_ENDPOINT } from '../../../config/constants';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-namegame',
  standalone: true,
  imports: [RouterModule, CommonModule, ],
  templateUrl: './namegame.html',
  styleUrl: './namegame.scss'
})
export class Namegame implements OnInit{
  uid: string | null = null;
  name: string | null = null;
  email: string | null = null;
  role: string | null = null;
  avatarUrl: string | null = null;
  selectedGame: any = null;


  constructor(private router: Router,
    private appService: AppService,
    private http: HttpClient) {
  }
  ngOnInit(): void {
    this.appService.selectedGame$.subscribe(game => {
      this.selectedGame = game;
    });
  }
 } 

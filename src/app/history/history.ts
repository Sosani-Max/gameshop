import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppService } from '../app.service'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_ENDPOINT } from '../../../config/constants';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule ],
  templateUrl: './history.html',
  styleUrl: './history.scss'
})
export class History implements OnInit{

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
 
     
   }
 } 
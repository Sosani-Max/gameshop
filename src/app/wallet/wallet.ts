import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wallet',
    standalone: true,
  imports: [RouterModule],
  templateUrl: './wallet.html',
  styleUrl: './wallet.scss'
})
export class Wallet {
 constructor(private router : Router){
    

  }
 } 

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mpm-basket',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './mpm-basket.html',
  styleUrl: './mpm-basket.scss'
})
export class MpmBasket {
 constructor(private router : Router){
    

  }
 } 


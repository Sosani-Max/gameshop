import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-promotion',
    standalone: true,
  imports: [RouterModule],
  templateUrl: './promotion.html',
  styleUrl: './promotion.scss'
})
export class Promotion {
 constructor(private router : Router){
    

  }
 } 

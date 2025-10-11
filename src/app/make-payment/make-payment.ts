import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-make-payment',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './make-payment.html',
  styleUrl: './make-payment.scss'
})
export class MakePayment {
 constructor(private router : Router){
    

  }
 } 

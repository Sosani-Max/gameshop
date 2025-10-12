import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer',
    standalone: true,
  imports: [RouterModule],
  templateUrl: './customer.html',
  styleUrl: './customer.scss'
})
export class Customer {
 constructor(private router : Router){
    

  }
 } 

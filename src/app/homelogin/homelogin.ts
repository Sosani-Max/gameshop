import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homelogin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './homelogin.html',
  styleUrl: './homelogin.scss'
})
export class Homelogin {
 constructor(private router : Router){
    

  }
 } 
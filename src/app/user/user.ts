import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.html',
  styleUrl: './user.scss'
})
export class User {
 constructor(private router : Router){
    

  }
 } 

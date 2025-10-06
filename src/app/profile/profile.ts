import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
registerForm: any;
 constructor(private router : Router){
    

  }
 } 

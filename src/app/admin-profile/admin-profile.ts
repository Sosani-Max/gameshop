import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-admin-profile',
    standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.scss'
})
export class AdminProfile {
 constructor(private router : Router){
    

  }
 } 

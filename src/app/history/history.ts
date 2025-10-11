import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './history.html',
  styleUrl: './history.scss'
})
export class History {
 constructor(private router : Router){
    

  }
 } 
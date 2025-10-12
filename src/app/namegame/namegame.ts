import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-namegame',
    standalone: true,
  imports: [RouterModule],
  templateUrl: './namegame.html',
  styleUrl: './namegame.scss'
})
export class Namegame {
 constructor(private router : Router){
    

  }
 } 

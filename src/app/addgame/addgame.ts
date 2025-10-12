import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-addgame',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './addgame.html',
  styleUrl: './addgame.scss'
})
export class Addgame {
 constructor(private router : Router){
    

  }
 } 
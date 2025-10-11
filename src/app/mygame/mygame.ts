import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mygame',
    standalone: true,
  imports: [RouterModule],
  templateUrl: './mygame.html',
  styleUrl: './mygame.scss'
})
export class Mygame {
 constructor(private router : Router){
    

  }
 } 
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-editgame',
    standalone: true,
  imports: [RouterModule],
  templateUrl: './editgame.html',
  styleUrl: './editgame.scss'
})
export class Editgame {
 constructor(private router : Router){
    

  }
 } 

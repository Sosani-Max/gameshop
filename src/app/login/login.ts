import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
 constructor(private router : Router){
    

  }
}

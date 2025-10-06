import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
constructor(private router : Router){
    

  }
}

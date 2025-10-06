import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home {
dropdownOpen: any;
 constructor(private router : Router){
    

}
toggleDropdown() {
throw new Error('Method not implemented.');
}
filterGames(arg0: string) {
throw new Error('Method not implemented.');
}

}


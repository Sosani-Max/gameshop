import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('GameShop');
  products = signal<any[]>([]);

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.getProducts().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('โหลดข้อมูลไม่สำเร็จ:', err)
    });
  }
}

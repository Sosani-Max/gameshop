import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mygame } from './mygame';

describe('Mygame', () => {
  let component: Mygame;
  let fixture: ComponentFixture<Mygame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mygame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mygame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

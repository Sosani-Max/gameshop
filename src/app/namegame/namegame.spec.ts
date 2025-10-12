import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Namegame } from './namegame';

describe('Namegame', () => {
  let component: Namegame;
  let fixture: ComponentFixture<Namegame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Namegame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Namegame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

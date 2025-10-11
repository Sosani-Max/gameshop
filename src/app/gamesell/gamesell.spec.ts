import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gamesell } from './gamesell';

describe('Gamesell', () => {
  let component: Gamesell;
  let fixture: ComponentFixture<Gamesell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gamesell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gamesell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

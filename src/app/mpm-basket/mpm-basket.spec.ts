import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpmBasket } from './mpm-basket';

describe('MpmBasket', () => {
  let component: MpmBasket;
  let fixture: ComponentFixture<MpmBasket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpmBasket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpmBasket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestCardsComponent } from './guest-cards.component';

describe('GuestCardsComponent', () => {
  let component: GuestCardsComponent;
  let fixture: ComponentFixture<GuestCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

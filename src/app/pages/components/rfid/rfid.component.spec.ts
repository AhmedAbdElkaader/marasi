import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RFIDComponent } from './rfid.component';

describe('RFIDComponent', () => {
  let component: RFIDComponent;
  let fixture: ComponentFixture<RFIDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RFIDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RFIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

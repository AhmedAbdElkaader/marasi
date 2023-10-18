import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsearchComponent } from './unitsearch.component';

describe('UnitsearchComponent', () => {
  let component: UnitsearchComponent;
  let fixture: ComponentFixture<UnitsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

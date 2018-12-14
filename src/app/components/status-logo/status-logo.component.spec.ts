import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusLogoComponent } from './status-logo.component';

describe('StatusLogoComponent', () => {
  let component: StatusLogoComponent;
  let fixture: ComponentFixture<StatusLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

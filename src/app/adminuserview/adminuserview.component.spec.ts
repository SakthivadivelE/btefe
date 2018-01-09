import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminuserviewComponent } from './adminuserview.component';

describe('AdminuserviewComponent', () => {
  let component: AdminuserviewComponent;
  let fixture: ComponentFixture<AdminuserviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminuserviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminuserviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

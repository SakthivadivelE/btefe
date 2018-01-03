import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveissueComponent } from './approveissue.component';

describe('ApproveissueComponent', () => {
  let component: ApproveissueComponent;
  let fixture: ComponentFixture<ApproveissueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveissueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

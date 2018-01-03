import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewissueComponent } from './addnewissue.component';

describe('AddnewissueComponent', () => {
  let component: AddnewissueComponent;
  let fixture: ComponentFixture<AddnewissueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewissueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

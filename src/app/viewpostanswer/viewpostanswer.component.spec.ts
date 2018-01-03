import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpostanswerComponent } from './viewpostanswer.component';

describe('ViewpostanswerComponent', () => {
  let component: ViewpostanswerComponent;
  let fixture: ComponentFixture<ViewpostanswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpostanswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpostanswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

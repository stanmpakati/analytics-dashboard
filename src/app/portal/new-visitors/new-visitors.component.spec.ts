import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVisitorsComponent } from './new-visitors.component';

describe('NewVisitorsComponent', () => {
  let component: NewVisitorsComponent;
  let fixture: ComponentFixture<NewVisitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVisitorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

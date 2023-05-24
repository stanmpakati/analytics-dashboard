import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferrersComponent } from './referrers.component';

describe('ReferrersComponent', () => {
  let component: ReferrersComponent;
  let fixture: ComponentFixture<ReferrersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferrersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferrersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

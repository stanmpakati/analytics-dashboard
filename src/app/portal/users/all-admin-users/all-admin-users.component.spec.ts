import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAdminUsersComponent } from './all-admin-users.component';

describe('AllAdminUsersComponent', () => {
  let component: AllAdminUsersComponent;
  let fixture: ComponentFixture<AllAdminUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAdminUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkClicksComponent } from './link-clicks.component';

describe('LinkClicksComponent', () => {
  let component: LinkClicksComponent;
  let fixture: ComponentFixture<LinkClicksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkClicksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkClicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

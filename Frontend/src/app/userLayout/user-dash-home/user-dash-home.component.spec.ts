import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashHomeComponent } from './user-dash-home.component';

describe('UserDashHomeComponent', () => {
  let component: UserDashHomeComponent;
  let fixture: ComponentFixture<UserDashHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDashHomeComponent]
    });
    fixture = TestBed.createComponent(UserDashHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

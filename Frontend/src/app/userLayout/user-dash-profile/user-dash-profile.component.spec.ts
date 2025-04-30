import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashProfileComponent } from './user-dash-profile.component';

describe('UserDashProfileComponent', () => {
  let component: UserDashProfileComponent;
  let fixture: ComponentFixture<UserDashProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDashProfileComponent]
    });
    fixture = TestBed.createComponent(UserDashProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

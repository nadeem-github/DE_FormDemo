import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashMenuComponent } from './user-dash-menu.component';

describe('UserDashMenuComponent', () => {
  let component: UserDashMenuComponent;
  let fixture: ComponentFixture<UserDashMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDashMenuComponent]
    });
    fixture = TestBed.createComponent(UserDashMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

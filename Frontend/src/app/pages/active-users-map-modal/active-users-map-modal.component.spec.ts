import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUsersMapModalComponent } from './active-users-map-modal.component';

describe('ActiveUsersMapModalComponent', () => {
  let component: ActiveUsersMapModalComponent;
  let fixture: ComponentFixture<ActiveUsersMapModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveUsersMapModalComponent]
    });
    fixture = TestBed.createComponent(ActiveUsersMapModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

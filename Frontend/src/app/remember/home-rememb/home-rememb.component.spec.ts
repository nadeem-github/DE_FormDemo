import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRemembComponent } from './home-rememb.component';

describe('HomeRemembComponent', () => {
  let component: HomeRemembComponent;
  let fixture: ComponentFixture<HomeRemembComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeRemembComponent]
    });
    fixture = TestBed.createComponent(HomeRemembComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

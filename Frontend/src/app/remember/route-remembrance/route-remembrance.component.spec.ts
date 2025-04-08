import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteRemembranceComponent } from './route-remembrance.component';

describe('RouteRemembranceComponent', () => {
  let component: RouteRemembranceComponent;
  let fixture: ComponentFixture<RouteRemembranceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouteRemembranceComponent]
    });
    fixture = TestBed.createComponent(RouteRemembranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

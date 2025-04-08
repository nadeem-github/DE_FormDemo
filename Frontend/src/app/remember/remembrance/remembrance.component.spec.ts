import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemembranceComponent } from './remembrance.component';

describe('RemembranceComponent', () => {
  let component: RemembranceComponent;
  let fixture: ComponentFixture<RemembranceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemembranceComponent]
    });
    fixture = TestBed.createComponent(RemembranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

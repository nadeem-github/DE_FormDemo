import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateNowComponent } from './donate-now.component';

describe('DonateNowComponent', () => {
  let component: DonateNowComponent;
  let fixture: ComponentFixture<DonateNowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonateNowComponent]
    });
    fixture = TestBed.createComponent(DonateNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

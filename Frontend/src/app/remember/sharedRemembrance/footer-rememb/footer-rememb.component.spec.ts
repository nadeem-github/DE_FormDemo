import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterRemembComponent } from './footer-rememb.component';

describe('FooterRemembComponent', () => {
  let component: FooterRemembComponent;
  let fixture: ComponentFixture<FooterRemembComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterRemembComponent]
    });
    fixture = TestBed.createComponent(FooterRemembComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

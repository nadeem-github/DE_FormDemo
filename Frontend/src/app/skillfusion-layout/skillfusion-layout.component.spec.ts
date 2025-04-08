import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillfusionLayoutComponent } from './skillfusion-layout.component';

describe('SkillfusionLayoutComponent', () => {
  let component: SkillfusionLayoutComponent;
  let fixture: ComponentFixture<SkillfusionLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillfusionLayoutComponent]
    });
    fixture = TestBed.createComponent(SkillfusionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

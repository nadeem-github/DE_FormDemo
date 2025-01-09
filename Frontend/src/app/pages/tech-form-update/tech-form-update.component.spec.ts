import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechFormUpdateComponent } from './tech-form-update.component';

describe('TechFormUpdateComponent', () => {
  let component: TechFormUpdateComponent;
  let fixture: ComponentFixture<TechFormUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechFormUpdateComponent]
    });
    fixture = TestBed.createComponent(TechFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

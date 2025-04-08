import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRemembComponent } from './header-rememb.component';

describe('HeaderRemembComponent', () => {
  let component: HeaderRemembComponent;
  let fixture: ComponentFixture<HeaderRemembComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderRemembComponent]
    });
    fixture = TestBed.createComponent(HeaderRemembComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsBackgroundComponent } from './stars-background.component';

describe('StarsBackgroundComponent', () => {
  let component: StarsBackgroundComponent;
  let fixture: ComponentFixture<StarsBackgroundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarsBackgroundComponent]
    });
    fixture = TestBed.createComponent(StarsBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

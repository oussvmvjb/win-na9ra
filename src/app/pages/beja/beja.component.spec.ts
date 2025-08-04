import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BejaComponent } from './beja.component';

describe('BejaComponent', () => {
  let component: BejaComponent;
  let fixture: ComponentFixture<BejaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BejaComponent]
    });
    fixture = TestBed.createComponent(BejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

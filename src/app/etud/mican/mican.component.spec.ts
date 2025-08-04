import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicanComponent } from './mican.component';

describe('MicanComponent', () => {
  let component: MicanComponent;
  let fixture: ComponentFixture<MicanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MicanComponent]
    });
    fixture = TestBed.createComponent(MicanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnactusComponent } from './enactus.component';

describe('EnactusComponent', () => {
  let component: EnactusComponent;
  let fixture: ComponentFixture<EnactusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnactusComponent]
    });
    fixture = TestBed.createComponent(EnactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

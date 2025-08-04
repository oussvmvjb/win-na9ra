import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsetComponent } from './iset.component';

describe('IsetComponent', () => {
  let component: IsetComponent;
  let fixture: ComponentFixture<IsetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsetComponent]
    });
    fixture = TestBed.createComponent(IsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

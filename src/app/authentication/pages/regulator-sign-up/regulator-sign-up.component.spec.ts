import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatorSignUpComponent } from './regulator-sign-up.component';

describe('RegulatorSignUpComponent', () => {
  let component: RegulatorSignUpComponent;
  let fixture: ComponentFixture<RegulatorSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegulatorSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegulatorSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

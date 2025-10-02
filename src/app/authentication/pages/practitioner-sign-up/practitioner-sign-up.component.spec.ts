import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerSignUpComponent } from './practitioner-sign-up.component';

describe('PractitionerSignUpComponent', () => {
  let component: PractitionerSignUpComponent;
  let fixture: ComponentFixture<PractitionerSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PractitionerSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionerSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

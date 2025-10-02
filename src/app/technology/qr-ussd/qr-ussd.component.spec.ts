import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrUssdComponent } from './qr-ussd.component';

describe('QrUssdComponent', () => {
  let component: QrUssdComponent;
  let fixture: ComponentFixture<QrUssdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrUssdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrUssdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
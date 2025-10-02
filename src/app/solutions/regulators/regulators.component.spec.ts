import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatorsComponent } from './regulators.component';

describe('RegulatorsComponent', () => {
  let component: RegulatorsComponent;
  let fixture: ComponentFixture<RegulatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegulatorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegulatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
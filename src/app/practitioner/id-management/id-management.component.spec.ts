import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdManagementComponent } from './id-management.component';

describe('IdManagementComponent', () => {
  let component: IdManagementComponent;
  let fixture: ComponentFixture<IdManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
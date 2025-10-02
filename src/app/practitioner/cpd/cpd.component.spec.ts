import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpdComponent } from './cpd.component';

describe('CpdComponent', () => {
  let component: CpdComponent;
  let fixture: ComponentFixture<CpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
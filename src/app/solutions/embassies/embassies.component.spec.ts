import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbassiesComponent } from './embassies.component';

describe('EmbassiesComponent', () => {
  let component: EmbassiesComponent;
  let fixture: ComponentFixture<EmbassiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmbassiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmbassiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
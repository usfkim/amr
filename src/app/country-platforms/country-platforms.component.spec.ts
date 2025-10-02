import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryPlatformsComponent } from './country-platforms.component';

describe('CountryPlatformsComponent', () => {
  let component: CountryPlatformsComponent;
  let fixture: ComponentFixture<CountryPlatformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryPlatformsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryPlatformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

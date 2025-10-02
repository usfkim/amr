import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatoryPlatformComponent } from './regulatory-platform.component';

describe('RegulatoryPlatformComponent', () => {
  let component: RegulatoryPlatformComponent;
  let fixture: ComponentFixture<RegulatoryPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegulatoryPlatformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegulatoryPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

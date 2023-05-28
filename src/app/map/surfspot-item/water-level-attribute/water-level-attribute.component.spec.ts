import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterLevelAttributeComponent } from './water-level-attribute.component';

describe('WaterLevelAttributeComponent', () => {
  let component: WaterLevelAttributeComponent;
  let fixture: ComponentFixture<WaterLevelAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaterLevelAttributeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterLevelAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

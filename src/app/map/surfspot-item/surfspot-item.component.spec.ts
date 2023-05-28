import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurfspotItemComponent } from './surfspot-item.component';

describe('SurfspotItemComponent', () => {
  let component: SurfspotItemComponent;
  let fixture: ComponentFixture<SurfspotItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SurfspotItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurfspotItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

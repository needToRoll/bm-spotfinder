import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitySpotComponent } from './community-spot.component';

describe('CommunitySpotComponent', () => {
  let component: CommunitySpotComponent;
  let fixture: ComponentFixture<CommunitySpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunitySpotComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitySpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

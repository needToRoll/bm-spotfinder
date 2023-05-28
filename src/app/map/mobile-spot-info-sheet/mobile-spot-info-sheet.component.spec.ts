import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MobileSpotInfoSheetComponent} from './mobile-spot-info-sheet.component';

describe('MobileSpotInfoSheetComponent', () => {
  let component: MobileSpotInfoSheetComponent;
  let fixture: ComponentFixture<MobileSpotInfoSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobileSpotInfoSheetComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSpotInfoSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

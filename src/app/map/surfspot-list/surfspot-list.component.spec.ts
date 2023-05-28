import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SurfspotListComponent} from './surfspot-list.component';

describe('SurfspotListComponent', () => {
  let component: SurfspotListComponent;
  let fixture: ComponentFixture<SurfspotListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SurfspotListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurfspotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

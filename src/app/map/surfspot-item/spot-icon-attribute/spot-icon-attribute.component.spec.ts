import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotIconAttributeComponent } from './spot-icon-attribute.component';

describe('SpotIconAttributeComponent', () => {
  let component: SpotIconAttributeComponent;
  let fixture: ComponentFixture<SpotIconAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotIconAttributeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotIconAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

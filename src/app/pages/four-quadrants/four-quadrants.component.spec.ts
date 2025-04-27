import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourQuadrantsComponent } from './four-quadrants.component';

describe('FourQuadrantsComponent', () => {
  let component: FourQuadrantsComponent;
  let fixture: ComponentFixture<FourQuadrantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourQuadrantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourQuadrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

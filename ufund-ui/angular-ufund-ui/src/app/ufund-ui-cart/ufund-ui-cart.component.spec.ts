import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfundUiCartComponent } from './ufund-ui-cart.component';

describe('UfundUiCartComponent', () => {
  let component: UfundUiCartComponent;
  let fixture: ComponentFixture<UfundUiCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UfundUiCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UfundUiCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

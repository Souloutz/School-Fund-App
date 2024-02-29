import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfundUiHomeComponent } from './ufund-ui-home.component';

describe('UfundUiHomeComponent', () => {
  let component: UfundUiHomeComponent;
  let fixture: ComponentFixture<UfundUiHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UfundUiHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UfundUiHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

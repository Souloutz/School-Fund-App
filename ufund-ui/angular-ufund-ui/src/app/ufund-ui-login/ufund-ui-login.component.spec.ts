import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfundUiLoginComponent } from './ufund-ui-login.component';

describe('UfundUiLoginComponent', () => {
  let component: UfundUiLoginComponent;
  let fixture: ComponentFixture<UfundUiLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UfundUiLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UfundUiLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

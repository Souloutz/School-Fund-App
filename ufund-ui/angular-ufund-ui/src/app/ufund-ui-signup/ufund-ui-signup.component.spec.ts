import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfundUiSignUpComponent } from './ufund-ui-signup.component';

describe('UfundUiLoginComponent', () => {
  let component: UfundUiSignUpComponent;
  let fixture: ComponentFixture<UfundUiSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UfundUiSignUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UfundUiSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

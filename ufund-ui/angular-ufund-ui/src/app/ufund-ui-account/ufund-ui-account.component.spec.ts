import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfundUiAccountComponent } from '../ufund-ui-account/ufund-ui-account.component';

describe('UfundUiLoginComponent', () => {
  let component: UfundUiAccountComponent;
  let fixture: ComponentFixture<UfundUiAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UfundUiAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UfundUiAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

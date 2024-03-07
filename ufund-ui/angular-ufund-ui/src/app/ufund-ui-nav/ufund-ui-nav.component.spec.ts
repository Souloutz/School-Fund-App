import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfundUiNavComponent } from './ufund-ui-nav.component';

describe('UfundUiNavComponent', () => {
  let component: UfundUiNavComponent;
  let fixture: ComponentFixture<UfundUiNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UfundUiNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UfundUiNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

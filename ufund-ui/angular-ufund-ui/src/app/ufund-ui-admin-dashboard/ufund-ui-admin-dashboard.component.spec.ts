import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfundUiAdminDashboardComponent } from './ufund-ui-admin-dashboard.component';

describe('UfundUiAdminDashboardComponent', () => {
  let component: UfundUiAdminDashboardComponent;
  let fixture: ComponentFixture<UfundUiAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UfundUiAdminDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UfundUiAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

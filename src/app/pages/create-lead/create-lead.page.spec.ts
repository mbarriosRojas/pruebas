import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateLeadPage } from './create-lead.page';

describe('CreateLeadPage', () => {
  let component: CreateLeadPage;
  let fixture: ComponentFixture<CreateLeadPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateLeadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

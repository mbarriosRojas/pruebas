import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailLeadPage } from './detail-lead.page';

describe('DetailLeadPage', () => {
  let component: DetailLeadPage;
  let fixture: ComponentFixture<DetailLeadPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailLeadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

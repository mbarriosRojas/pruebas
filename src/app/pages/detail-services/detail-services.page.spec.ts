import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailServicesPage } from './detail-services.page';

describe('DetailServicesPage', () => {
  let component: DetailServicesPage;
  let fixture: ComponentFixture<DetailServicesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

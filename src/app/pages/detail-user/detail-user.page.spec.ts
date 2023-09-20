import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailUserPage } from './detail-user.page';

describe('DetailUserPage', () => {
  let component: DetailUserPage;
  let fixture: ComponentFixture<DetailUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

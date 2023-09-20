import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewServiceUserPage } from './new-service-user.page';

describe('NewServiceUserPage', () => {
  let component: NewServiceUserPage;
  let fixture: ComponentFixture<NewServiceUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewServiceUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

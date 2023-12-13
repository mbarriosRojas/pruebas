import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RespuestaLoginPage } from './respuesta-login.page';

describe('RespuestaLoginPage', () => {
  let component: RespuestaLoginPage;
  let fixture: ComponentFixture<RespuestaLoginPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RespuestaLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

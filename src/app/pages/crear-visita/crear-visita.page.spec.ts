import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearVisitaPage } from './crear-visita.page';

describe('CrearVisitaPage', () => {
  let component: CrearVisitaPage;
  let fixture: ComponentFixture<CrearVisitaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearVisitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QueuesListPage } from './queues-list.page';

describe('QueuesListPage', () => {
  let component: QueuesListPage;
  let fixture: ComponentFixture<QueuesListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QueuesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

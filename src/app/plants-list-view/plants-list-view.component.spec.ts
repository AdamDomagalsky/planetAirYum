import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsListViewComponent } from './plants-list-view.component';

describe('PlantsListViewComponent', () => {
  let component: PlantsListViewComponent;
  let fixture: ComponentFixture<PlantsListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantsListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

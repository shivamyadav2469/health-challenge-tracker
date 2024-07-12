import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutChartComponent } from './workout-chart.component';

class MockChart {
  constructor() {}
}

describe('WorkoutChartComponent', () => {
  let component: WorkoutChartComponent;
  let fixture: ComponentFixture<WorkoutChartComponent>;
  let createChartSpy: jasmine.Spy;

  beforeEach(async () => {
    (window as any).Chart = MockChart;

    await TestBed.configureTestingModule({
      imports: [WorkoutChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutChartComponent);
    component = fixture.componentInstance;

    createChartSpy = spyOn(component, 'createChart').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createChart on init', () => {
    expect(createChartSpy).toHaveBeenCalled();
  });
});

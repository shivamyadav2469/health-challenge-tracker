import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { WorkoutFormComponent } from './workout-form.component';
import { WorkoutService } from '../workout.service';
import { of } from 'rxjs';

class MockWorkoutService {
  addWorkout(workout: { type: string; minutes: number }, userName: string) {
    return of(null); 
  }
}

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let workoutService: WorkoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutFormComponent, FormsModule],
      providers: [{ provide: WorkoutService, useClass: MockWorkoutService }],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addWorkout on submit and reset the form', () => {
    
    component.userName = 'John Doe';
    component.workoutType = 'Running';
    component.workoutMinutes = 30;

   
    spyOn(workoutService, 'addWorkout').and.callThrough();

    
    component.addWorkout();

    expect(workoutService.addWorkout).toHaveBeenCalledWith(
      { type: 'Running', minutes: 30 },
      'John Doe'
    );

    expect(component.userName).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.workoutMinutes).toBe(0);
  });
});

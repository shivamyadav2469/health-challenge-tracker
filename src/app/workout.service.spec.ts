import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);

    // Clear the localStorage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default data', () => {
    // Call the initializeData method to populate localStorage
    service['initializeData']();

    // Verify that the initial data is set correctly
    const initialData = JSON.parse(localStorage.getItem('workoutData') || '[]');
    expect(initialData.length).toBeGreaterThan(0); // There should be some default users
  });

  it('should get workouts', () => {
    // Set up mock data
    const mockData = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] }
    ];
    localStorage.setItem('workoutData', JSON.stringify(mockData));

    const workouts = service.getWorkouts();
    expect(workouts).toEqual(mockData);
  });

  it('should add a workout for an existing user', () => {
    const initialData = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] }
    ];
    localStorage.setItem('workoutData', JSON.stringify(initialData));

    // Add a new workout
    const newWorkout = { type: 'Cycling', minutes: 45 };
    service.addWorkout(newWorkout, 'John Doe');

    // Verify the workout was added
    const updatedData = JSON.parse(localStorage.getItem('workoutData') || '[]');
    const user = updatedData.find((u: { name: string; }) => u.name === 'John Doe');
    expect(user).toBeDefined();
    expect(user?.workouts.length).toBe(2);
    expect(user?.workouts.find((w: { type: string; }) => w.type === 'Cycling')?.minutes).toBe(45);
  });

  it('should add a new user if not present', () => {
    // Add a workout for a new user
    const newWorkout = { type: 'Swimming', minutes: 60 };
    service.addWorkout(newWorkout, 'Alice');

    // Verify the new user was added
    const updatedData = JSON.parse(localStorage.getItem('workoutData') || '[]');
    const user = updatedData.find((u: { name: string; }) => u.name === 'Alice');
    expect(user).toBeDefined();
    expect(user?.workouts.length).toBe(1);
    expect(user?.workouts[0].type).toBe('Swimming');
  });
});

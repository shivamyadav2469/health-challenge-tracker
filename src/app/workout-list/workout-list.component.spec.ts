// workout-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService } from '../workout.service';
import { of } from 'rxjs';
import { PaginationComponent } from '../pagination/pagination.component';
import { WorkoutModalComponent } from '../workout-modal/workout-modal.component';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let mockWorkoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    mockWorkoutService = jasmine.createSpyObj('WorkoutService', ['workouts$']);
    mockWorkoutService.workouts$ = of([
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 45 }] }
    ]);

    await TestBed.configureTestingModule({
      imports: [WorkoutListComponent, FormsModule, PaginationComponent, WorkoutModalComponent],
      providers: [{ provide: WorkoutService, useValue: mockWorkoutService }]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize workouts', () => {
    expect(component.workouts.length).toBeGreaterThan(0);
    expect(component.workouts[0].name).toBe('John Doe');
  });

  it('should filter workouts by name', () => {
    component.searchName = 'John';
    component.filterWorkouts();
    fixture.detectChanges();
    expect(component.filteredWorkouts.length).toBe(1);
    expect(component.filteredWorkouts[0].name).toBe('John Doe');
  });

  it('should filter workouts by type', () => {
    component.filterType = 'Swimming';
    component.filterWorkouts();
    fixture.detectChanges();
    expect(component.filteredWorkouts.length).toBe(1);
    expect(component.filteredWorkouts[0].name).toBe('Jane Smith');
  });

  it('should paginate workouts', () => {
    component.paginateWorkouts(1);
    fixture.detectChanges();
    expect(component.paginatedWorkouts.length).toBeGreaterThan(0);
  });

  it('should open and close the modal', () => {
    component.openModal();
    fixture.detectChanges();
    expect(component.showModal).toBeTrue();
    component.closeModal(null);
    fixture.detectChanges();
    expect(component.showModal).toBeFalse();
  });
});

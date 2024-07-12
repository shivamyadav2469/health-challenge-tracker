import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../workout.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { WorkoutModalComponent } from '../workout-modal/workout-modal.component';
import { Subscription } from 'rxjs';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
  displayTypes?: string;
  displayMinutes?: string;
  totalMinutes?: number;
}

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent, WorkoutModalComponent],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit, OnDestroy {
  workouts: User[] = [];
  filteredWorkouts: User[] = [];
  paginatedWorkouts: User[] = [];
  showModal: boolean = false;
  searchName: string = '';
  filterType: string = '';
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  private subscription: Subscription = new Subscription();

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.subscription.add(this.workoutService.workouts$.subscribe(workouts => {
      this.workouts = workouts;
      this.filterWorkouts();
    }));
  }

  filterWorkouts() {
    this.filteredWorkouts = this.workouts.filter(workout =>
      (this.searchName ? workout.name.toLowerCase().includes(this.searchName.toLowerCase()) : true) &&
      (this.filterType ? workout.workouts.some((w: { type: string }) => w.type === this.filterType) : true)
    );
    this.paginateWorkouts(this.currentPage);
    this.prepareDisplayData();
  }
  
  paginateWorkouts(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    this.paginatedWorkouts = this.filteredWorkouts.slice(startIndex, startIndex + this.itemsPerPage);
    this.prepareDisplayData();
  }

  prepareDisplayData() {
    this.paginatedWorkouts.forEach(workout => {
      workout.displayTypes = workout.workouts.map((w: { type: string }) => w.type).join(', ');
      workout.displayMinutes = workout.workouts.map((w: { minutes: number }) => `${w.minutes} mins`).join(', ');
      workout.totalMinutes = workout.workouts.reduce((sum: number, w: { minutes: number }) => sum + w.minutes, 0);
    });
  }

  onPageChanged(page: number) {
    this.paginateWorkouts(page);
  }

  onItemsPerPageChanged(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.paginateWorkouts(1);
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(event: any): void {
    this.showModal = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../workout.service';


@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent {
  userName = '';
  workoutType = '';
  workoutMinutes = 0;
  workoutTypes = ['Swimming', 'Running', 'Yoga', 'Cycling']; // Dropdown options


  constructor(private workoutService: WorkoutService) {}

  addWorkout() {
    if (this.userName && this.workoutType && this.workoutMinutes > 0) {
      this.workoutService.addWorkout({
        type: this.workoutType,
        minutes: this.workoutMinutes
      }, this.userName);
      
      // Clear the form fields
      this.userName = '';
      this.workoutType = '';
      this.workoutMinutes = 0;
    }
  }
}

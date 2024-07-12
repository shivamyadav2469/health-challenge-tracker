import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutChartComponent } from './workout-chart/workout-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, WorkoutFormComponent, WorkoutListComponent, WorkoutChartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'health-challenge-tracker';
  isLoading: boolean = true; 

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); 
  }
}

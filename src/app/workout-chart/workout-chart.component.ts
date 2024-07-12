import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css']
})
export class WorkoutChartComponent implements OnInit {
  @Input() workouts: any[] = [];

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    const ctx = document.getElementById('workoutChart') as HTMLCanvasElement;

    if (!ctx) {
      console.error('Canvas element not found');
      return;
    }

    const workoutTypes = this.workouts.flatMap(workout => workout.workouts.map((w: { type: any; }) => w.type));
    const uniqueWorkoutTypes = [...new Set(workoutTypes)];

    const minutesData = uniqueWorkoutTypes.map(type => {
      return this.workouts.reduce((total, workout) => {
        const workoutType = workout.workouts.find((w: { type: any; }) => w.type === type);
        return total + (workoutType ? workoutType.minutes : 0);
      }, 0);
    });

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: uniqueWorkoutTypes,
        datasets: [{
          label: 'Minutes',
          data: minutesData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Minutes'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Workouts'
            }
          }
        }
      }
    });
  }
}

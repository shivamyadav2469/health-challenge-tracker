import { Component, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-workout-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workout-modal.component.html',
  styleUrls: ['./workout-modal.component.css']
})
export class WorkoutModalComponent implements AfterViewInit {
  @Input() users: any[] = [];
  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();

  selectedUser: any = null;
  chart: Chart | undefined;
  isSidebarOpen: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    if (this.showModal && this.users.length > 0) {
      this.selectUser(this.users[0]);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showModal']) {
      if (this.showModal && this.users.length > 0) {
        this.selectUser(this.users[0]);
      }
    }
    if (changes['users'] && this.showModal && this.users.length > 0) {
      this.selectUser(this.users[0]);
    }
  }

  selectUser(user: any): void {
    this.selectedUser = user;
    if (this.showModal) {
      this.cdr.detectChanges(); 
      setTimeout(() => this.createChart(), 0);
    }
    this.isSidebarOpen = false; 
  }

  createChart(): void {
    const ctx = document.getElementById('userWorkoutChart') as HTMLCanvasElement;

    if (!ctx) {
      console.error('Canvas element not found');
      return;
    }

    this.clearChart();

    const workoutTypes = this.selectedUser.workouts.map((w: { type: any; }) => w.type);
    const minutesData = this.selectedUser.workouts.map((w: { minutes: any; }) => w.minutes);

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: workoutTypes,
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

  clearChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedUser = null;
    this.clearChart();
    this.closeModalEvent.emit(); 
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private storageKey = 'workoutData';
  private workoutsSubject = new BehaviorSubject<User[]>([]);
  workouts$ = this.workoutsSubject.asObservable();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    const initialData: User[] = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }] },
      { id: 3, name: 'Mike Johnson', workouts: [{ type: 'Yoga', minutes: 50 }, { type: 'Cycling', minutes: 40 }] }
    ];
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(initialData));
    }
    this.workoutsSubject.next(JSON.parse(localStorage.getItem(this.storageKey) || '[]'));
  }

  getWorkouts(): User[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addWorkout(workout: Workout, userName: string) {
    const workouts = this.getWorkouts();
    let user = workouts.find(u => u.name === userName);

    if (user) {
      const existingWorkout = user.workouts.find(w => w.type === workout.type);
      if (existingWorkout) {
        existingWorkout.minutes += workout.minutes;
      } else {
        user.workouts.push(workout);
      }
    } else {
      user = { id: workouts.length + 1, name: userName, workouts: [workout] };
      workouts.push(user);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(workouts));
    this.workoutsSubject.next(workouts);
  }
}

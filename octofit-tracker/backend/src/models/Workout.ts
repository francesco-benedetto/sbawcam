import { Schema, model } from 'mongoose';

export interface Workout {
  title: string;
  focusArea: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  exercises: string[];
}

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true, unique: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    estimatedMinutes: { type: Number, required: true },
    exercises: { type: [String], required: true },
  },
  { timestamps: true }
);

export const WorkoutModel = model<Workout>('Workout', workoutSchema);
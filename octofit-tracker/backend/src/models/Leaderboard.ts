import { Schema, model } from 'mongoose';

export interface LeaderboardEntry {
  user: string;
  team: string;
  rank: number;
  points: number;
  totalMinutes: number;
}

const leaderboardSchema = new Schema<LeaderboardEntry>(
  {
    user: { type: String, required: true },
    team: { type: String, required: true },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    totalMinutes: { type: Number, required: true },
  },
  { timestamps: true }
);

export const LeaderboardModel = model<LeaderboardEntry>('Leaderboard', leaderboardSchema);
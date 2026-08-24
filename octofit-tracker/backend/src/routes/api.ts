import { Router } from 'express';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models';

const router = Router();

router.get('/users/', async (_req, res, next) => {
  try {
    const users = await UserModel.find().sort({ displayName: 1 });
    res.json({ users });
  } catch (error) {
    next(error);
  }
});

router.get('/teams/', async (_req, res, next) => {
  try {
    const teams = await TeamModel.find().sort({ name: 1 });
    res.json({ teams });
  } catch (error) {
    next(error);
  }
});

router.get('/activities/', async (_req, res, next) => {
  try {
    const activities = await ActivityModel.find().sort({ activityDate: -1 });
    res.json({ activities });
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardModel.find().sort({ rank: 1 });
    res.json({ leaderboard });
  } catch (error) {
    next(error);
  }
});

router.get('/workouts/', async (_req, res, next) => {
  try {
    const workouts = await WorkoutModel.find().sort({ difficulty: 1, title: 1 });
    res.json({ workouts });
  } catch (error) {
    next(error);
  }
});

export default router;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            models_1.ActivityModel.deleteMany({}),
            models_1.LeaderboardModel.deleteMany({}),
            models_1.TeamModel.deleteMany({}),
            models_1.UserModel.deleteMany({}),
            models_1.WorkoutModel.deleteMany({}),
        ]);
        await models_1.UserModel.insertMany([
            {
                username: 'maya_runner',
                email: 'maya.runner@example.com',
                displayName: 'Maya Thompson',
                profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
                favoriteActivity: 'Trail running',
                joinedAt: new Date('2026-01-08'),
            },
            {
                username: 'liam_lifts',
                email: 'liam.lifts@example.com',
                displayName: 'Liam Carter',
                profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
                favoriteActivity: 'Strength training',
                joinedAt: new Date('2026-02-14'),
            },
            {
                username: 'sofia_cycles',
                email: 'sofia.cycles@example.com',
                displayName: 'Sofia Garcia',
                profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
                favoriteActivity: 'Cycling',
                joinedAt: new Date('2026-03-02'),
            },
        ]);
        await models_1.TeamModel.insertMany([
            {
                name: 'Cardio Crew',
                mascot: 'Pulse',
                city: 'Austin',
                memberCount: 18,
                weeklyGoalMinutes: 2400,
            },
            {
                name: 'Strength Squad',
                mascot: 'Atlas',
                city: 'Denver',
                memberCount: 14,
                weeklyGoalMinutes: 1800,
            },
            {
                name: 'Flex Force',
                mascot: 'Flow',
                city: 'Portland',
                memberCount: 12,
                weeklyGoalMinutes: 1500,
            },
        ]);
        await models_1.ActivityModel.insertMany([
            {
                user: 'Maya Thompson',
                team: 'Cardio Crew',
                type: 'Trail run',
                durationMinutes: 52,
                caloriesBurned: 560,
                activityDate: new Date('2026-08-20'),
            },
            {
                user: 'Liam Carter',
                team: 'Strength Squad',
                type: 'Upper body strength',
                durationMinutes: 45,
                caloriesBurned: 410,
                activityDate: new Date('2026-08-21'),
            },
            {
                user: 'Sofia Garcia',
                team: 'Cardio Crew',
                type: 'Indoor cycling',
                durationMinutes: 60,
                caloriesBurned: 620,
                activityDate: new Date('2026-08-22'),
            },
            {
                user: 'Maya Thompson',
                team: 'Flex Force',
                type: 'Mobility flow',
                durationMinutes: 30,
                caloriesBurned: 160,
                activityDate: new Date('2026-08-23'),
            },
        ]);
        await models_1.LeaderboardModel.insertMany([
            {
                user: 'Sofia Garcia',
                team: 'Cardio Crew',
                rank: 1,
                points: 1280,
                totalMinutes: 420,
            },
            {
                user: 'Maya Thompson',
                team: 'Cardio Crew',
                rank: 2,
                points: 1190,
                totalMinutes: 390,
            },
            {
                user: 'Liam Carter',
                team: 'Strength Squad',
                rank: 3,
                points: 1045,
                totalMinutes: 340,
            },
        ]);
        await models_1.WorkoutModel.insertMany([
            {
                title: 'Morning Mobility Reset',
                focusArea: 'Flexibility',
                difficulty: 'beginner',
                estimatedMinutes: 20,
                exercises: ['Cat-cow', 'World greatest stretch', 'Hip airplanes', 'Deep squat hold'],
            },
            {
                title: 'Lunch Break Strength Circuit',
                focusArea: 'Full body strength',
                difficulty: 'intermediate',
                estimatedMinutes: 35,
                exercises: ['Goblet squats', 'Push-ups', 'Dumbbell rows', 'Plank shoulder taps'],
            },
            {
                title: 'Weekend Endurance Builder',
                focusArea: 'Cardio endurance',
                difficulty: 'advanced',
                estimatedMinutes: 50,
                exercises: ['Tempo run', 'Hill repeats', 'Recovery jog', 'Cooldown walk'],
            },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();

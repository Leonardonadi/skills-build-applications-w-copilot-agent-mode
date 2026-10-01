import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    const userSeeds = [
      { username: 'alex_morgan', email: 'alex.morgan@example.com' },
      { username: 'priya_shah', email: 'priya.shah@example.com' },
      { username: 'jordan_lee', email: 'jordan.lee@example.com' },
    ];

    for (const user of userSeeds) {
      await User.updateOne({ email: user.email }, { $set: user }, { upsert: true });
    }

    const users = await User.find({ email: { $in: userSeeds.map(({ email }) => email) } });
    const usersByEmail = new Map(users.map((user) => [user.email, user]));

    const teamSeeds = [
      {
        name: 'Stride Collective',
        description: 'A team focused on consistent running and walking.',
        members: [usersByEmail.get('alex.morgan@example.com')!._id, usersByEmail.get('priya.shah@example.com')!._id],
      },
      {
        name: 'Peak Performers',
        description: 'A team building strength, endurance, and healthy habits.',
        members: [usersByEmail.get('jordan.lee@example.com')!._id],
      },
    ];

    for (const team of teamSeeds) {
      await Team.updateOne({ name: team.name }, { $set: team }, { upsert: true });
    }

    const teams = await Team.find({ name: { $in: teamSeeds.map(({ name }) => name) } });
    const teamsByName = new Map(teams.map((team) => [team.name, team]));
    const activities = [
      {
        user: usersByEmail.get('alex.morgan@example.com')!._id,
        type: 'running',
        durationMinutes: 38,
        distanceKilometers: 6.2,
        date: new Date('2026-09-28T07:30:00.000Z'),
      },
      {
        user: usersByEmail.get('priya.shah@example.com')!._id,
        type: 'cycling',
        durationMinutes: 52,
        distanceKilometers: 18.5,
        date: new Date('2026-09-29T16:00:00.000Z'),
      },
      {
        user: usersByEmail.get('jordan.lee@example.com')!._id,
        type: 'strength training',
        durationMinutes: 45,
        distanceKilometers: 0,
        date: new Date('2026-09-30T18:15:00.000Z'),
      },
    ];

    for (const activity of activities) {
      await Activity.updateOne(
        { user: activity.user, type: activity.type, date: activity.date },
        { $set: activity },
        { upsert: true },
      );
    }

    const leaderboardEntries = [
      {
        user: usersByEmail.get('alex.morgan@example.com')!._id,
        team: teamsByName.get('Stride Collective')!._id,
        points: 860,
      },
      {
        user: usersByEmail.get('priya.shah@example.com')!._id,
        team: teamsByName.get('Stride Collective')!._id,
        points: 735,
      },
      {
        user: usersByEmail.get('jordan.lee@example.com')!._id,
        team: teamsByName.get('Peak Performers')!._id,
        points: 640,
      },
    ];

    for (const entry of leaderboardEntries) {
      await Leaderboard.updateOne(
        { user: entry.user, team: entry.team },
        { $set: entry },
        { upsert: true },
      );
    }

    const workoutSeeds = [
      {
        name: 'Easy 5K Builder',
        description: 'A steady run with a short warm-up and cool-down.',
        category: 'running',
        durationMinutes: 35,
        difficulty: 'beginner',
      },
      {
        name: 'Full-Body Strength',
        description: 'A balanced circuit covering major muscle groups.',
        category: 'strength',
        durationMinutes: 40,
        difficulty: 'intermediate',
      },
      {
        name: 'Recovery Mobility',
        description: 'Gentle mobility work for a rest or recovery day.',
        category: 'mobility',
        durationMinutes: 20,
        difficulty: 'beginner',
      },
    ];

    for (const workout of workoutSeeds) {
      await Workout.updateOne({ name: workout.name }, { $set: workout }, { upsert: true });
    }

    console.log('Seeded users, teams, activities, leaderboard, and workouts');
    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();

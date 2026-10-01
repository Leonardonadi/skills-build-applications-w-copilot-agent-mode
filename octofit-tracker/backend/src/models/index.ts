import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
  {
    username: { type: String, trim: true },
    email: { type: String, lowercase: true, trim: true },
  },
  { timestamps: true },
)

const teamSchema = new Schema(
  {
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
)

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, trim: true },
    durationMinutes: { type: Number, min: 0 },
    distanceKilometers: { type: Number, min: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0 },
  },
  { timestamps: true },
)

const workoutSchema = new Schema(
  {
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    category: { type: String, trim: true },
    durationMinutes: { type: Number, min: 0 },
    difficulty: { type: String, trim: true },
  },
  { timestamps: true },
)

export const User = mongoose.models.User ?? mongoose.model('User', userSchema)
export const Team = mongoose.models.Team ?? mongoose.model('Team', teamSchema)
export const Activity = mongoose.models.Activity ?? mongoose.model('Activity', activitySchema)
export const Leaderboard = mongoose.models.Leaderboard ?? mongoose.model('Leaderboard', leaderboardSchema)
export const Workout = mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema)
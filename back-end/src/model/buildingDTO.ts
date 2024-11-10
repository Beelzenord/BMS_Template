import mongoose, { Document, Schema } from 'mongoose';

export interface IBuilding extends Document {
  name: string;
  temperature: number;
}

const BuildingSchema: Schema = new Schema({
    name: { type: String, required: true },
    temperature: { type: Number, required: true },
});

// Create a Mongoose model
export const Building = mongoose.model<IBuilding>('Building', BuildingSchema);
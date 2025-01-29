import Document from "mongoose";
import { Model } from "mongoose";

// Define the IPatientData interface
export interface IPatientData extends Document {
  user: string;
  date: Date;
  glassesDrunk: number;
  stepsTaken: number;
  exercisesDone: string[];
  medicationsTaken: {
    morning: {
      time: string;
      items: string[];
    };
    afternoon: {
      time: string;
      items: string[];
    };
    evening: {
      time: string;
      items: string[];
    };
  };
  foodsEaten: {
    morning: {
      time: string;
      items: string[];
    };
    afternoon: {
      time: string;
      items: string[];
    };
    evening: {
      time: string;
      items: string[];
    };
  };
}

// Define the IPatientDataModel interface
export interface IPatientDataModel extends Model<IPatientData> {
  paginateAndFilter(params: {
    page: number;
    limit: number;
    startDate: string | null;
    endDate: string | null;
    filters: unknown;
    baseUrl: string;
  }): Promise<object>;
}

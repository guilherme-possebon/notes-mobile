import { INote } from "./note";

export interface IWeek {
  id: number;
  created_at: string;
  updated_at: string;
  start_date: string;
  end_date: string;
  notes: INote[];
}

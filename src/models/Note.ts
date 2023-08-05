export interface Note {
  id: number;
  createdAt: Date;
  content: string;
  category: string;
  datesMentioned: string[];
  archived: boolean;
}

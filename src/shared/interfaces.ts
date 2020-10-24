export interface Todo {
  id: string;
  name: string;
  important: boolean;
  urgent: boolean;
  completed: boolean;
  trashed: boolean;

  order?: number;
  date?: string;
}

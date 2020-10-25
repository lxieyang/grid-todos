export interface Todo {
  id: string;
  authorId: string | undefined;
  name: string;
  important: boolean;
  urgent: boolean;
  completed: boolean;
  trashed: boolean;
  createdAt: number | string;
  updatedAt: number | string; // update to name or content

  order?: number;
  completedAt?: number | string;
  content?: string;
}

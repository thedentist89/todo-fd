interface Entity {
  __KEY?: string;
  __STAMP?: number;
  __TIMESTAMP?: string;
}

export interface ITodo extends Entity {
  id: number;
  title: string;
  completed: boolean;
}

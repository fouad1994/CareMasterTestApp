export * from './Redux';

export interface INote {
  id: number;
  categoryId: number;
  clientId: number;
  note: string;
}

export interface ICategoryClient {
  id: number;
  name: string;
}

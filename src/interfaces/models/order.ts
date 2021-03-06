export default interface IOrder {
  id?: number;
  userId: number;
  name: string;
  description: string;
  quantity: number;
  value: number;
  createdDate?: string;
  updatedData?: string;
}

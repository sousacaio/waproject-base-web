import IOrder from 'interfaces/models/order';
import { Observable } from 'rxjs';
import apiService, { ApiService } from './api';

export class OrderService {
  constructor(private apiService: ApiService) {}
  public save(model: Partial<IOrder>): Observable<IOrder> {
    return this.apiService.post('/order', model);
  }
}
const orderService = new OrderService(apiService);
export default orderService;

import IOrder from 'interfaces/models/order';
import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import { Observable } from 'rxjs';
import apiService, { ApiService } from './api';

export class OrderService {
  constructor(private apiService: ApiService) {}
  public save(model: Partial<IOrder>): Observable<IOrder> {
    return this.apiService.post('/order', model);
  }
  public list(params: IPaginationParams): Observable<IPaginationResponse<IOrder>> {
    return this.apiService.get('/order', params);
  }
}
const orderService = new OrderService(apiService);
export default orderService;

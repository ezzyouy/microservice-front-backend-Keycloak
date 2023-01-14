import { Customer } from "./customer.model";

export interface Bill {
  id: number;
  billdate: string;
  status: string;
  customerId: number;
  productsItems: BillDetail[];
  customer: Customer;
  total: number;
}
export interface BillDetail {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  discount: number;
  product: any;
  amount: number;
}

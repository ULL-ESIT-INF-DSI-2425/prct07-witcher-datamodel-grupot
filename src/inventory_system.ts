import { Good } from "./goods";
import { Merchant } from './mercants';
import { Customer } from "./other_clients";

// Clase de gestión del inventario
export class InventorySystem {
  private _items: Good[] = [];
  private _merchants: Merchant[] = [];
  private _customers: Customer[] = [];

  get items() { return this._items; };
  get merchants() { return this._merchants; }; 
  get customers() { return this._customers; }; 

  addItem(item: Good) {
    this._items.push(item);
  }

  removeItem(id: number) {
    this._items = this._items.filter(item => item.id !== id);
  }

  listItems(orderBy: 'name' | 'value' = 'name', ascending: boolean = true) {
    return this._items.sort((a, b) => {
      const factor = ascending ? 1 : -1;
      return a[orderBy] > b[orderBy] ? factor : -factor;
    });
  }

  addMerchant(merchant: Merchant) {
    this._merchants.push(merchant);
  }

  addCustomer(customer: Customer) {
    this._customers.push(customer);
  }

  findMerchantByName(name: string) {
    return this._merchants.find(m => m.name.toLowerCase() === name.toLowerCase());
  }

  findCustomerByName(name: string) {
    return this._customers.find(c => c.name.toLowerCase() === name.toLowerCase());
  }
}
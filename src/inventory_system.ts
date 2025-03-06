/* eslint-disable @typescript-eslint/no-unused-vars */
import { Good } from "./goods";
import { Merchant } from "./mercants";
import { Customer } from "./other_clients";

// Clase de gestión del inventario
class InventorySystem {
  private items: Good[] = [];
  private merchants: Merchant[] = [];
  private customers: Customer[] = [];

  addItem(item: Good) {
    this.items.push(item);
  }

  removeItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }

  listItems(orderBy: 'name' | 'value' = 'name', ascending: boolean = true) {
    return this.items.sort((a, b) => {
      const factor = ascending ? 1 : -1;
      return a[orderBy] > b[orderBy] ? factor : -factor;
    });
  }

  addMerchant(merchant: Merchant) {
    this.merchants.push(merchant);
  }

  addCustomer(customer: Customer) {
    this.customers.push(customer);
  }

  findMerchantByName(name: string) {
    return this.merchants.find(m => m.name.toLowerCase() === name.toLowerCase());
  }

  findCustomerByName(name: string) {
    return this.customers.find(c => c.name.toLowerCase() === name.toLowerCase());
  }
}
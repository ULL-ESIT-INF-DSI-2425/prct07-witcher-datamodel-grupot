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

  /**
   * Añade un item al inventario
   * @param item - (Good) item que se añadirá
   */
  addItem(item: Good) {
    this._items.push(item);
  }

  /**
   * Elimina un item con un id específico
   * @param id - (number) id del objeto
   */
  removeItem(id: number) {
    this._items = this._items.filter(item => item.id !== id);
  }

  /**
   * Lista todos los items almacenados en orden ascendente por defecto
   * @param orderBy - (string) ordena los objetos según el atributo seleccionado
   * @param ascending - (bool?) si queremos orden asscendente o descendente
   * @returns - (Good[]) lista de bienes que tenemos en el inventario
   */
  listItems(orderBy: 'name' | 'value' = 'name', ascending: boolean = true): Good[] {
    return this._items.sort((a, b) => {
      const factor = ascending ? 1 : -1;
      return a[orderBy] > b[orderBy] ? factor : -factor;
    });
  }

  /**
   * Método que añade un mercader a nuestro sistema
   * @param merchant - (Merchant) 
   */
  addMerchant(merchant: Merchant) {
    this._merchants.push(merchant);
  }

  /**
   * Elimina un mercader con un id específico
   * @param merchantId - (number)
   */
  removeMerchant(merchantId: number): void {
    this._merchants = this._merchants.filter(merchant => merchant.id !== merchantId);
  }

  /**
   * Método que añade un cliente a nuestro sistema
   * @param customer - (Customer)
   */
  addCustomer(customer: Customer): void {
    this._customers.push(customer);
  }

  /**
   * Elimina un cliente con un id específico
   * @param customersId - (number)
   */
  removeCustomer(customersId: number): void {
    this._customers = this._customers.filter(customer => customer.id !== customersId);
  }

  /**
   * Método que nos permite encontrar a un mercader 
   * dentro de nuestro sistema mediante su nombre
   * @param name - (string) nombre del mercader
   * @returns - (merchant)
   */
  findMerchantByName(name: string): Merchant {
    return this._merchants.find(m => m.name.toLowerCase() === name.toLowerCase());
  }

  /**
   * Método que nos permite encontrar a un cliente 
   * dentro de nuestro sistema mediante su nombre
   * @param name - (string)
   * @returns - (Customer)
   */
  findCustomerByName(name: string): Customer {
    return this._customers.find(c => c.name.toLowerCase() === name.toLowerCase());
  }
}
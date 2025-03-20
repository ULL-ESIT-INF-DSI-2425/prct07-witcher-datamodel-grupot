import { Good } from './goods.js';
import { Merchant } from './mercants.js';
import { Customer } from "./other_clients.js";
import { Transaction } from './transaction.js';

// Clase de gestión del inventario
export class InventorySystem {
  private _items: Good[] = [];
  private _merchants: Merchant[] = [];
  private _customers: Customer[] = [];
  private transactions: Transaction[] = [];

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
   * Modifica un bien existente en el inventario
   * @param id - (number) ID del bien a modificar.
   * @param name - (string?) nuevo nombre.
   * @param description - (string?) nueva descripción.
   * @param material - (string?) nuevo material.
   * @param weight - (number?) nuevo peso.
   * @param value - (number?) nuevo valor.
   */
  updateGood( id: number, name?: string, description?: string, material?: string, weight?: number, value?: number ) {
    const good = this._items.find(item => item.id === id);
    if (good) {
      if (name !== undefined) good.name = name;
      if (description !== undefined) good.description = description;
      if (material !== undefined) good.material = material;
      if (weight !== undefined) good.weight = weight;
      if (value !== undefined) good.value = value;
    }
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
   * Actualiza un mercader existente.
   * @param id - (number) ID del mercader a modificar.
   * @param name - (string?) nuevo nombre.
   * @param type - (string?) nuevo tipo.
   * @param location - (string?) nueva ubicación.
   */
  updateMerchant(id: number, name?: string, type?: string, location?: string) {
  const merchant = this._merchants.find(m => m.id === id);
  if (merchant) {
    if (name !== undefined) merchant.name = name;
    if (type !== undefined) merchant.type = type;
    if (location !== undefined) merchant.location = location;
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

  updateCustomer( id: number,name?: string, race?: string, location?: string ) {
    const customer = this._customers.find(c => c.id === id);
    if (customer) {
      if (name !== undefined) customer.name = name;
      if (race !== undefined) customer.race = race;
      if (location !== undefined) customer.location = location;
    }
  }

  /**
   * Método que nos permite encontrar a un mercader 
   * dentro de nuestro sistema mediante su nombre
   * @param name - (string) nombre del mercader
   * @returns - (Merchant | undefined)
   */
  findMerchantByName(name: string): Merchant | undefined {
    return this._merchants.find(m => m.name.toLowerCase() === name.toLowerCase());
  }

  /**
   * Método que nos permite encontrar a un cliente 
   * dentro de nuestro sistema mediante su nombre
   * @param name - (string)
   * @returns - (Customer | undefined)
   */
  findCustomerByName(name: string): Customer | undefined {
    return this._customers.find(c => c.name.toLowerCase() === name.toLowerCase());
  }

  /**
   * Método que nos permite añadir una transacción
   * a un vector de almacenamiento
   * @param transaction - (Transaction)
   */
  recordTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
  }
  
  /**
   * Método que nos devuelve todas las transacciones
   * del vector de almacenamiento
   * @returns Lista de transacciones
   */
  listTransactions() {
    return this.transactions;
  }
}

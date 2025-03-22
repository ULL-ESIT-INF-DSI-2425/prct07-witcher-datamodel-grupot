/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { describe, expect, expectTypeOf, it, test, vi, afterEach} from "vitest";
import { GoodsManager } from '../../src/inventory_system';
import { MerchantManager } from "../../src/mercant_manager";
import { CustomerManager } from "../../src/other_clients_manager";
import { TransactionManager } from "../../src/transaction_manager";
import { Merchant } from "../../src/mercants";
import { Good } from "../../src/goods";
import { Customer } from "../../src/other_clients";
//import exp from "constants";

const customer1 = new Customer(1, "Geralt", "Brujo", "Rivia");
const customer2 = new Customer(2, "Doni", "Enano", "Novigrado");
// Se va a modificr
const customer3 = new Customer(3, "Doni", "Enano", "Novigrado");
const good1 = new Good(1, "Pocion de Golondrina", "Pocion de Brujo", "Murcielago", 0.1, 100);
const good2 = new Good(2, "Colonia de Lirio y Grosellas", "Una colonia muy especial", "Lirios y grosellas", 0.7, 60);
// Se modifica el good3
const good3 = new Good(3, "Colonia de Lirio y Grosellas", "Una colonia muy especial", "Lirios y grosellas", 0.7, 60);
const merchant1 = new Merchant(1, "Segredus de Continente", "General", "Velen");
const merchant2 = new Merchant(2, "Iker de Rivia", "Herrero", "Rivia");
// Se va a modificar
const merchant3 = new Merchant(3, "Iker de Rivia", "Herrero", "Rivia");

describe("listItems", () => {
  test("Funcionamiento normal", () => {
    let white_wolf_inn_inventory = new GoodsManager();
    white_wolf_inn_inventory.addItem(good1);
    white_wolf_inn_inventory.addItem(good2);
    expect(white_wolf_inn_inventory.listItems("name", true)).toStrictEqual([good2, good1]);
  });
});

describe("addItem", () => {
  afterEach(() => {
    vi.restoreAllMocks(); 
  });

  test("Funcionamiento normal", () => {
    let my_system = new GoodsManager();
    const spy = vi.spyOn(my_system, "addItem");
    expect(my_system.items).toHaveLength(0);
    my_system.addItem(good2);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(my_system.items).toHaveLength(1);
    expect(my_system.items).toContain(good2);
  });
});

describe("removeItem", () => {
  afterEach(() => {
    vi.restoreAllMocks(); 
  });

  test("Funcionamiento normal", () => {
    let my_system = new GoodsManager();
    my_system.addItem(good2);
    expect(my_system.items).toHaveLength(1);
    const spy = vi.spyOn(my_system, "removeItem");
    my_system.removeItem(2);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(my_system.items).toHaveLength(0);
  });
});


describe("Modificar item", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("Funcionamiento normal", () => {
    let my_system = new GoodsManager();
    my_system.addItem(good3);  
    // const good3 = new Good(2, "Colonia de Lirio y Grosellas", "Una colonia muy especial", "Lirios y grosellas", 0.7, 60);
    my_system.updateGood(3, 'Colonia vacia', undefined, undefined, undefined, undefined);
    const good = my_system.items.find(item => item.id === 3);
    expect(good.name).toBe('Colonia vacia');
    expect(good.description).toBe('Una colonia muy especial');
    expect(good.material).toBe('Lirios y grosellas');
    expect(good.weight).toBe(0.7);
    expect(good.value).toBe(60);
  });
  test("Funcionamiento normal", () => {
    let my_system = new GoodsManager();
    my_system.addItem(good3);  
    // const good3 = new Good(2, "Colonia de Lirio y Grosellas", "Una colonia muy especial", "Lirios y grosellas", 0.7, 60);
    my_system.updateGood(3, undefined, 'recipiente vacio', 'nada', 0.3, 10);
    const good = my_system.items.find(item => item.id === 3);
    expect(good.name).toBe('Colonia vacia');
    expect(good.description).toBe('recipiente vacio');
    expect(good.material).toBe('nada');
    expect(good.weight).toBe(0.3);
    expect(good.value).toBe(10);
  });
});  


describe("Manipulación y visualización de customers", () => {
  afterEach(() => {
    vi.restoreAllMocks(); 
  });

  let my_system = new CustomerManager();
  test("Adicion de clientes", () => {
    const spy = vi.spyOn(my_system, "addCustomer");
    my_system.addCustomer(customer1);
    expect(my_system.customers).toHaveLength(1);
    expect(spy).toHaveBeenCalledTimes(1);
    my_system.addCustomer(customer2);
    expect(my_system.customers).toHaveLength(2);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test("Visualización de clientes", () => {
    expect(my_system.findCustomerByName("Doni")).toStrictEqual(customer2);
    expect(my_system.findCustomerByName("geralt")).toStrictEqual(customer1);
  });

  test("Eliminación de clientes", () => {
    expect(my_system.customers).toHaveLength(2);
    const spy = vi.spyOn(my_system, "removeCustomer");
    my_system.removeCustomer(1);
    expect(my_system.customers).toHaveLength(1);
    expect(spy).toHaveBeenCalledTimes(1);
    my_system.removeCustomer(2);
    expect(my_system.customers).toHaveLength(0);
    expect(spy).toHaveBeenCalledTimes(2);
  });

   test('actualiza solo la ubicación de un cliente sin modificar otros atributos', () => {
      my_system.addCustomer(customer3);
      my_system.updateCustomer(3, undefined, undefined, 'Ciudad D');
      const customer = my_system.customers.find(c => c.id === 3);
      expect(customer).toBeDefined();
      expect(customer.location).toBe('Ciudad D');
      expect(customer.name).toBe('Doni');
      expect(customer.race).toBe('Enano');
   });
});

describe("Manipulación y visualización de merchants", () => {
  afterEach(() => {
    vi.restoreAllMocks(); 
  });

  let my_system = new MerchantManager();
  test("Adicion de mercaderes", () => {
    const spy = vi.spyOn(my_system, "addMerchant");
    my_system.addMerchant(merchant1);
    expect(my_system.merchants).toHaveLength(1);
    expect(spy).toHaveBeenCalledTimes(1);
    my_system.addMerchant(merchant2);
    expect(my_system.merchants).toHaveLength(2);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test("Visualización de mercaderes", () => {
    expect(my_system.findMerchantByName("Iker de Rivia")).toStrictEqual([merchant2]);
    expect(my_system.findMerchantByName("Segredus de Continente")).toStrictEqual([merchant1]);
  });

  test("Eliminación de mercaderes", () => {
    expect(my_system.merchants).toHaveLength(2);
    const spy = vi.spyOn(my_system, "removeMerchant");
    my_system.removeMerchant(1);
    expect(my_system.merchants).toHaveLength(1);
    expect(spy).toHaveBeenCalledTimes(1);
    my_system.removeMerchant(2);
    expect(my_system.merchants).toHaveLength(0);
    expect(spy).toHaveBeenCalledTimes(2);
  });
  test('actualiza solo la ubicación de un mercader sin modificar otros atributos', () => {
    my_system.addMerchant(merchant3);
    my_system.updateMerchant(3, undefined, undefined, 'Ciudad C');
   
    const merchant = my_system.merchants.find(m => m.id === 3);
    expect(merchant).toBeDefined();
    expect(merchant.location).toBe('Ciudad C');
    expect(merchant.name).toBe('Iker de Rivia');
    expect(merchant.type).toBe('Herrero');
  });
});

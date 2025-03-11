/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { describe, expect, expectTypeOf, it, test, vi, afterEach} from "vitest";
import { InventorySystem } from '../src/inventory_system';
import { Merchant } from "../src/mercants";
import { Good } from "../src/goods";
import { Customer } from "../src/other_clients";
//import exp from "constants";

let white_wolf_inn = new InventorySystem();
const customer1 = new Customer(1, "Geralt", "Brujo", "Rivia");
const customer2 = new Customer(2, "Doni", "Enano", "Novigrado");
const good1 = new Good(1, "Pocion de Golondrina", "Pocion de Brujo", "Murcielago", 0.1, 100);
const good2 = new Good(2, "Colonia de Lirio y Grosellas", "Una colonia muy especial", "Lirios y grosellas", 0.7, 60);
const merchant1 = new Merchant(1, "Segredus de Continente", "General", "Velen");
const merchant2 = new Merchant(2, "Iker de Rivia", "Herrero", "Rivia");

describe("listItems", () => {
  // test("Prueba básica de añadir y borrar customers", () => {
  //   white_wolf_inn.addCustomer(customer1);
  //   expect(white_wolf_inn.customers.length).toBe(1);
  //   expect(white_wolf_inn.customers[1]).toBe(customer1);
  // });
  // test("Prueba básica de añadir y borrar bienes", () => {
  //   white_wolf_inn.addItem(good1);
  //   white_wolf_inn.addItem(good2);
  //   expect(white_wolf_inn.items.length).toBe(2);
  //   expect(white_wolf_inn.items[2]).toBe(good2);
  //   white_wolf_inn.removeItem(2);
  //   expect(white_wolf_inn.items[2]).toBe(undefined);
  // });
  test("Funcionamiento normal", () => {
    white_wolf_inn.addItem(good1);
    white_wolf_inn.addItem(good2);
    expect(white_wolf_inn.listItems("name", true)).toStrictEqual([good2, good1]);
  });
});

describe("addItem", () => {
  afterEach(() => {
    vi.restoreAllMocks(); 
  });

  test("Funcionamiento normal", () => {
    let my_system = new InventorySystem();
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
    let my_system = new InventorySystem();
    my_system.addItem(good2);
    expect(my_system.items).toHaveLength(1);
    const spy = vi.spyOn(my_system, "removeItem");
    my_system.removeItem(2);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(my_system.items).toHaveLength(0);
  });
});

describe("Manipulación de customers", () => {
  afterEach(() => {
    vi.restoreAllMocks(); 
  });

  let my_system = new InventorySystem();
  test("Adicion de clientes", () => {
    const spy = vi.spyOn(my_system, "addCustomer");
    my_system.addCustomer(customer1);
    expect(my_system.customers).toHaveLength(1);
    expect(spy).toHaveBeenCalledTimes(1);
    my_system.addCustomer(customer2);
    expect(my_system.customers).toHaveLength(2);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test("Eliminación de clientes", () => {
    expect(my_system.customers).toHaveLength(2);
    const spy = vi.spyOn(my_system, "removeCustomer");
    my_system.removeCustomer(customer1);
    expect(my_system.customers).toHaveLength(1);
    expect(spy).toHaveBeenCalledTimes(1);
    my_system.removeCustomer(customer2);
    expect(my_system.customers).toHaveLength(0);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
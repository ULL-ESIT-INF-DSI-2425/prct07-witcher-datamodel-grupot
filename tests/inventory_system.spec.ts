/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { describe, expect, expectTypeOf, it, test } from "vitest";
import { InventorySystem } from '../src/inventory_system';
import { Merchant } from "../src/mercants";
import { Good } from "../src/goods";
import { Customer } from "../src/other_clients";
import exp from "constants";

let white_wolf_inn = new InventorySystem();
const customer1 = new Customer(1, "Geralt", "Brujo", "Rivia");
const customer2 = new Customer(2, "Doni", "Enano", "Novigrado");
const good1 = new Good(1, "Pocion de Golondrina", "Pocion de Brujo", "Murcielago", 0.1, 100);
const good2 = new Good(2, "Colonia de Lirio y Grosellas", "Una colonia muy especial", "Lirios y grosellas", 0.7, 60);
const merchant1 = new Merchant(1, "Segredus de Continente", "General", "Velen");
const merchant2 = new Merchant(2, "Iker de Rivia", "Herrero", "Rivia");

describe("Pruebas de Inventario", () => {
  test("Prueba básica de añadir y borrar customers"), () => {
    white_wolf_inn.addCustomer(customer1);
    expect(white_wolf_inn.customers.length).toBe(1);
    expect(white_wolf_inn.customers[1]).toBe(customer1);
  }
  test("Prueba básica de añadir y borrar bienes"), () => {
    white_wolf_inn.addItem(good1);
    white_wolf_inn.addItem(good2);
    expect(white_wolf_inn.items.length).toBe(2);
    expect(white_wolf_inn.items[2]).toBe(good2);
    white_wolf_inn.removeItem(2);
    expect(white_wolf_inn.items[2]).toBe(undefined);
  }
  test("Prueba de list items"), () => {
    let v: Good[] = [good2, good1]
    expect(white_wolf_inn.listItems("name", true)).toBe(v);
  }
});
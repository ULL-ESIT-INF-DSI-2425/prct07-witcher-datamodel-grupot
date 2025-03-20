/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, expectTypeOf, it, test } from "vitest";
import { Transaction } from "../../src/transaction.js";
import { Merchant } from "../../src/mercants.js";
import { Good } from "../../src/goods.js";

const good1 = new Good(1, "Pocion de Golondrina", "Pocion de Brujo", "Murcielago", 0.1, 100);
const good2 = new Good(2, "Colonia de Lirio y Grosellas", "Una colonia muy especial", "Lirios y grosellas", 0.7, 60);
const merchant1 = new Merchant(1, "Segredus de Continente", "General", "Velen");
const merchant2 = new Merchant(2, "Iker de Rivia", "Herrero", "Rivia");
const transaction1 = new Transaction(1, new Date(2025, 1, 2), merchant1, [good1], 2, "Compra");
const transaction2 = new Transaction(2, new Date(2025, 3, 1), merchant2, [good1, good2], 10, "Venta");

describe("Pruebas de Transaction", () => {
  test("Prueba básica de inicialización", () => {
    expect(transaction1.id).toBe(1);
    expect(transaction1.date).toBe(new Date(2025, 1, 2));
    expect(transaction1.buyerOrSeller).toBe(merchant1);
    expect(transaction1.goods).toBe([good1]);
    expect(transaction1.totalAmount).toBe(2);
    expect(transaction1.type).toBe("Compra");
  });
  test("Prueba básica de inicialización 2", () => {
    expect(transaction2.id).toBe(2);
    expect(transaction2.date).toBe(new Date(2025, 3, 1));
    expect(transaction2.buyerOrSeller).toBe(merchant2);
    expect(transaction2.goods).toBe([good1, good2]);
    expect(transaction2.totalAmount).toBe(10);
    expect(transaction2.type).toBe("Venta");
  });
});
/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, test } from "vitest";
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
    expect(transaction1.date).toStrictEqual(new Date(2025, 1, 2));
    expect(transaction1.buyerOrSeller).toBe(merchant1);
    expect(transaction1.goods).toStrictEqual([good1]);
    expect(transaction1.totalAmount).toBe(2);
    expect(transaction1.type).toBe("Compra");
  });
  test("Prueba básica de inicialización 2", () => {
    expect(transaction2.id).toBe(2);
    expect(transaction2.date).toStrictEqual(new Date(2025, 3, 1));
    expect(transaction2.buyerOrSeller).toBe(merchant2);
    expect(transaction2.goods).toStrictEqual([good1, good2]);
    expect(transaction2.totalAmount).toBe(10);
    expect(transaction2.type).toBe("Venta");
  });
  test("Pruebas de Setter", () => {
    expect(transaction1.id).toBe(1);
    expect(transaction1.date).toStrictEqual(new Date(2025, 1, 2));
    expect(transaction1.buyerOrSeller).toBe(merchant1);
    expect(transaction1.goods).toStrictEqual([good1]);
    expect(transaction1.totalAmount).toBe(2);
    expect(transaction1.type).toBe("Compra");
    transaction1.setId(3);
    transaction1.setDate(new Date(2025, 2, 5));
    transaction1.setBuyerSeller(merchant2);
    transaction1.setGoods([good2, good1]);
    transaction1.setTotalAmount(5);
    transaction1.setType("Venta");
    expect(transaction1.id).toBe(3);
    expect(transaction1.date).toStrictEqual(new Date(2025, 2, 5));
    expect(transaction1.buyerOrSeller).toBe(merchant2);
    expect(transaction1.goods).toStrictEqual([good2, good1]);
    expect(transaction1.totalAmount).toBe(5);
    expect(transaction1.type).toBe("Venta");
  });
});
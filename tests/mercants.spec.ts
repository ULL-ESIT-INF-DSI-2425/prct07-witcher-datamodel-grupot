/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { describe, expect, expectTypeOf, it, test } from "vitest";
import { Merchant } from '../src/mercants';

const merchant1 = new Merchant(1, "Segredus de Continente", "General", "Velen");
const merchant2 = new Merchant(2, "Iker de Rivia", "Herrero", "Rivia");

describe("Pruebas de Merchant", () => {
  test("Prueba básica de inicialización"), () => {
    expect(merchant1.id).toBe(1);
    expect(merchant1.name).toBe("Segredus de Continente");
    expect(merchant1.type).toBe("General");
    expect(merchant1.location).toBe("Velen");
  }
  test("Prueba básica de inicialización 2"), () => {
    expect(merchant2.id).toBe(2);
    expect(merchant2.name).toBe("Iker de Rivia");
    expect(merchant2.type).toBe("Herrero");
    expect(merchant2.location).toBe("Rivia");
  }
});
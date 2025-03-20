import { Good } from "./goods.js";
import { Merchant } from "./mercants.js";
import { Customer } from "./other_clients.js";

// Clase para representar una transacción
export class Transaction {
  constructor(
      public id: number,
      public date: Date,
      public buyerOrSeller: Merchant | Customer,
      public goods: Good[],
      public totalAmount: number,
      public type: "Compra" | "Venta" | "Devolución"
  ) {}
}
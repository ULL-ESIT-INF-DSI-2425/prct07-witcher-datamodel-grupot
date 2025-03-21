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

  get getId() { return this.id; };
  get getDate() { return this.date; };
  get getBuyerSeller() { return this.buyerOrSeller; };
  get getGoods() { return this.goods; };
  get getTotalAmount() { return this.totalAmount; };
  get getType() { return this.type; };

  setId(new_id: number) { this.id = new_id; };
  setDate(new_date: Date) { this.date = new_date; };
  setBuyerSeller(new_buyer_seller: Merchant | Customer) { this.buyerOrSeller = new_buyer_seller; };
  setGoods(new_goods: Good[]) { this.goods = new_goods; };
  setTotalAmount(new_amount: number) { this.totalAmount = new_amount; };
  setType(new_type: "Compra" | "Venta" | "Devolución") { this.type = new_type; };
}
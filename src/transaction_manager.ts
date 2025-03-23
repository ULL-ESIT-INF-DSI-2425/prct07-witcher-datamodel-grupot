import { Transaction } from './transaction.js';

// Clase que gestiona las transacciones
export class TransactionManager {
  private transactions: Transaction[] = [];

  /**
   * Método que sirve para obtener todas las transacciones
   * @returns Lista de transacciones
   */
  get getTransactions(): Transaction[] {
    return this.transactions;
  }

  /**
   * Método que añade una transacción al vector de almacenamiento
   * @param transaction - Transacción a añadir
   */
  addTransaction(transaction: Transaction): void {
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
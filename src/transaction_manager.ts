import { Transaction } from './transaction.js';

export class TransactionManager {
  private transactions: Transaction[] = [];

  // Add a new transaction
  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
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
import inquirer from 'inquirer';
import { GoodsManager } from './goodsManager.js';
import { Good } from './goods.js';
import { TransactionManager } from './transaction_manager.js';

export class reportGen {
  private inventory: GoodsManager;
  private transactions: TransactionManager;

  constructor(inventory: GoodsManager, transactions: TransactionManager) {
    this.inventory = inventory;
    this.transactions = transactions;
  }

  public async consultarStock(): Promise<void> {
    const items = this.inventory.items;
    if (items.length === 0) {
      console.log('El inventario está vacío.');
      return;
    }
    const { itemSeleccionado } = await inquirer.prompt([
      {
        type: 'list',
        name: 'itemSeleccionado',
        message: 'Seleccione el bien para consultar su stock:',
        choices: items.map(item => item.name)
      }
    ]);
    const bienesFiltrados = this.inventory.findItemByName(itemSeleccionado);
    if (bienesFiltrados.length === 0) {
      console.log(`No hay stock disponible para '${itemSeleccionado}'.`);
      return;
    }
    console.log(`\nEstado del stock para '${itemSeleccionado}':`);
    bienesFiltrados.forEach(bien => {
      console.log(`- ID: ${bien.id}, Material: ${bien.material}, Peso: ${bien.weight}, Valor: ${bien.value}`);
    });
  }

  public async consultarBienesMasVendidos(): Promise<void> {
    const transactions = this.transactions.getTransactions;
    if (transactions.length === 0) {
      console.log('No hay transacciones registradas.');
      return;
    }
    const salesCount: Record<number, { good: Good; count: number }> = {};
    transactions.forEach(transaction => {
      if (transaction.getType === 'Venta') {
        transaction.getGoods.forEach(good => {
          if (!salesCount[good.getId]) {
            salesCount[good.getId] = { good, count: 0 };
          }
          salesCount[good.getId].count++;
        });
      }
    });
    const sortedSales = Object.values(salesCount).sort((a, b) => b.count - a.count);
    if (sortedSales.length === 0) {
      console.log('No se han registrado ventas de bienes.');
      return;
    }
    console.log('\nBienes más vendidos:');
    sortedSales.forEach(({ good, count }, index) => {
      console.log(`${index + 1}. ${good.getName} - Vendido ${count} veces`);
    });
  }

  public async calcularIngresosYGastos(): Promise<void> {
    const transactions = this.transactions.getTransactions;
    if (transactions.length === 0) {
      console.log('No hay transacciones registradas.');
      return;
    }
    let totalVentas = 0;
    let totalCompras = 0;
    transactions.forEach(transaction => {
      if (transaction.getType === 'Venta') {
        totalVentas += transaction.getGoods.reduce((acc, bien) => {
          return acc + bien.getValue;
        }, 0);
      } else if (transaction.getType === 'Compra') {
        totalCompras += transaction.getGoods.reduce((acc, bien) => {
          return acc + bien.getValue;
        }, 0);;
      }
    });
    console.log('\nResumen de ingresos y gastos:');
    console.log(`Total de ingresos por ventas: ${totalVentas} monedas`);
    console.log(`Total de gastos en adquisiciones: ${totalCompras} monedas`);
  }
}

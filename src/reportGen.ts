import inquirer from 'inquirer';
import { GoodsManager } from './goodsManager.js';

export class reportGen {
  private inventory: GoodsManager;

  constructor(inventory: GoodsManager) {
    this.inventory = inventory;
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
}
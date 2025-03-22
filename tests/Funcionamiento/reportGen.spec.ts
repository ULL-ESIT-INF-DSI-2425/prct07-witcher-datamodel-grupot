import { describe, test, expect, vi, beforeEach } from 'vitest';
import inquirer from 'inquirer';
import { GoodsManager } from '../../src/goodsManager.js';
import { Good } from '../../src/goods.js';
import { reportGen } from '../../src/reportGen.js';

describe('reportGen', () => {
  let inventory: GoodsManager;
  let informe: reportGen;

  beforeEach(() => {
    inventory = new GoodsManager();
    inventory.addItem(new Good(1, 'Espada de Fuego', 'Una espada ardiente', 'Hierro', 3.5, 100));
    inventory.addItem(new Good(2, 'Escudo de Hierro', 'Un escudo resistente', 'Hierro', 5.0, 75));
    informe = new reportGen(inventory);
  });

  test('debería mostrar un mensaje si el inventario está vacío', async () => {
    inventory = new GoodsManager(); 
    informe = new reportGen(inventory);

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await informe.consultarStock();

    expect(consoleSpy).toHaveBeenCalledWith('El inventario está vacío.');
    consoleSpy.mockRestore();
  });

  test('debería mostrar la información del bien seleccionado', async () => {
    const promptSpy = vi.spyOn(inquirer, 'prompt').mockResolvedValue({ itemSeleccionado: 'Espada de Fuego' });
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await informe.consultarStock();

    expect(consoleSpy).toHaveBeenCalledWith("\nEstado del stock para 'Espada de Fuego':");
    expect(consoleSpy).toHaveBeenCalledWith("- ID: 1, Material: Hierro, Peso: 3.5, Valor: 100");

    promptSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  test('debería mostrar un mensaje si no hay stock del bien seleccionado', async () => {
    const promptSpy = vi.spyOn(inquirer, 'prompt').mockResolvedValue({ itemSeleccionado: 'Poción de Vida' });
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await informe.consultarStock();

    expect(consoleSpy).toHaveBeenCalledWith("No hay stock disponible para 'Poción de Vida'.");

    promptSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});

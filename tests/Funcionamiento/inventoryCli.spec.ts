import { describe, it, expect, vi, beforeEach } from "vitest";
import inquirer from "inquirer";
import { InventoryCLI } from "../../src/inventoryCly";
import { InventorySystem } from "../../src/inventory_system";
import { Good } from "../../src/goods";

// TODO: Cambiar el código para que acepte la primera prueba que por alguna razón no va

/**
 * EXPLICACIÓN DE LAS PRUEBAS:
 * vi de vistest sirve para llevar un rastreo e interacciones en la terminal
 * como si de un usuario fuera, funciona mediante "mocks" que piden al objeto
 * de la clase x que haga algo mediante una consola de comandos.
 * La parte:
 * ```
 * vi.mock('inquirer', () => ({
 *    prompt: typeof  vi.fn()
 * }));
 * ```
 * nos indica que los promts que usualmente van al usuario de inquirer
 * los recive vi para que interactúe con ellos
 */
vi.mock('inquirer', () => ({
  default: {
    prompt: vi.fn(),
  },
}));

vi.mock('../../src/inventory_system', () => ({
  InventorySystem: vi.fn(() => ({
    addItem: vi.fn(),
    removeItem: vi.fn(),
    listItems: vi.fn(() => []),
    findMerchantByName: vi.fn(),
    findCustomerByName: vi.fn(),
  })),
}));

describe('InventoryCLI', () => {
  let inventoryCLI: InventoryCLI;
  let mockInventorySystem: InventorySystem;

  beforeEach(() => {
    mockInventorySystem = new InventorySystem();
    inventoryCLI = new InventoryCLI(mockInventorySystem);
    vi.clearAllMocks();
  });

  it('debe llamar a manageGoods cuando se selecciona "Gestionar bienes"', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ option: 'Gestionar bienes' });
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ action: 'Volver' });
    await inventoryCLI.mainMenu();
    expect(inquirer.prompt).toHaveBeenCalledWith({
      type: "list",
      name: "action",
      message: "¿Qué deseas hacer?",
      choices: ["Agregar bien", "Eliminar bien", "Listar bienes", "Volver"],
    });
  });

  it('debe agregar un bien cuando se selecciona "Agregar bien"', async () => {
    vi.mocked(inquirer.prompt)
      .mockResolvedValueOnce({ action: 'Agregar bien' })
      .mockResolvedValueOnce({ id: 1, name: "Pocion de Golondrina", description: "Pocion de Brujo", material: "Murcielago", weight: 0.1, value: 100 });
    await inventoryCLI.manageGoods();
    expect(mockInventorySystem.addItem).toHaveBeenCalledWith(expect.any(Good));
    expect(mockInventorySystem.addItem).toHaveBeenCalledWith(
      new Good(1, "Pocion de Golondrina", "Pocion de Brujo", "Murcielago", 0.1, 100)
    );
  });

  it('debe eliminar un bien cuando se selecciona "Eliminar bien"', async () => {
    vi.mocked(inquirer.prompt)
      .mockResolvedValueOnce({ action: 'Eliminar bien' })
      .mockResolvedValueOnce({ id: 1 });
    await inventoryCLI.manageGoods();
    expect(mockInventorySystem.removeItem).toHaveBeenCalledWith(1);
  });

  it('debe listar bienes cuando se selecciona "Listar bienes"', async () => {
    vi.mocked(inquirer.prompt)
      .mockResolvedValueOnce({ action: 'Listar bienes' })
      .mockResolvedValueOnce({ orderBy: 'name', ascending: true });
    await inventoryCLI.manageGoods();
    expect(mockInventorySystem.listItems).toHaveBeenCalledWith('name', true);
  });

  it('debe salir cuando se selecciona "Salir"', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ option: 'Salir' });
    const consoleSpy = vi.spyOn(console, 'log');
    await inventoryCLI.mainMenu();
    expect(consoleSpy).toHaveBeenCalledWith('Saliendo...');
  });
});
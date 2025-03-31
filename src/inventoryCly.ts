import inquirer from "inquirer";
import { GoodsManager } from "./goodsManager.js";
import { Good } from "./goods.js";
import { MerchantManager } from "./mercant_manager.js";
import { Merchant } from "./mercants.js";
import { CustomerManager } from "./customer_manager.js";
import { Customer } from "./customer.js";
import { TransactionManager } from "./transaction_manager.js";

export class InventoryCLI {
  private inventory: GoodsManager;
  private merchantManager: MerchantManager;
  private customerManager: CustomerManager;
  private transactionManager: TransactionManager;

  constructor(
    inventory: GoodsManager,
    merchantManager: MerchantManager,
    customerManager: CustomerManager,
    transactionManager: TransactionManager
  ) {
    this.inventory = inventory;
    this.merchantManager = merchantManager;
    this.customerManager = customerManager;
    this.transactionManager = transactionManager;
  }

  async mainMenu() {
    const choices = [
      "Gestionar bienes",
      "Gestionar mercaderes",
      "Gestionar clientes",
      "Salir",
    ];

    const { option } = await inquirer.prompt({
      type: "list",
      name: "option",
      message: "Selecciona una opción:",
      choices,
    });

    switch (option) {
      case "Gestionar bienes":
        await this.manageGoods();
        break;
      case "Gestionar mercaderes":
        await this.manageMerchants();
        break;
      case "Gestionar clientes":
        await this.manageCustomers();
        break;
      case "Salir":
        console.log("Saliendo...");
        return;
    }
    await this.mainMenu();
  }

  async manageGoods() {
    const choices = ["Agregar bien", "Eliminar bien", "Listar bienes", "Volver"];
    const { action } = await inquirer.prompt({
      type: "list",
      name: "action",
      message: "¿Qué deseas hacer?",
      choices,
    });

    if (action === "Agregar bien") {
      const { id, name, description, material, weight, value } = await inquirer.prompt([
        { type: "number", name: "id", message: "Id del objeto:" },
        { type: "input", name: "name", message: "Nombre del bien:" },
        { type: "input", name: "description", message: "Breve descripción:" },
        { type: "input", name: "material", message: "Material del que está hecho:" },
        { type: "number", name: "weight", message: "Peso del objeto:" },
        { type: "number", name: "value", message: "Valor en coronas:" },
      ]);
      const newGood = new Good(id, name, description, material, weight, value);
      this.inventory.addItem(newGood);
      console.log("Bien agregado con éxito.");
    }

    if (action === "Eliminar bien") {
      const { id } = await inquirer.prompt({
        type: "number",
        name: "id",
        message: "ID del bien a eliminar:",
      });
      this.inventory.removeItem(id);
      console.log("Bien eliminado (si existía).");
    }

    if (action === "Listar bienes") {
      const { orderBy, ascending } = await inquirer.prompt([
        {
          type: "list",
          name: "orderBy",
          message: "Ordenar por:",
          choices: ["name", "value"],
        },
        { type: "confirm", name: "ascending", message: "Orden ascendente?" },
      ]);
      console.log(
        this.inventory.listItems(orderBy as "name" | "value", ascending)
      );
    }
  }

  async manageMerchants() {
    const choices = [
      "Agregar mercader",
      "Eliminar mercader",
      "Actualizar mercader",
      "Listar mercaderes",
      "Buscar mercader",
      "Volver"
    ];
    const { action } = await inquirer.prompt({
      type: "list",
      name: "action",
      message: "¿Qué deseas hacer?",
      choices,
    });

    if (action === "Agregar mercader") {
      const { id, name, type, location } = await inquirer.prompt([
        { type: "number", name: "id", message: "ID del mercader:" },
        { type: "input", name: "name", message: "Nombre del mercader:" },
        { type: "input", name: "type", message: "Tipo de mercader:" },
        { type: "input", name: "location", message: "Ubicación del mercader:" },
      ]);
      const newMerchant = new Merchant(id, name, type, location);
      this.merchantManager.addMerchant(newMerchant);
      console.log("Mercader agregado con éxito.");
    }

    if (action === "Eliminar mercader") {
      const { id } = await inquirer.prompt({
        type: "number",
        name: "id",
        message: "ID del mercader a eliminar:",
      });
      this.merchantManager.removeMerchant(id);
      console.log("Mercader eliminado (si existía).");
    }

    if (action === "Actualizar mercader") {
      const { id, name, type, location } = await inquirer.prompt([
        { type: "number", name: "id", message: "ID del mercader a actualizar:" },
        { type: "input", name: "name", message: "Nuevo nombre (dejar vacío para no cambiar):" },
        { type: "input", name: "type", message: "Nuevo tipo (dejar vacío para no cambiar):" },
        { type: "input", name: "location", message: "Nueva ubicación (dejar vacío para no cambiar):" },
      ]);
      this.merchantManager.updateMerchant(id, name || undefined, type || undefined, location || undefined);
      console.log("Mercader actualizado.");
    }

    if (action === "Listar mercaderes") {
      console.log(this.merchantManager.merchants);
    }

    if (action === "Buscar mercader") {
      const { searchType } = await inquirer.prompt({
        type: "list",
        name: "searchType",
        message: "Buscar mercader por:",
        choices: ["Nombre", "Tipo", "Ubicación"],
      });

      let merchants;
      if (searchType === "Nombre") {
        const { name } = await inquirer.prompt({ type: "input", name: "name", message: "Nombre del mercader:" });
        merchants = this.merchantManager.findMerchantByName(name);
      } else if (searchType === "Tipo") {
        const { type } = await inquirer.prompt({ type: "input", name: "type", message: "Tipo de mercader:" });
        merchants = this.merchantManager.findMerchantByType(type);
      } else {
        const { location } = await inquirer.prompt({ type: "input", name: "location", message: "Ubicación:" });
        merchants = this.merchantManager.findMerchantByLocation(location);
      }
      console.log(merchants.length ? merchants : "No se encontraron mercaderes.");
    }
  }

  async manageCustomers() {
    const choices = [
      "Agregar cliente",
      "Eliminar cliente",
      "Actualizar cliente",
      "Listar clientes",
      "Buscar cliente",
      "Volver"
    ];
    const { action } = await inquirer.prompt({
      type: "list",
      name: "action",
      message: "¿Qué deseas hacer?",
      choices,
    });

    if (action === "Agregar cliente") {
      const { id, name, race, location } = await inquirer.prompt([
        { type: "number", name: "id", message: "ID del cliente:" },
        { type: "input", name: "name", message: "Nombre del cliente:" },
        { type: "input", name: "race", message: "Raza del cliente:" },
        { type: "input", name: "location", message: "Ubicación del cliente:" },
      ]);
      const newCustomer = new Customer(id, name, race, location);
      this.customerManager.addCustomer(newCustomer);
      console.log("Cliente agregado con éxito.");
    }

    if (action === "Eliminar cliente") {
      const { id } = await inquirer.prompt({
        type: "number",
        name: "id",
        message: "ID del cliente a eliminar:",
      });
      this.customerManager.removeCustomer(id);
      console.log("Cliente eliminado (si existía).");
    }

    if (action === "Actualizar cliente") {
      const { id, name, race, location } = await inquirer.prompt([
        { type: "number", name: "id", message: "ID del cliente a actualizar:" },
        { type: "input", name: "name", message: "Nuevo nombre (dejar vacío para no cambiar):" },
        { type: "input", name: "race", message: "Nueva raza (dejar vacío para no cambiar):" },
        { type: "input", name: "location", message: "Nueva ubicación (dejar vacío para no cambiar):" },
      ]);
      this.customerManager.updateCustomer(id, name || undefined, race || undefined, location || undefined);
      console.log("Cliente actualizado.");
    }

    if (action === "Listar clientes") {
      console.log(this.customerManager.customers);
    }

    if (action === "Buscar cliente") {
      const { searchType } = await inquirer.prompt({
        type: "list",
        name: "searchType",
        message: "Buscar cliente por:",
        choices: ["Nombre", "Raza", "Ubicación"],
      });
    
      let customers: Customer[] = []; // Inicializamos como array vacío
    
      if (searchType === "Nombre") {
        const { name } = await inquirer.prompt({ type: "input", name: "name", message: "Nombre del cliente:" });
        const customer = this.customerManager.findCustomerByName(name);
        if (customer) {
          customers = [customer]; // Se asigna como un array con un solo elemento
        }
      } else if (searchType === "Raza") {
        const { race } = await inquirer.prompt({ type: "input", name: "race", message: "Raza del cliente:" });
        customers = this.customerManager.findCustomerByRace(race);
      } else {
        const { location } = await inquirer.prompt({ type: "input", name: "location", message: "Ubicación:" });
        customers = this.customerManager.findCustomerByLocation(location);
      }
    
      console.log(customers.length ? customers : "No se encontraron clientes.");
    }    
  }
}
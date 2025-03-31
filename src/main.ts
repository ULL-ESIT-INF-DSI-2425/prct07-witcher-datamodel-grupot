import { InventoryCLI } from "./inventoryCly.js";
import { GoodsManager } from "./goodsManager.js";
import { MerchantManager } from "./mercant_manager.js";
import { CustomerManager } from "./customer_manager.js";
import { TransactionManager } from "./transaction_manager.js";

async function main() {
  const inventory = new GoodsManager();
  const merchantManager = new MerchantManager();
  const customerManager = new CustomerManager();
  const transactionManager = new TransactionManager();

  const cli = new InventoryCLI(inventory, merchantManager, customerManager, transactionManager);
  await cli.mainMenu();
}

main().catch((error) => console.error("Error en la ejecución:", error));
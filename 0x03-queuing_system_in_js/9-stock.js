const express = require('express');
const { createClient } = require('redis');
const { promisify } = require('util');

const app = express();
const port = 1245;
const client = createClient();

client.flushall()
const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemIdd: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 } 
];

function getItemById(itemId) {
  return listProducts.filter((product) => product.itemId == itemId)[0];
}

const asyncSet = promisify(client.set).bind(client);
const asyncGet = promisify(client.get).bind(client);

async function reserveStockById(itemId, stock) {
  await asyncSet(itemId, stock)
}

async function getCurrentReservedStockById(itemId) {
  const stock = await asyncGet(itemId);
  return stock ? stock : 0;
}

app.get('/list_products', (req, res) => {
  res.send(JSON.stringify(listProducts));
});

app.get('/list_products/:itemId', async (req, res) => {
  try{
    const itemId = req.params.itemId
    const stock = await getCurrentReservedStockById(itemId);
    const item = getItemById(itemId);
    console.log(stock)
    item['currentQuantity'] = item.initialAvailableQuantity - stock;
    res.send(JSON.stringify(item))
  } catch (error) {
    console.log(error.message)
    res.send(JSON.stringify({"status":"Product not found"}));
  }
});

app.get('/reserve_product/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const stock = +(await getCurrentReservedStockById(itemId));
    const item = getItemById(itemId);
    if (stock === item.initialAvailableQuantity) {
      res.send(JSON.stringify({"status":"Not enough stock available","itemId":itemId}));
    } else {
      await reserveStockById(itemId, stock + 1);
      res.send(JSON.stringify({"status":"Reservation confirmed","itemId":itemId}));
    }
  } catch {
    res.send(JSON.stringify({"status":"Product not found"}))
  }
});

app.listen(port, () => {
  console.log(`server currently listening on port ${port}`);
});
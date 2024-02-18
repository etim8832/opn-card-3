const express = require("express");
const app = express();
const Cart = require("./src/services/card");

app.use(express.json());
const port = 3000

app.listen(port, () => {
  const cart = new Cart()
  cart.add(1, 5)
  // cart.add(2, 2)
  // cart.add(1, 2)

  let name = 'discout1'
  let discount = {type: "fixed", amount: 10}
  cart.addDiscount(name, discount)
  const total1 = cart.total()
  console.log('show total1 -> ', total1)
  cart.removeDiscount(name)

  let name2 = 'discout2'
  let discount2 = {type: "percentage", amount: 10, max: 100}
  cart.addDiscount(name2, discount2)
  const total2 = cart.total()
  console.log('show total2 -> ', total2)


  cart.removeDiscount(name2)
  const totalDiscount = cart.total()
  console.log('show totalDiscount after remove discount -> ', totalDiscount)


  // Freebie 
  condition = {type: "contains", product_id: 1}
  reward = {product_id: 2, quantity: 1, isReward: true}
  cart.addFreebie(name, condition, reward)
  
  const has = cart.has(1) // true
  const count = cart.count() // 2
  console.log('show has -> ', has)
  console.log('show count -> ', count)

})
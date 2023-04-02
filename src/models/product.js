class Product {
  constructor(name, basePrice) {
    this.name = name;
    this.basePrice = basePrice; // The base price of the product
    this.quantity = 0; // The quantity of the product available for purchase
  }

  // Method to calculate the price of the product based on the prices of competing markets
  calculatePrice(markets) {
    let totalPrices = 0;
    let numMarkets = 0;

    // Loop through all the other markets and add up their prices for this product
    for (let market of markets) {
      if (market === this.market) continue; // Skip the current market
      let product = market.getProductByName(this.name);
      if (!product) continue; // Skip if the product isn't available in this market
      totalPrices += product.getPrice();
      numMarkets++;
    }

    if (numMarkets > 0) {
      // Calculate the average price of the product in all other markets
      let averagePrice = totalPrices / numMarkets;
      // Set the price of this product to a percentage of the average price
      this.price = averagePrice * (Math.random() * 0.2 + 0.9); // Randomly adjust the price up to 10%
    } else {
      // If there are no other markets selling this product, set the price to the base price
      this.price = this.basePrice;
    }
  }

  // Method to get the current price of the product
  getPrice() {
    return this.price;
  }

  // Method to add to the quantity of the product available for purchase
  addToQuantity(quantity) {
    this.quantity += quantity;
  }

  // Method to subtract from the quantity of the product available for purchase
  subtractFromQuantity(quantity) {
    if (this.quantity >= quantity) {
      this.quantity -= quantity;
      return true; // Return true if the subtraction was successful
    } else {
      return false; // Return false if there isn't enough quantity available to subtract
    }
  }

  // Method to set the market where this product is being sold
  setMarket(market) {
    this.market = market;
  }
}

export default Product

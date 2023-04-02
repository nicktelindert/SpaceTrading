import Product from './product.js';
// Define a market class
class Market {
  constructor(name) {
    this.name = name;
    this.products = this.generateProductList(); // An array of products being sold in this market
    // Set the market for each product to this market
    for (let product of this.products) {
      product.setMarket(this);
    }
  }

  generateProductList() {
    // Generate a list of 10 random products with random prices
    const productNames = [
      'Purple Bananas',
      'Thorium Bike',
      'Brown Apples',
      'Onion Flavoured Chocolade',
      'Ogre Puppy',
      'The Strange Behaviour Of Humans(Book)',
      'Animal Speech translator',
      'Fluffy Gun',
      'Pet Human',
      'Human biscuits',
    ];

    const products = [];

    for (let i = 0; i < 10; i++) {
      const name = productNames[Math.floor(Math.random() * productNames.length)];
      const price = Math.floor(Math.random() * 1000) + 1; // Generate a random price between 1 and 1000
      products.push(new Product(name, price));
    }

    return products;
  }
  // Method to get a product by its name
  getProductByName(name) {
    for (let product of this.products) {
      if (product.name === name) {
        return product;
      }
    }
    return null; // Return null if the product isn't found in this market
  }

  // Method to update the prices of all products in the market based on prices in other markets
  updatePrices(otherMarkets) {
    for (let product of this.products) {
      product.calculatePrice(otherMarkets);
    }
  }
}

export default Market

/**
 * Simple Checkout Implementation
 * A basic shopping cart checkout system
 */

class Checkout {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  /**
   * Add an item to the checkout
   * @param {Object} item - Item to add
   * @param {string} item.name - Name of the item
   * @param {number} item.price - Price of the item
   * @param {number} item.quantity - Quantity of the item
   */
  addItem(item) {
    if (!item || !item.name || typeof item.price !== 'number' || typeof item.quantity !== 'number') {
      throw new Error('Invalid item: must have name, price, and quantity');
    }
    if (item.price < 0 || item.quantity < 1) {
      throw new Error('Price must be non-negative and quantity must be at least 1');
    }
    
    this.items.push(item);
    this.calculateTotal();
  }

  /**
   * Remove an item from the checkout
   * @param {number} index - Index of the item to remove
   */
  removeItem(index) {
    if (index < 0 || index >= this.items.length) {
      throw new Error('Invalid item index');
    }
    this.items.splice(index, 1);
    this.calculateTotal();
  }

  /**
   * Calculate the total price
   */
  calculateTotal() {
    this.total = this.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }

  /**
   * Get the current total
   * @returns {number} Current total
   */
  getTotal() {
    return this.total;
  }

  /**
   * Get all items in the checkout
   * @returns {Array} Array of items
   */
  getItems() {
    return [...this.items];
  }

  /**
   * Clear all items from the checkout
   */
  clear() {
    this.items = [];
    this.total = 0;
  }

  /**
   * Complete the checkout process
   * @returns {Object} Checkout summary
   */
  complete() {
    if (this.items.length === 0) {
      throw new Error('Cannot complete checkout: cart is empty');
    }
    
    const summary = {
      items: [...this.items],
      total: this.total,
      itemCount: this.items.length,
      timestamp: new Date().toISOString()
    };
    
    this.clear();
    return summary;
  }
}

module.exports = Checkout;

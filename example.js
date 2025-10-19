/**
 * Example usage of the Checkout system
 */

const Checkout = require('./checkout');

console.log('=== Checkout System Example ===\n');

// Create a new checkout
const checkout = new Checkout();
console.log('1. Created new checkout');

// Add items
checkout.addItem({ name: 'Apple', price: 1.50, quantity: 3 });
console.log('2. Added 3 Apples at $1.50 each');

checkout.addItem({ name: 'Banana', price: 0.75, quantity: 5 });
console.log('3. Added 5 Bananas at $0.75 each');

checkout.addItem({ name: 'Orange', price: 2.00, quantity: 2 });
console.log('4. Added 2 Oranges at $2.00 each');

// Display current items and total
console.log('\nCurrent items:');
checkout.getItems().forEach((item, index) => {
  console.log(`  ${index + 1}. ${item.name} - $${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`);
});
console.log(`\nCurrent total: $${checkout.getTotal().toFixed(2)}`);

// Complete the checkout
console.log('\n5. Completing checkout...');
const summary = checkout.complete();

console.log('\n=== Checkout Summary ===');
console.log(`Total items: ${summary.itemCount}`);
console.log(`Total amount: $${summary.total.toFixed(2)}`);
console.log(`Timestamp: ${summary.timestamp}`);
console.log('\n✓ Checkout completed successfully!');

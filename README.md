# test-1-checkout

A simple shopping cart checkout system implementation in JavaScript.

## Features

- Add items to checkout with name, price, and quantity
- Remove items from checkout
- Calculate total price automatically
- Complete checkout and get summary
- Input validation for items
- Clear checkout cart

## Usage

### Basic Example

```javascript
const Checkout = require('./checkout');

// Create a new checkout
const checkout = new Checkout();

// Add items
checkout.addItem({ name: 'Apple', price: 1.50, quantity: 3 });
checkout.addItem({ name: 'Banana', price: 0.75, quantity: 5 });

// Get current total
console.log(checkout.getTotal()); // 8.25

// Complete checkout
const summary = checkout.complete();
console.log(summary);
// {
//   items: [...],
//   total: 8.25,
//   itemCount: 2,
//   timestamp: '2025-10-19T02:12:15.396Z'
// }
```

### Running Examples

Run the example file to see the checkout system in action:

```bash
node example.js
```

## Testing

Run the test suite:

```bash
node checkout.test.js
```

## API

### `new Checkout()`

Creates a new checkout instance.

### `addItem(item)`

Adds an item to the checkout.

- `item.name` (string): Name of the item
- `item.price` (number): Price of the item (must be non-negative)
- `item.quantity` (number): Quantity of the item (must be at least 1)

### `removeItem(index)`

Removes an item at the specified index.

### `getTotal()`

Returns the current total price.

### `getItems()`

Returns a copy of all items in the checkout.

### `clear()`

Clears all items from the checkout.

### `complete()`

Completes the checkout and returns a summary object. Clears the cart after completion.

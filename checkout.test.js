/**
 * Tests for Checkout Implementation
 */

const Checkout = require('./checkout');

// Simple test framework
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected} but got ${actual}`);
  }
}

function test(description, fn) {
  try {
    fn();
    console.log(`✓ ${description}`);
  } catch (error) {
    console.error(`✗ ${description}`);
    console.error(`  ${error.message}`);
    process.exit(1);
  }
}

// Tests
console.log('Running Checkout Tests...\n');

test('Checkout can be instantiated', () => {
  const checkout = new Checkout();
  assert(checkout instanceof Checkout, 'Should create a Checkout instance');
  assertEqual(checkout.getTotal(), 0, 'Initial total should be 0');
  assertEqual(checkout.getItems().length, 0, 'Initial items should be empty');
});

test('Can add items to checkout', () => {
  const checkout = new Checkout();
  checkout.addItem({ name: 'Apple', price: 1.50, quantity: 2 });
  assertEqual(checkout.getItems().length, 1, 'Should have 1 item');
  assertEqual(checkout.getTotal(), 3.00, 'Total should be 3.00');
});

test('Can add multiple items', () => {
  const checkout = new Checkout();
  checkout.addItem({ name: 'Apple', price: 1.50, quantity: 2 });
  checkout.addItem({ name: 'Banana', price: 0.75, quantity: 3 });
  assertEqual(checkout.getItems().length, 2, 'Should have 2 items');
  assertEqual(checkout.getTotal(), 5.25, 'Total should be 5.25');
});

test('Can remove items from checkout', () => {
  const checkout = new Checkout();
  checkout.addItem({ name: 'Apple', price: 1.50, quantity: 2 });
  checkout.addItem({ name: 'Banana', price: 0.75, quantity: 3 });
  checkout.removeItem(0);
  assertEqual(checkout.getItems().length, 1, 'Should have 1 item after removal');
  assertEqual(checkout.getTotal(), 2.25, 'Total should be 2.25 after removal');
});

test('Throws error for invalid item', () => {
  const checkout = new Checkout();
  let errorThrown = false;
  try {
    checkout.addItem({ name: 'Invalid' });
  } catch (error) {
    errorThrown = true;
    assert(error.message.includes('Invalid item'), 'Should throw error for invalid item');
  }
  assert(errorThrown, 'Should have thrown an error');
});

test('Throws error for negative price', () => {
  const checkout = new Checkout();
  let errorThrown = false;
  try {
    checkout.addItem({ name: 'Invalid', price: -1, quantity: 1 });
  } catch (error) {
    errorThrown = true;
    assert(error.message.includes('non-negative'), 'Should throw error for negative price');
  }
  assert(errorThrown, 'Should have thrown an error');
});

test('Can clear the checkout', () => {
  const checkout = new Checkout();
  checkout.addItem({ name: 'Apple', price: 1.50, quantity: 2 });
  checkout.clear();
  assertEqual(checkout.getItems().length, 0, 'Should have no items after clear');
  assertEqual(checkout.getTotal(), 0, 'Total should be 0 after clear');
});

test('Can complete checkout', () => {
  const checkout = new Checkout();
  checkout.addItem({ name: 'Apple', price: 1.50, quantity: 2 });
  const summary = checkout.complete();
  assert(summary.items.length === 1, 'Summary should contain 1 item');
  assertEqual(summary.total, 3.00, 'Summary total should be 3.00');
  assert(summary.timestamp, 'Summary should have timestamp');
  assertEqual(checkout.getItems().length, 0, 'Checkout should be cleared after completion');
});

test('Cannot complete empty checkout', () => {
  const checkout = new Checkout();
  let errorThrown = false;
  try {
    checkout.complete();
  } catch (error) {
    errorThrown = true;
    assert(error.message.includes('empty'), 'Should throw error for empty cart');
  }
  assert(errorThrown, 'Should have thrown an error');
});

console.log('\n✓ All tests passed!');

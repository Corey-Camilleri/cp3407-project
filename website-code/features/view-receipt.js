// Sample receipt data
const receipts = [
  {
    id: 1,
    date: "2026-03-16",
    items: [
      { name: "Burger", price: 10 },
      { name: "Fries", price: 5 }
    ],
    total: 15
  },
  {
    id: 2,
    date: "2026-03-15",
    items: [
      { name: "Pizza", price: 12 },
      { name: "Soda", price: 3 }
    ],
    total: 15
  },
  {
    id: 3,
    date: "2026-03-14",
    items: [
      { name: "Salad", price: 7 },
      { name: "Juice", price: 4 }
    ],
    total: 11
  }
];

// Function to display receipt details
function viewReceipt(receiptId) {
  const receipt = receipts.find(r => r.id == receiptId);
  if (!receipt) return;

  let content = `Receipt #${receipt.id}\nDate: ${receipt.date}\n\nItems:\n`;
  receipt.items.forEach(item => {
    content += ` - ${item.name}: $${item.price}\n`;
  });
  content += `\nTotal: $${receipt.total}`;

  document.getElementById('receiptContent').textContent = content;
}

// Function to populate receipt list
function populateReceiptList() {
  const listDiv = document.getElementById('receiptList');
  receipts.forEach(receipt => {
    const btn = document.createElement('button');
    btn.textContent = `View Receipt #${receipt.id} (${receipt.date})`;
    btn.addEventListener('click', () => viewReceipt(receipt.id));
    listDiv.appendChild(btn);
  });
}

// Initialize the page
populateReceiptList();
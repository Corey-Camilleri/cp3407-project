document.addEventListener('DOMContentLoaded', () => {
  const ticketForm = document.getElementById('ticketForm');
  const customerNameInput = document.getElementById('customerName');
  const orderRefInput = document.getElementById('orderRef');
  const issueTypeInput = document.getElementById('issueType');
  const issueDetailsInput = document.getElementById('issueDetails');
  const ticketListEl = document.getElementById('ticketList');

  // Load tickets from localStorage
  function loadTickets() {
    return JSON.parse(localStorage.getItem('customerTickets')) || [];
  }

  // Save tickets to localStorage
  function saveTickets(tickets) {
    localStorage.setItem('customerTickets', JSON.stringify(tickets));
  }

  // Render tickets in the UI
  function renderTickets() {
    const tickets = loadTickets();
    ticketListEl.innerHTML = '';

    if (tickets.length === 0) {
      ticketListEl.textContent = 'No tickets submitted yet.';
      return;
    }

    tickets.forEach((ticket) => {
      const div = document.createElement('div');
      div.className = 'ticket-item';
      div.innerHTML = `
        <span>${ticket.customerName}</span> (${ticket.orderRef || 'No order reference'})<br>
        Type: ${ticket.type}<br>
        Details: ${ticket.details}<br>
        Status: ${ticket.status || 'Pending'}<br>
        Submitted: ${new Date(ticket.createdAt).toLocaleString()}
      `;
      ticketListEl.appendChild(div);
    });
  }

  // Handle form submission
  ticketForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const customerName = customerNameInput.value.trim();
    const orderRef = orderRefInput.value.trim();
    const type = issueTypeInput.value.trim();
    const details = issueDetailsInput.value.trim();

    if (!customerName || !type || !details) {
      alert('Please fill out all required fields.');
      return;
    }

    const tickets = loadTickets();
    tickets.push({
      customerName,
      orderRef,
      type,
      details,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    });

    saveTickets(tickets);
    renderTickets();
    ticketForm.reset();
  });

  // Live update if tickets change in another tab
  window.addEventListener('storage', (event) => {
    if (event.key === 'customerTickets') renderTickets();
  });

  renderTickets();
});
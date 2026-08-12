const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'API Request failed');
    }
    return data;
  } catch (err) {
    console.error(`API Error on ${endpoint}:`, err);
    throw err;
  }
}

export const api = {
  // Auth
  loginOwner: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  registerOwner: (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

  // Stats & Summary
  getStats: (propertyId) => request(`/stats${propertyId ? `?propertyId=${propertyId}` : ''}`),

  // Properties
  getProperties: () => request('/properties'),
  createProperty: (data) => request('/properties', { method: 'POST', body: JSON.stringify(data) }),

  // Rooms & Beds
  getRooms: (propertyId) => request(`/rooms${propertyId ? `?propertyId=${propertyId}` : ''}`),
  createRoom: (data) => request('/rooms', { method: 'POST', body: JSON.stringify(data) }),
  deleteRoom: (id) => request(`/rooms/${id}`, { method: 'DELETE' }),
  updateBedStatus: (roomId, bedNo, status) => request(`/rooms/${roomId}/beds/${bedNo}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),

  // Students & KYC
  getStudents: (propertyId) => request(`/students${propertyId ? `?propertyId=${propertyId}` : ''}`),
  allocateBed: (data) => request('/students/allocate', { method: 'POST', body: JSON.stringify(data) }),
  updateTenantKYC: (studentId, kycData) => request(`/students/${studentId}/kyc`, { method: 'PUT', body: JSON.stringify(kycData) }),
  transferBed: (data) => request('/students/transfer', { method: 'POST', body: JSON.stringify(data) }),
  checkoutStudent: (data) => request('/students/checkout', { method: 'POST', body: JSON.stringify(data) }),

  // Invoices & Payments
  getInvoices: (propertyId) => request(`/invoices${propertyId ? `?propertyId=${propertyId}` : ''}`),
  generateInvoice: (data) => request('/invoices/generate', { method: 'POST', body: JSON.stringify(data) }),
  settleInvoice: (data) => request('/invoices/settle', { method: 'POST', body: JSON.stringify(data) }),

  // Expenses
  getExpenses: (propertyId) => request(`/expenses${propertyId ? `?propertyId=${propertyId}` : ''}`),
  createExpense: (data) => request('/expenses', { method: 'POST', body: JSON.stringify(data) }),

  // Complaints
  getComplaints: (propertyId) => request(`/complaints${propertyId ? `?propertyId=${propertyId}` : ''}`),
  createComplaint: (data) => request('/complaints', { method: 'POST', body: JSON.stringify(data) }),
  assignComplaintStaff: (id, assignedStaff) => request(`/complaints/${id}/assign`, { method: 'PUT', body: JSON.stringify({ assignedStaff }) }),
  updateComplaintStatus: (id, status) => request(`/complaints/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
};

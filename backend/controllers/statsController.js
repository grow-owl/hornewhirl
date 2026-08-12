import { readDB } from '../config/db.js';

export const getStats = (req, res) => {
  const db = readDB();
  const propertyId = parseInt(req.query.propertyId) || (db.properties && db.properties[0] ? db.properties[0].id : null);

  if (!propertyId) {
    return res.json({
      success: true,
      propertyId: null,
      stats: {
        totalBeds: 0,
        occupiedBeds: 0,
        vacantBeds: 0,
        maintenanceBeds: 0,
        occupancyPercentage: 0,
        totalMonthlyRevenue: 0,
        pendingRentSum: 0,
        pendingDuesCount: 0,
        totalExpenses: 0,
        netProfit: 0,
        totalStudentsCount: 0,
        openComplaintsCount: 0
      },
      staffList: [
        'Ramesh (Electrician)',
        'Suresh (Plumber)',
        'Anita (Housekeeping)',
        'Vijay (Carpenter)',
        'Rajesh (General Maintenance)'
      ]
    });
  }

  const rooms = (db.rooms || []).filter((r) => r.propertyId === propertyId);
  const students = (db.students || []).filter((s) => s.propertyId === propertyId && s.status !== 'CHECKED_OUT');
  const invoices = (db.invoices || []).filter((i) => i.propertyId === propertyId);
  const expenses = (db.expenses || []).filter((e) => e.propertyId === propertyId);
  const complaints = (db.complaints || []).filter((c) => c.propertyId === propertyId);

  let totalBeds = 0;
  let occupiedBeds = 0;
  let vacantBeds = 0;
  let maintenanceBeds = 0;

  rooms.forEach((r) => {
    (r.beds || []).forEach((b) => {
      totalBeds += 1;
      if (b.status === 'OCCUPIED') occupiedBeds += 1;
      else if (b.status === 'MAINTENANCE') maintenanceBeds += 1;
      else vacantBeds += 1;
    });
  });

  const occupancyPercentage = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  const totalMonthlyRevenue = invoices
    .filter((i) => i.status === 'PAID')
    .reduce((acc, i) => acc + (i.paidAmount || i.amount || 0), 0);

  const pendingInvoices = invoices.filter((i) => i.status === 'DUE' || i.status === 'OVERDUE');
  const pendingRentSum = pendingInvoices.reduce((acc, i) => acc + (i.amount || 0), 0);
  const pendingDuesCount = pendingInvoices.length;

  const totalExpenses = expenses.reduce((acc, e) => acc + (e.amount || 0), 0);
  const netProfit = totalMonthlyRevenue - totalExpenses;

  const staffList = [
    'Ramesh (Electrician)',
    'Suresh (Plumber)',
    'Anita (Housekeeping)',
    'Vijay (Carpenter)',
    'Rajesh (General Maintenance)'
  ];

  res.json({
    success: true,
    propertyId,
    stats: {
      totalBeds,
      occupiedBeds,
      vacantBeds,
      maintenanceBeds,
      occupancyPercentage,
      totalMonthlyRevenue,
      pendingRentSum,
      pendingDuesCount,
      totalExpenses,
      netProfit,
      totalStudentsCount: students.length,
      openComplaintsCount: complaints.filter((c) => c.status !== 'RESOLVED').length
    },
    staffList
  });
};

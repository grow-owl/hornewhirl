import React, { createContext, useState, useEffect, useContext } from "react";
import { api } from "../services/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Role & Auth state
  const [role, setRole] = useState("owner");
  const [currentOwner, setCurrentOwner] = useState(() => {
    try {
      const saved = localStorage.getItem("homewhirl_owner");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("homewhirl_owner");
  });

  // Active Selected Property
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard', 'rooms', 'kyc', 'billing', 'complaints'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Modals state
  const [showRegisterPGModal, setShowRegisterPGModal] = useState(false);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [showAllocateBedModal, setShowAllocateBedModal] = useState(false);
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);
  const [showGenerateBillModal, setShowGenerateBillModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddComplaintModal, setShowAddComplaintModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectedStudentKYC, setSelectedStudentKYC] = useState(null);

  // Data State
  const [properties, setProperties] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState(null);
  const [staffList, setStaffList] = useState([]);

  const [loading, setLoading] = useState(true);

  // Auth Action: Login
  const loginOwner = async (credential, password) => {
    const res = await api.loginOwner({ credential, password });
    if (res.success) {
      setCurrentOwner(res.owner);
      setIsAuthenticated(true);
      localStorage.setItem("homewhirl_owner", JSON.stringify(res.owner));
      if (res.property) {
        setSelectedPropertyId(res.property.id);
      }
      return res;
    }
    throw new Error(res.message || "Invalid credentials");
  };

  // Auth Action: Secret Registration
  const registerOwner = async (data) => {
    const res = await api.registerOwner(data);
    if (res.success) {
      setCurrentOwner(res.owner);
      setIsAuthenticated(true);
      localStorage.setItem("homewhirl_owner", JSON.stringify(res.owner));
      if (res.property) {
        setSelectedPropertyId(res.property.id);
      }
      await fetchAllData();
      return res;
    }
    throw new Error(res.message || "Registration failed");
  };

  // Auth Action: Logout
  const logoutOwner = () => {
    setCurrentOwner(null);
    setIsAuthenticated(false);
    localStorage.removeItem("homewhirl_owner");
  };

  // Fetch initial data from backend API on mount
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const propRes = await api.getProperties();
      const loadedProperties = propRes.properties || [];
      setProperties(loadedProperties);

      if (loadedProperties.length > 0) {
        const activeId = currentOwner?.propertyId || selectedPropertyId || loadedProperties[0].id;
        setSelectedPropertyId(activeId);

        const [roomRes, studentRes, invoiceRes, expenseRes, complaintRes, statsRes] = await Promise.all([
          api.getRooms(activeId),
          api.getStudents(activeId),
          api.getInvoices(activeId),
          api.getExpenses(activeId),
          api.getComplaints(activeId),
          api.getStats(activeId),
        ]);

        setRooms(roomRes.rooms || []);
        setStudents(studentRes.students || []);
        setInvoices(invoiceRes.invoices || []);
        setExpenses(expenseRes.expenses || []);
        setComplaints(complaintRes.complaints || []);
        setStats(statsRes.stats || null);
        setStaffList(statsRes.staffList || []);
      } else {
        setRooms([]);
        setStudents([]);
        setInvoices([]);
        setExpenses([]);
        setComplaints([]);
        setStats(null);
        setStaffList([]);
      }
    } catch (err) {
      console.error("Failed to load backend data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Refetch property-specific data when selectedPropertyId changes
  useEffect(() => {
    if (selectedPropertyId) {
      Promise.all([
        api.getRooms(selectedPropertyId),
        api.getStudents(selectedPropertyId),
        api.getInvoices(selectedPropertyId),
        api.getExpenses(selectedPropertyId),
        api.getComplaints(selectedPropertyId),
        api.getStats(selectedPropertyId),
      ]).then(([roomRes, studentRes, invoiceRes, expenseRes, complaintRes, statsRes]) => {
        setRooms(roomRes.rooms || []);
        setStudents(studentRes.students || []);
        setInvoices(invoiceRes.invoices || []);
        setExpenses(expenseRes.expenses || []);
        setComplaints(complaintRes.complaints || []);
        setStats(statsRes.stats || null);
        setStaffList(statsRes.staffList || []);
      }).catch((err) => console.error("Error updating active property data:", err));
    }
  }, [selectedPropertyId]);

  const refreshStats = async () => {
    if (selectedPropertyId) {
      const statsRes = await api.getStats(selectedPropertyId);
      setStats(statsRes.stats || null);
    }
  };

  const registerProperty = async (propData) => {
    try {
      const res = await api.createProperty(propData);
      if (res.success) {
        await fetchAllData();
        setSelectedPropertyId(res.property.id);
        setShowRegisterPGModal(false);
      }
    } catch (err) {
      alert(err.message || "Failed to register property");
    }
  };

  const addRoom = async (roomData) => {
    try {
      const res = await api.createRoom({
        ...roomData,
        propertyId: selectedPropertyId,
      });
      if (res.success) {
        const roomRes = await api.getRooms(selectedPropertyId);
        setRooms(roomRes.rooms || []);
        refreshStats();
        setShowAddRoomModal(false);
      }
    } catch (err) {
      alert(err.message || "Failed to add room");
    }
  };

  const deleteRoom = async (roomId) => {
    try {
      const res = await api.deleteRoom(roomId);
      if (res.success) {
        const roomRes = await api.getRooms(selectedPropertyId);
        setRooms(roomRes.rooms || []);
        refreshStats();
      }
    } catch (err) {
      alert(err.message || "Failed to delete room");
    }
  };

  const updateBedStatus = async (roomId, bedNo, status) => {
    try {
      const res = await api.updateBedStatus(roomId, bedNo, status);
      if (res.success) {
        const roomRes = await api.getRooms(selectedPropertyId);
        setRooms(roomRes.rooms || []);
        refreshStats();
      }
    } catch (err) {
      alert(err.message || "Failed to update bed status");
    }
  };

  const allocateBed = async (allocationData) => {
    try {
      const res = await api.allocateBed({
        ...allocationData,
        propertyId: selectedPropertyId,
      });
      if (res.success) {
        const [roomRes, studentRes, invoiceRes] = await Promise.all([
          api.getRooms(selectedPropertyId),
          api.getStudents(selectedPropertyId),
          api.getInvoices(selectedPropertyId),
        ]);
        setRooms(roomRes.rooms || []);
        setStudents(studentRes.students || []);
        setInvoices(invoiceRes.invoices || []);
        refreshStats();
        setShowAllocateBedModal(false);
      }
    } catch (err) {
      alert(err.message || "Failed to allocate bed");
    }
  };

  const updateTenantKYC = async (studentId, kycData) => {
    try {
      const res = await api.updateTenantKYC(studentId, kycData);
      if (res.success) {
        const studentRes = await api.getStudents(selectedPropertyId);
        setStudents(studentRes.students || []);
        if (selectedStudentKYC && selectedStudentKYC.id === studentId) {
          setSelectedStudentKYC(res.student);
        }
      }
    } catch (err) {
      alert(err.message || "Failed to update KYC");
    }
  };

  const transferBed = async (studentId, newRoomNo, newBedNo) => {
    try {
      const res = await api.transferBed({ studentId, newRoomNo, newBedNo });
      if (res.success) {
        const [roomRes, studentRes] = await Promise.all([
          api.getRooms(selectedPropertyId),
          api.getStudents(selectedPropertyId),
        ]);
        setRooms(roomRes.rooms || []);
        setStudents(studentRes.students || []);
        refreshStats();
      }
    } catch (err) {
      alert(err.message || "Failed to transfer bed");
    }
  };

  const checkoutStudent = async (studentId) => {
    try {
      const res = await api.checkoutStudent({ studentId });
      if (res.success) {
        const [roomRes, studentRes] = await Promise.all([
          api.getRooms(selectedPropertyId),
          api.getStudents(selectedPropertyId),
        ]);
        setRooms(roomRes.rooms || []);
        setStudents(studentRes.students || []);
        refreshStats();
      }
    } catch (err) {
      alert(err.message || "Failed to checkout student");
    }
  };

  const generateInvoice = async (invoiceData) => {
    try {
      const res = await api.generateInvoice({
        ...invoiceData,
        propertyId: selectedPropertyId,
      });
      if (res.success) {
        const invoiceRes = await api.getInvoices(selectedPropertyId);
        setInvoices(invoiceRes.invoices || []);
        refreshStats();
        setShowGenerateBillModal(false);
      }
    } catch (err) {
      alert(err.message || "Failed to generate bill");
    }
  };

  const recordPayment = async (invoiceId, paymentMethod) => {
    try {
      const res = await api.settleInvoice({ invoiceId, paymentMethod });
      if (res.success) {
        setSelectedReceipt(res.invoice);
        const invoiceRes = await api.getInvoices(selectedPropertyId);
        setInvoices(invoiceRes.invoices || []);
        refreshStats();
        setShowRecordPaymentModal(false);
      }
    } catch (err) {
      alert(err.message || "Failed to settle invoice");
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const res = await api.createExpense({
        ...expenseData,
        propertyId: selectedPropertyId,
      });
      if (res.success) {
        const expenseRes = await api.getExpenses(selectedPropertyId);
        setExpenses(expenseRes.expenses || []);
        refreshStats();
        setShowAddExpenseModal(false);
      }
    } catch (err) {
      alert(err.message || "Failed to add expense");
    }
  };

  const addComplaint = async (complaintData) => {
    try {
      const res = await api.createComplaint({
        ...complaintData,
        propertyId: selectedPropertyId,
      });
      if (res.success) {
        const complaintRes = await api.getComplaints(selectedPropertyId);
        setComplaints(complaintRes.complaints || []);
        refreshStats();
        setShowAddComplaintModal(false);
      }
    } catch (err) {
      alert(err.message || "Failed to add complaint");
    }
  };

  const assignComplaintStaff = async (id, assignedStaff) => {
    try {
      const res = await api.assignComplaintStaff(id, assignedStaff);
      if (res.success) {
        const complaintRes = await api.getComplaints(selectedPropertyId);
        setComplaints(complaintRes.complaints || []);
        refreshStats();
      }
    } catch (err) {
      alert(err.message || "Failed to assign staff");
    }
  };

  const updateComplaintStatus = async (id, status) => {
    try {
      const res = await api.updateComplaintStatus(id, status);
      if (res.success) {
        const complaintRes = await api.getComplaints(selectedPropertyId);
        setComplaints(complaintRes.complaints || []);
        refreshStats();
      }
    } catch (err) {
      alert(err.message || "Failed to update complaint status");
    }
  };

  const activeProperty = properties.find((p) => p.id === selectedPropertyId) || properties[0] || {
    id: null,
    name: "My PG Property",
    locality: "Locality",
    city: "City",
    totalBeds: 0,
    occupiedBeds: 0,
    ownerName: "PG Owner",
    phone: ""
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentOwner,
        isAuthenticated,
        loginOwner,
        registerOwner,
        logoutOwner,
        selectedPropertyId,
        setSelectedPropertyId,
        activeTab,
        setActiveTab,
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        properties,
        activeProperty,
        rooms,
        students,
        invoices,
        expenses,
        complaints,
        stats,
        staffList,
        loading,
        showRegisterPGModal,
        setShowRegisterPGModal,
        showAddRoomModal,
        setShowAddRoomModal,
        showAllocateBedModal,
        setShowAllocateBedModal,
        showRecordPaymentModal,
        setShowRecordPaymentModal,
        showGenerateBillModal,
        setShowGenerateBillModal,
        showAddExpenseModal,
        setShowAddExpenseModal,
        showAddComplaintModal,
        setShowAddComplaintModal,
        selectedReceipt,
        setSelectedReceipt,
        selectedStudentKYC,
        setSelectedStudentKYC,
        registerProperty,
        addRoom,
        deleteRoom,
        updateBedStatus,
        allocateBed,
        updateTenantKYC,
        transferBed,
        checkoutStudent,
        generateInvoice,
        recordPayment,
        addExpense,
        addComplaint,
        assignComplaintStaff,
        updateComplaintStatus,
        fetchAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
export default AppContext;

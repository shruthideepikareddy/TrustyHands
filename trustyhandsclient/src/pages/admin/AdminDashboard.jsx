import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { capitalize } from "../../utils/formatters";
import { compressImage } from "../../utils/imageUtils";
import "../../styles/Dashboard.css";

import DashboardTab from "./AdminTabs/DashboardTab";
import WorkerApprovalsTab from "./AdminTabs/WorkerApprovalsTab";
import ManageWorkersTab from "./AdminTabs/ManageWorkersTab";
import ManageUsersTab from "./AdminTabs/ManageUsersTab";
import BookingsTab from "./AdminTabs/BookingsTab";
import FeedbackTab from "./AdminTabs/FeedbackTab";
import ContactMessagesTab from "./AdminTabs/ContactMessagesTab";
import { API_URL } from '../../utils/api';

const AdminDashboard = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("th_adminActiveTab") || "Dashboard";
  });
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalWorkers: 0,
    totalBookings: 0,
  });
  const [workers, setWorkers] = useState([]);
  const [pendingWorkers, setPendingWorkers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [adminProfile, setAdminProfile] = useState(null);
  const [adminPhotoPreview, setAdminPhotoPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [proofModal, setProofModal] = useState(null); // { src, label }
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("th_user") || "null");
    if (!user || user.role !== "admin") {
      navigate("/login");
    } else {
      fetchAdminData(user.id || user._id);
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("th_adminActiveTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("th_adminActiveTab", activeTab);
    });
  }, [activeTab]);

  const fetchAdminProfile = async (userId) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/auth/profile/${userId}`,
      );
      setAdminProfile(res.data.user);
      setAdminPhotoPreview(res.data.user.profilePhoto || "");
    } catch (err) {
      console.warn("Admin profile sync failed", err);
    }
  };

  const fetchPendingWorkers = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/admin/workers/pending`,
      );
      setPendingWorkers(res.data.pending || []);
    } catch (err) {
      console.warn("Pending workers sync failed", err);
    }
  };

  const fetchAdminData = async (userId) => {
    try {
      setLoading(true);
      const [wRes, bRes, fRes, cRes, uRes] = await Promise.all([
        axios.get(`${API_URL}/api/admin/workers`),
        axios.get(`${API_URL}/api/admin/bookings`),
        axios.get(`${API_URL}/api/admin/feedback`),
        axios.get(`${API_URL}/api/contact`),
        axios.get(`${API_URL}/api/admin/users`),
      ]);
      setWorkers(wRes.data.workers || []);
      setBookings(bRes.data.bookings || []);
      setFeedbacks(fRes.data.feedback || []);
      setContacts(cRes.data.messages || []);
      setCustomers(uRes.data.users || []);
      setStats({
        totalUsers: (uRes.data.users || []).length,
        totalWorkers: (wRes.data.workers || []).length,
        totalBookings: (bRes.data.bookings || []).length,
      });
      await fetchPendingWorkers();
      if (userId) await fetchAdminProfile(userId);
    } catch (err) {
      addToast("Failed to fetch administrative data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (workerId, status) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/admin/workers/${workerId}/status`,
        { status },
      );
      if (
        res.status === 200 ||
        (res.data && (res.data.success || res.data.message))
      ) {
        addToast(`Worker ${status.toUpperCase()} successfully`);
        await new Promise((r) => setTimeout(r, 500)); // Small delay for UI update
        fetchAdminData(adminProfile?._id || undefined);
      } else {
        addToast("Operation failed - please try again", "error");
      }
    } catch (err) {
      console.error("Status update error:", err.response?.data || err.message);
      addToast(
        err.response?.data?.message || "Operation failed on server",
        "error",
      );
    }
  };

  // Suspend = isSuspended:true (account locked, reversible by DB)
  const suspendWorker = async (workerId) => {
    if (
      !window.confirm(
        "Suspend this worker? Their account will be locked and they cannot log in.",
      )
    )
      return;
    try {
      const res = await axios.put(
        `${API_URL}/api/admin/users/${workerId}/suspend`,
        {
          isSuspended: true,
          reason: "Suspended by Admin",
        },
      );
      if (res.data.success || res.status === 200) {
        addToast("Worker account suspended successfully");
        fetchAdminData(adminProfile?._id || undefined);
      } else {
        addToast("Suspension failed - please try again", "error");
      }
    } catch (err) {
      addToast("Suspension failed", "error");
    }
  };

  const handleAdminPhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !adminProfile) return;
    addToast("Uploading photo...", "info");
    try {
      const compressed = await compressImage(file, 150, 0.6);
      await axios.put(
        `${API_URL}/api/auth/profile/${adminProfile._id}`,
        {
          profilePhoto: compressed,
        },
      );
      setAdminPhotoPreview(compressed);
      const local = JSON.parse(localStorage.getItem("th_user") || "null");
      if (local) {
        local.photoUpdated = true;
        localStorage.setItem("th_user", JSON.stringify(local));
      }
      fetchAdminProfile(adminProfile._id);
      addToast("Admin photo updated!");
    } catch (err) {
      addToast("Photo update failed — try a smaller image", "error");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const renderHeader = () => (
    <div className="dashboard-topbar">
      <div className="profile-summary-row">
        <div className="profile-photo-box">
          {adminPhotoPreview ? (
            <img src={adminPhotoPreview} alt="admin profile" />
          ) : (
            <span>
              {adminProfile?.fullName?.charAt(0)?.toUpperCase() || "A"}
            </span>
          )}
        </div>
        <div>
          <p className="small-meta">Administrator</p>
          <h3>Welcome, {adminProfile?.fullName || "Admin"}!</h3>
          <p className="subtext">
            Review worker applications, manage users, and monitor platform
            activity.
          </p>
        </div>
      </div>
      <div className="profile-photo-upload">
        <label className="upload-button btn-hover-effect">
          Upload Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleAdminPhotoChange}
          />
        </label>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardTab stats={stats} pendingWorkers={pendingWorkers} />;
      case "Worker Approvals":
        return (
          <WorkerApprovalsTab
            pendingWorkers={pendingWorkers}
            handleStatusUpdate={handleStatusUpdate}
            setProofModal={setProofModal}
            proofModal={proofModal}
          />
        );
      case "Manage Workers":
        return (
          <ManageWorkersTab
            workers={workers}
            handleStatusUpdate={handleStatusUpdate}
            suspendWorker={suspendWorker}
          />
        );
      case "Manage Users":
        return <ManageUsersTab customers={customers} />;
      case "Bookings":
        return <BookingsTab bookings={bookings} />;
      case "Feedback":
        return <FeedbackTab feedbacks={feedbacks} />;
      case "Contact Messages":
        return <ContactMessagesTab contacts={contacts} />;
      default:
        return <div>Initializing...</div>;
    }
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">ADMIN HUB</div>
        <ul className="sidebar-menu">
          {[
            { id: "Dashboard", icon: "shield-alt" },
            { id: "Manage Workers", icon: "user-lock" },
            { id: "Worker Approvals", icon: "user-check" },
            { id: "Manage Users", icon: "users" },
            { id: "Bookings", icon: "project-diagram" },
            { id: "Feedback", icon: "award" },
            { id: "Contact Messages", icon: "inbox" },
          ].map((tab) => (
            <li
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`sidebar-item ${activeTab === tab.id ? "active" : ""}`}
            >
              <i className={`fas fa-${tab.icon}`}></i> {tab.id}
            </li>
          ))}
          <div className="logout-btn-container">
            <div className="logout-btn-box">
              <button onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </div>
        </ul>
      </aside>
      <main className="dashboard-content">
        {renderHeader()}
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;

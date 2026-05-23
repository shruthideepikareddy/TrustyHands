import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { capitalize } from "../../utils/formatters";
import { compressImage } from "../../utils/imageUtils";
import "../../styles/Dashboard.css";

import HomeTab from "./WorkerTabs/HomeTab";
import JobRequestsTab from "./WorkerTabs/JobRequestsTab";
import MyJobsTab from "./WorkerTabs/MyJobsTab";
import ReviewsTab from "./WorkerTabs/ReviewsTab";
import ProfileTab from "./WorkerTabs/ProfileTab";
import { API_URL } from '../../utils/api';

const WorkerDashboard = () => {
  const { addToast } = useToast();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Home");
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [acceptingId, setAcceptingId] = useState(null);
  const [proposal, setProposal] = useState({ price: "", note: "" });

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    profilePhoto: "",
    address: { line: "", city: "", state: "", pincode: "" },
    workerDetails: {
      skill: "",
      experience: "",
      serviceArea: "",
      profilePhoto: "",
    },
  });
  const [profilePhotoPreview, setProfilePhotoPreview] = useState("");
  const [profilePhotoData, setProfilePhotoData] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("th_user") || "null");
    if (!userData || userData.role !== "worker") {
      navigate("/login");
    } else {
      const lastTab = localStorage.getItem("th_workerActiveTab") || "Home";
      setActiveTab(lastTab);
      fetchFullProfile(userData.id || userData._id);
      fetchBookings(userData.id || userData._id);
      fetchReviews(userData.id || userData._id);
    }
  }, [navigate]);

  useEffect(() => {
    if (activeTab !== "Home") {
      localStorage.setItem("th_workerActiveTab", activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("th_workerActiveTab", activeTab);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [activeTab]);

  const fetchFullProfile = async (userId) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/auth/profile/${userId}`,
      );
      setUser(res.data.user);
      setProfileData({
        fullName: res.data.user.fullName,
        email: res.data.user.email,
        phone: res.data.user.phone,
        dob: res.data.user.dob ? res.data.user.dob.split("T")[0] : "",
        gender: res.data.user.gender || "",
        profilePhoto:
          res.data.user.profilePhoto ||
          res.data.user.workerDetails?.profilePhoto ||
          "",
        address: res.data.user.address || {
          line: "",
          city: "",
          state: "",
          pincode: "",
        },
        workerDetails: {
          skill: res.data.user.workerDetails?.skill || "",
          experience: res.data.user.workerDetails?.experience || "",
          serviceArea: res.data.user.workerDetails?.serviceArea || "",
          profilePhoto:
            res.data.user.workerDetails?.profilePhoto ||
            res.data.user.profilePhoto ||
            "",
        },
      });
      setProfilePhotoPreview(
        res.data.user.profilePhoto ||
          res.data.user.workerDetails?.profilePhoto ||
          "",
      );
    } catch (err) {
      addToast("Profile sync failed", "error");
    }
  };

  const fetchBookings = async (userId) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_URL}/api/bookings/worker/${userId}`,
      );
      setBookings(res.data.bookings || []);
    } catch (err) {
      addToast("Bookings update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (userId) => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/feedback`);
      const filtered = (res.data.feedback || []).filter(
        (f) => f.workerId?._id === userId,
      );
      setMyReviews(filtered);
    } catch (err) {
      addToast("Reviews sync failed", "error");
    }
  };

  const handleAccept = async (bookingId) => {
    try {
      await axios.put(
        `${API_URL}/api/bookings/${bookingId}/status`,
        {
          status: "accepted",
        },
      );
      addToast("The request has been accepted!");
      setAcceptingId(null);
      fetchBookings(user._id);
    } catch (err) {
      addToast("Failed to accept", "error");
    }
  };

  const updateStatus = async (bookingId, newStatus) => {
    try {
      await axios.put(
        `${API_URL}/api/bookings/${bookingId}/status`,
        { status: newStatus },
      );
      addToast(`Booking marked ${newStatus}`);
      fetchBookings(user._id);
    } catch (err) {
      addToast("Status update error", "error");
    }
  };

  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    addToast("Uploading photo...", "info");
    try {
      const compressed = await compressImage(file, 150, 0.6);
      setProfilePhotoData(compressed);
      setProfilePhotoPreview(compressed);
      const res = await axios.put(
        `${API_URL}/api/auth/profile/${user._id}`,
        {
          profilePhoto: compressed,
          workerDetails: {
            ...profileData.workerDetails,
            profilePhoto: compressed,
          },
        },
      );
      setUser(res.data.user);
      const local = JSON.parse(localStorage.getItem("th_user") || "{}");
      if (local) {
        local.photoUpdated = true;
        localStorage.setItem("th_user", JSON.stringify(local));
      }
      addToast("Profile photo updated!");
    } catch (err) {
      addToast("Photo update failed — try a smaller image", "error");
    }
  };

  const isBookingCompletable = (bookingDate) => {
    const today = new Date().toISOString().split("T")[0];
    return bookingDate === today;
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      const payload = {
        ...profileData,
        profilePhoto: profilePhotoData || profileData.profilePhoto,
        workerDetails: {
          ...profileData.workerDetails,
          profilePhoto:
            profilePhotoData || profileData.workerDetails.profilePhoto,
        },
      };
      const res = await axios.put(
        `${API_URL}/api/auth/profile/${user._id}`,
        payload,
      );
      setUser(res.data.user);
      const local = JSON.parse(localStorage.getItem("th_user") || "{}");
      if (local) {
        local.fullName = res.data.user.fullName;
        local.photoUpdated = true;
        localStorage.setItem("th_user", JSON.stringify(local));
      }
      setIsEditing(false);
      addToast("Profile updated successfully!");
    } catch (err) {
      addToast("Update failed", "error");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user)
    return (
      <div className="dashboard-wrapper">Wait... Portal Initializing...</div>
    );

  const renderHeader = () => (
    <div className="dashboard-topbar">
      <div className="profile-summary-row">
        <div className="profile-photo-box">
          {profilePhotoPreview ? (
            <img src={profilePhotoPreview} alt="profile" />
          ) : (
            <span>{user.fullName?.charAt(0)?.toUpperCase() || "W"}</span>
          )}
        </div>
        <div>
          <p className="small-meta">Welcome back</p>
          <h3>Welcome, {user.fullName}!</h3>
          <p className="subtext">
            Manage your jobs, requests, and professional profile.
          </p>
        </div>
      </div>
      <div className="profile-photo-upload">
        <label className="upload-button">
          Upload Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePhotoChange}
          />
        </label>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeTab bookings={bookings} setActiveTab={setActiveTab} />;
      case "Job Requests":
        return (
          <JobRequestsTab
            bookings={bookings}
            acceptingId={acceptingId}
            setAcceptingId={setAcceptingId}
            handleAccept={handleAccept}
            updateStatus={updateStatus}
          />
        );
      case "My Jobs":
        return (
          <MyJobsTab
            bookings={bookings}
            updateStatus={updateStatus}
            isBookingCompletable={isBookingCompletable}
          />
        );
      case "Reviews":
        return <ReviewsTab myReviews={myReviews} />;
      case "Profile":
        return (
          <ProfileTab
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            profileData={profileData}
            setProfileData={setProfileData}
            handleProfileUpdate={handleProfileUpdate}
            saveLoading={saveLoading}
          />
        );
      default:
        return <div>Initializing...</div>;
    }
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">WORKER HUB</div>
        <ul className="sidebar-menu">
          {[
            { id: "Home", icon: "home" },
            { id: "Job Requests", icon: "inbox" },
            { id: "My Jobs", icon: "clipboard-list" },
            { id: "Reviews", icon: "star" },
            { id: "Profile", icon: "user-cog" },
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

export default WorkerDashboard;

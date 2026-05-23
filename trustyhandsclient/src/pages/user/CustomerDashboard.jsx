import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookingModal from "../../components/BookingModal";
import FeedbackModal from "../../components/FeedbackModal";
import { useToast } from "../../context/ToastContext";
import { compressImage } from "../../utils/imageUtils";
import "../../styles/Dashboard.css";

import HomeTab from "./CustomerTabs/HomeTab";
import SearchServicesTab from "./CustomerTabs/SearchServicesTab";
import MyBookingsTab from "./CustomerTabs/MyBookingsTab";
import MyReviewsTab from "./CustomerTabs/MyReviewsTab";
import ProfileTab from "./CustomerTabs/ProfileTab";
import { API_URL } from '../../utils/api';

const CustomerDashboard = () => {
  const { addToast } = useToast();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Home");
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [activeFeedback, setActiveFeedback] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    profilePhoto: "",
    dob: "",
    gender: "",
    address: { line: "", city: "", state: "", pincode: "" },
  });
  const [profilePhotoPreview, setProfilePhotoPreview] = useState("");
  const [profilePhotoData, setProfilePhotoData] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("th_user") || "null");
    if (!userData || userData.role !== "customer") {
      navigate("/login");
    } else {
      const lastTab = localStorage.getItem("th_activeTab") || "Home";
      setActiveTab(lastTab);
      fetchFullProfile(userData.id || userData._id);
      fetchBookings(userData.id || userData._id);
      fetchReviews(userData.id || userData._id);
      fetchWorkers();
    }
  }, [navigate]);

  useEffect(() => {
    if (activeTab !== "Home") {
      localStorage.setItem("th_activeTab", activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("th_activeTab", activeTab);
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
        profilePhoto: res.data.user.profilePhoto || "",
        dob: res.data.user.dob || "",
        gender: res.data.user.gender || "",
        address: res.data.user.address || {
          line: "",
          city: "",
          state: "",
          pincode: "",
        },
      });
      setProfilePhotoPreview(res.data.user.profilePhoto || "");
    } catch (err) {
      addToast("Profile sync failed", "error");
    }
  };

  const fetchBookings = async (userId) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_URL}/api/bookings/customer/${userId}`,
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
        (f) => f.customerId?._id === userId,
      );
      setMyReviews(filtered);
    } catch (err) {
      addToast("Reviews sync failed", "error");
    }
  };

  const fetchWorkers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/workers`);
      const approved = (res.data.workers || []).filter(
        (w) => w.workerDetails?.status === "approved" && !w.isSuspended,
      );
      setWorkers(approved);
    } catch (err) {
      addToast("Workers list update failed", "error");
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
        { profilePhoto: compressed },
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

  const handleCompleteBooking = async (bookingId) => {
    try {
      await axios.put(
        `${API_URL}/api/bookings/${bookingId}/status`,
        { status: "completed" },
      );
      addToast("Booking marked as completed");
      fetchBookings(user._id);
    } catch (err) {
      addToast("Unable to complete booking", "error");
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      const payload = {
        ...profileData,
        profilePhoto: profilePhotoData || profileData.profilePhoto,
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
    return <div className="dashboard-wrapper">Wait... Hub Loading...</div>;

  const renderHeader = () => (
    <div className="dashboard-topbar">
      <div className="profile-summary-row">
        <div className="profile-photo-box">
          {profilePhotoPreview ? (
            <img src={profilePhotoPreview} alt="profile" />
          ) : (
            <span>{user.fullName?.charAt(0)?.toUpperCase() || "U"}</span>
          )}
        </div>
        <div>
          <p className="small-meta">Welcome back</p>
          <h3>Welcome, {user.fullName}!</h3>
          <p className="subtext">
            Your dashboard gives quick access to bookings, service search and
            profile controls.
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

  const filteredWorkers = workers
    .filter((w) => w.workerDetails?.status === "approved")
    .filter((w) => {
      const categoryMatch = searchCategory
        ? (w.workerDetails?.skill || "")
            .toLowerCase()
            .includes(searchCategory.toLowerCase())
        : true;
      const locationMatch = searchLocation
        ? (w.address?.city || "")
            .toLowerCase()
            .includes(searchLocation.toLowerCase()) ||
          (w.address?.state || "")
            .toLowerCase()
            .includes(searchLocation.toLowerCase())
        : true;
      return categoryMatch && locationMatch;
    })
    .sort((a, b) => {
      if (!searchLocation) return 0;
      const aMatch =
        (a.address?.city || "")
          .toLowerCase()
          .includes(searchLocation.toLowerCase()) ||
        (a.address?.state || "")
          .toLowerCase()
          .includes(searchLocation.toLowerCase());
      const bMatch =
        (b.address?.city || "")
          .toLowerCase()
          .includes(searchLocation.toLowerCase()) ||
        (b.address?.state || "")
          .toLowerCase()
          .includes(searchLocation.toLowerCase());
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeTab bookings={bookings} setActiveTab={setActiveTab} />;
      case "Search Services":
        return (
          <SearchServicesTab
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            searchLocation={searchLocation}
            setSearchLocation={setSearchLocation}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredWorkers={filteredWorkers}
            setSelectedWorker={setSelectedWorker}
          />
        );
      case "My Bookings":
        return (
          <MyBookingsTab
            bookings={bookings}
            loading={loading}
            handleCompleteBooking={handleCompleteBooking}
            isBookingCompletable={isBookingCompletable}
          />
        );
      case "My Reviews":
        return <MyReviewsTab myReviews={myReviews} />;
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
        <div className="sidebar-logo">USER HUB</div>
        <ul className="sidebar-menu">
          {[
            { id: "Home", icon: "home" },
            { id: "Search Services", icon: "search" },
            { id: "My Bookings", icon: "calendar-check" },
            { id: "My Reviews", icon: "star" },
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
          {/* Logout button placed directly after Profile */}
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

      {selectedWorker && (
        <BookingModal
          worker={selectedWorker}
          onClose={() => setSelectedWorker(null)}
          onBookingComplete={() => {
            setSelectedWorker(null);
            fetchBookings(user._id);
            setActiveTab("My Bookings");
            addToast("Request sent successfully!");
          }}
        />
      )}

      {activeFeedback && (
        <FeedbackModal
          booking={activeFeedback}
          onClose={() => setActiveFeedback(null)}
          onComplete={() => {
            setActiveFeedback(null);
            fetchBookings(user._id);
          }}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;

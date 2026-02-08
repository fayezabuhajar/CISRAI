import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Sidebar } from "./components/Sidebar";
import { useAuth } from "./contexts/AuthContext";
import LandingPage from "./components/pages/LandingPage";
import ConferenceInfo from "./components/pages/ConferenceInfo";
import ImportantDates from "./components/pages/ImportantDates";
import CallForPapers from "./components/pages/CallForPapers";
import Committees from "./components/pages/Committees";
import Registration from "./components/pages/Registration";
import Venue from "./components/pages/Venue";
import Schedule from "./components/pages/Schedule";
import RegistrationRules from "./components/pages/RegistrationRules";
import BecomeReviewer from "./components/pages/BecomeReviewer";
import KeynoteSpeakers from "./components/pages/KeynoteSpeakers";
import ContactUs from "./components/pages/ContactUs";
import AdminDashboard from "./components/pages/AdminDashboard";
import AdminLogin from "./components/pages/AdminLogin";

// Protected Route Component
const ProtectedRoute = ({
  children,
  language,
}: {
  children: React.ReactNode;
  language: "en" | "ar";
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-emerald-700">
            {language === "ar" ? "جاري التحقق..." : "Verifying..."}
          </p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

export default function App() {
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const { logout } = useAuth();

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always redirect to admin login page
      window.location.href = "/admin/login";
    }
  };

  const isRtl = language === "ar";

  return (
    <Router>
      <div
        className={`min-h-screen bg-background flex ${isRtl ? "rtl" : "ltr"}`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Sidebar */}
        <Sidebar language={language} />

        {/* Main Content Area - uses CSS variable for layout shift */}
        <div
          className="flex-grow flex flex-col min-h-screen transition-all duration-300"
          style={{
            marginLeft: isRtl ? "0" : "var(--sidebar-width, 280px)",
            marginRight: isRtl ? "var(--sidebar-width, 280px)" : "0",
          }}
        >
          {/* Only show Header and Footer for non-admin routes */}
          <Routes>
            <Route path="/admin/*" element={null} />
            <Route
              path="*"
              element={
                <Header language={language} onToggleLanguage={toggleLanguage} />
              }
            />
          </Routes>

          <main className="flex-grow relative">
            {/* Subtle Hexagonal Islamic Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04] overflow-hidden z-0">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="hexagonal-pattern"
                    x="0"
                    y="0"
                    width="120"
                    height="104"
                    patternUnits="userSpaceOnUse"
                  >
                    {/* Hexagon outline in gold/beige */}
                    <path
                      d="M60 0 L90 26 L90 78 L60 104 L30 78 L30 26 Z"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="0.8"
                      opacity="0.5"
                    />

                    {/* Inner decorative dome shape */}
                    <path
                      d="M60 30 Q60 25, 65 25 L65 40 Q65 48, 60 52 Q55 48, 55 40 L55 25 Q60 25, 60 30"
                      fill="none"
                      stroke="#E6D8AD"
                      strokeWidth="0.6"
                      opacity="0.4"
                    />

                    {/* Small arch detail inside hexagon */}
                    <path
                      d="M50 60 L50 70 Q50 75, 55 75 L65 75 Q70 75, 70 70 L70 60"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="0.5"
                      opacity="0.3"
                    />

                    {/* Decorative star/geometric center */}
                    <circle
                      cx="60"
                      cy="52"
                      r="3"
                      fill="#D4AF37"
                      opacity="0.2"
                    />

                    {/* Small corner details */}
                    <path
                      d="M45 35 L47 38 L50 40 L47 42 L45 45 L43 42 L40 40 L43 38 Z"
                      fill="#E6D8AD"
                      opacity="0.25"
                    />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill="url(#hexagonal-pattern)"
                />
              </svg>
            </div>

            <div className="relative z-10">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage language={language} />} />
                <Route
                  path="/info"
                  element={<ConferenceInfo language={language} />}
                />
                <Route
                  path="/dates"
                  element={<ImportantDates language={language} />}
                />
                <Route
                  path="/call-for-papers"
                  element={<CallForPapers language={language} />}
                />
                <Route
                  path="/committees"
                  element={<Committees language={language} />}
                />
                <Route
                  path="/registration"
                  element={<Registration language={language} />}
                />
                <Route path="/venue" element={<Venue language={language} />} />
                <Route
                  path="/schedule"
                  element={<Schedule language={language} />}
                />
                <Route
                  path="/rules"
                  element={<RegistrationRules language={language} />}
                />
                <Route
                  path="/reviewer"
                  element={<BecomeReviewer language={language} />}
                />
                <Route
                  path="/speakers"
                  element={<KeynoteSpeakers language={language} />}
                />
                <Route
                  path="/contact"
                  element={<ContactUs language={language} />}
                />

                {/* Admin Routes */}
                <Route
                  path="/admin/login"
                  element={<AdminLogin language={language} />}
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute language={language}>
                      <AdminDashboard
                        language={language}
                        onLogout={handleLogout}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </main>

          {/* Footer - hide on admin routes */}
          <Routes>
            <Route path="/admin/*" element={null} />
            <Route path="*" element={<Footer language={language} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

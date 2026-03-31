import React from "react";
import { Route, Routes } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import CandidateDashboardLayout from "./layouts/CandidateDashboardLayout";

// Public Pages
import Home from "./pages/Home/Home";
import FindJob from "./pages/FindJob/FindJob";
import JobDetails from "./pages/Job/JobDetails";
import JobApply from "./pages/Job/JobApply";

// Candidate Dashboard Pages
import Profile from "./pages/Dashboard/Candidate/Profile/Profile";
import SavedJobs from "./pages/Dashboard/Candidate/SavedJobs/SavedJobs";
import RecommendedJobs from "./pages/Dashboard/Candidate/RecommendedJobs/RecommendedJobs";
import Signup from "./pages/Authentication/Signup";
import Login from "./pages/Authentication/Login";
import EditProfile from "./pages/Dashboard/Candidate/Profile/EditProfile";
import EmployerDashboardLayout from "./layouts/EmployerDashboardLayout";
import ManageJobs from "./pages/Dashboard/Employer/ManageJobs/ManageJobs";
import CompanyProfile from "./pages/Dashboard/Employer/Profile/CompanyProfile";
import EditCompanyProfile from "./pages/Dashboard/Employer/Profile/EditCompanyProfile";
import AppliedJobs from "./pages/Dashboard/Candidate/JobApply/AppliedJobs";
import PostJob from "./pages/Dashboard/Employer/PostJobs/PostJob";
import Applicants from "./pages/Dashboard/Employer/Applicants/Applicants";
import ProtectedRoute from "./components/ProtectedRoutes";

const App = () =>
{
  return (
    <Routes>
      {/* Public Routes */ }
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
      <Route
        path="/jobs"
        element={
          <PublicLayout>
            <FindJob />
          </PublicLayout>
        }
      />
      <Route
        path="/job-details/:id"
        element={
          <PublicLayout>
            <JobDetails />
          </PublicLayout>
        }
      />
      <Route
        path="/job-apply/:id"
        element={
          <ProtectedRoute role="CANDIDATE">
            <PublicLayout>
              <JobApply />
            </PublicLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/*"
        element={
          <ProtectedRoute role="CANDIDATE">
            <CandidateDashboardLayout>
              <Routes>
                <Route path="" element={ <Profile /> } />
                <Route path="applied-jobs" element={ <AppliedJobs /> } />
                <Route path="saved-jobs" element={ <SavedJobs /> } />
                <Route path="recommended-jobs" element={ <RecommendedJobs /> } />
                <Route path="edit" element={ <EditProfile /> } />
              </Routes>
            </CandidateDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employer/*"
        element={
          <ProtectedRoute role="EMPLOYER">
            <EmployerDashboardLayout>
              <Routes>
                <Route path="post-job" element={ <PostJob /> } />
                <Route path="manage-jobs" element={ <ManageJobs /> } />
                <Route path="view-applicants" element={ <Applicants /> } />
                <Route path="company-profile" element={ <CompanyProfile /> } />
                <Route
                  path="edit-company-profile"
                  element={ <EditCompanyProfile /> }
                />
              </Routes>
            </EmployerDashboardLayout>
          </ProtectedRoute>
        }
      />
      {/* Authentication */ }
      <Route path="/signup" element={ <Signup /> } />
      <Route path="/login" element={ <Login /> } />
    </Routes>
  );
};

export default App;

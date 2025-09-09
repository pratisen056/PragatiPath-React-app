import React, { useState } from 'react';
import './index.css'; // Make sure Tailwind CSS is imported

// Import your components
import LandingPage from './components/Landing/LandingPage';
import OnboardingQuest from './components/onboarding/OnboardingQuest';
import Dashboard from './components/dashboard/Dashboard';
import SmartRecommendationEngine from './components/recommendations/SmartRecommendationEngine';
import MentorshipPlatform from './components/mentorship/MentorshipPlatform';
import ApplicationManager from './components/ApplicationManager'; // Added ApplicationManager import

function App() {
  // State to track current page - added 'applications' option
  const [currentPage, setCurrentPage] = useState('landing');
  
  // State to store user profile data
  const [userProfile, setUserProfile] = useState(null);
  
  // State to store selected internship (for application flow)
  const [selectedInternship, setSelectedInternship] = useState(null);
  
  // State to store selected mentor (for mentorship flow)
  const [selectedMentor, setSelectedMentor] = useState(null);

  // Navigation Functions
  
  // Navigate from Landing to Onboarding
  const navigateToOnboarding = () => {
    setCurrentPage('onboarding');
    console.log('Navigating to onboarding...');
  };

  // Navigate from Onboarding to Dashboard (with profile data)
  const navigateToDashboard = (profileData) => {
    setUserProfile(profileData);
    setCurrentPage('dashboard');
    console.log('Navigating to dashboard with profile:', profileData);
  };

  // Navigate to Landing page (reset everything)
  const navigateToLanding = () => {
    setCurrentPage('landing');
    setUserProfile(null);
    setSelectedInternship(null);
    setSelectedMentor(null);
    console.log('Navigating to landing page...');
  };

  // Navigate to Recommendations from Dashboard
  const navigateToRecommendations = () => {
    setCurrentPage('recommendations');
    console.log('Navigating to recommendations...');
  };

  // Navigate to Mentorship from Dashboard
  const navigateToMentorship = () => {
    setCurrentPage('mentorship');
    console.log('Navigating to mentorship...');
  };

  // Navigate to Applications from Dashboard
  const navigateToApplications = () => {
    setCurrentPage('applications');
    console.log('Navigating to applications...');
  };

  // Handle internship selection from recommendations
  const handleInternshipSelect = (internship) => {
    setSelectedInternship(internship);
    console.log('Selected internship:', internship);
    
    // Navigate directly to applications after selecting an internship
    setCurrentPage('applications');
  };

  // Handle mentor selection from mentorship platform
  const handleMentorSelect = (mentor) => {
    setSelectedMentor(mentor);
    console.log('Selected mentor:', mentor);
    
    // You can navigate to mentor chat or booking page here
    alert(`Connected with: ${mentor.name} - ${mentor.role}`);
    
    // Future: Navigate to mentor chat or booking
    // setCurrentPage('mentor-chat');
  };

  // Generic navigation function (for Dashboard and other components)
  const handleNavigation = (page, data = null) => {
    console.log(`Navigation requested: ${page}`, data);
    
    switch (page) {
      case 'landing':
        navigateToLanding();
        break;
      case 'onboarding':
        navigateToOnboarding();
        break;
      case 'dashboard':
        if (data) {
          navigateToDashboard(data);
        } else {
          setCurrentPage('dashboard');
        }
        break;
      case 'recommendations':
        navigateToRecommendations();
        break;
      case 'mentorship':
        navigateToMentorship();
        break;
      case 'applications':
        navigateToApplications();
        break;
      case 'profile':
        // Handle profile editing
        setCurrentPage('profile');
        break;
      case 'settings':
        // Handle settings page
        setCurrentPage('settings');
        break;
      default:
        console.warn(`Unknown navigation target: ${page}`);
        // Fallback to dashboard if logged in, otherwise landing
        if (userProfile) {
          setCurrentPage('dashboard');
        } else {
          setCurrentPage('landing');
        }
    }
  };

  // Render the appropriate page based on currentPage state
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage 
            onGetStarted={navigateToOnboarding} // Pass the navigation function
          />
        );

      case 'onboarding':
        return (
          <OnboardingQuest 
            onComplete={navigateToDashboard}  // Navigate to dashboard with profile
            onBack={navigateToLanding}        // Go back to landing
          />
        );

      case 'dashboard':
        return (
          <Dashboard 
            userProfile={userProfile}           // Pass user profile data
            onNavigate={handleNavigation}       // Pass navigation function
            onFindInternships={navigateToRecommendations} // Direct route to recommendations
            onFindMentors={navigateToMentorship} // Direct route to mentorship
            onViewApplications={navigateToApplications} // Direct route to applications
          />
        );

      case 'recommendations':
        return (
          <SmartRecommendationEngine 
            userProfile={userProfile}          // Pass user profile for personalization
            onInternshipSelect={handleInternshipSelect} // Handle internship selection
            onBack={() => setCurrentPage('dashboard')}  // Go back to dashboard
            onNavigate={handleNavigation}       // Pass navigation function
          />
        );

      case 'mentorship':
        return (
          <MentorshipPlatform 
            userProfile={userProfile}          // Pass user profile for personalization
            onMentorSelect={handleMentorSelect} // Handle mentor selection/connection
            onBack={() => setCurrentPage('dashboard')}  // Go back to dashboard
            onNavigate={handleNavigation}       // Pass navigation function
          />
        );

      case 'applications':
        return (
          <ApplicationManager 
            userProfile={userProfile}          // Pass user profile for personalization
            selectedInternship={selectedInternship} // Pass any pre-selected internship
            onBack={() => setCurrentPage('dashboard')}  // Go back to dashboard
            onNavigate={handleNavigation}       // Pass navigation function
            onApplyToNew={() => setCurrentPage('recommendations')} // Navigate to find more internships
          />
        );

      case 'profile':
        // Future: Profile editing component
        return (
          <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
              <p className="text-gray-400 mb-6">Profile editing coming soon...</p>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );

      case 'settings':
        // Future: Settings component
        return (
          <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">App Settings</h2>
              <p className="text-gray-400 mb-6">Settings page coming soon...</p>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );

      default:
        // Fallback to landing page
        console.warn(`Unknown page: ${currentPage}, falling back to landing`);
        return (
          <LandingPage 
            onGetStarted={navigateToOnboarding}
          />
        );
    }
  };

  // Debug info (remove in production)
  const debugInfo = process.env.NODE_ENV === 'development' ? (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg text-xs z-50 max-w-xs">
      <div className="font-bold mb-2">Debug Info:</div>
      <div>Page: <span className="text-green-400">{currentPage}</span></div>
      <div>User: <span className="text-blue-400">{userProfile ? userProfile.name || 'Set' : 'None'}</span></div>
      <div>Internship: <span className="text-purple-400">{selectedInternship ? 'Selected' : 'None'}</span></div>
      <div>Mentor: <span className="text-yellow-400">{selectedMentor ? 'Selected' : 'None'}</span></div>
      <div className="mt-2 pt-2 border-t border-gray-600">
        <button
          onClick={() => console.log('App State:', { 
            currentPage, 
            userProfile, 
            selectedInternship, 
            selectedMentor 
          })}
          className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
        >
          Log State
        </button>
      </div>
    </div>
  ) : null;

  return (
    <div className="App min-h-screen bg-gray-900">
      {/* Error Boundary - Simple fallback */}
      <div className="min-h-screen">
        {renderCurrentPage()}
      </div>
      
      {/* Debug Info */}
      {debugInfo}
    </div>
  );
}

export default App;
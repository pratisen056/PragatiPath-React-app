import React, { useState, useEffect } from 'react'; // Added missing imports
import { 
  Home, 
  Search, 
  User, 
  Bell, 
  Filter,
  MapPin, 
  Clock, 
  Users, 
  Star, 
  BookOpen,
  TrendingUp,
  Award,
  Target,
  MessageCircle,
  Calendar,
  ChevronRight,
  Play,
  CheckCircle,
  Heart,
  Bookmark,
  Share2,
  Eye,
  Zap,
  Flame,
  Gift,
  FileText 
} from 'lucide-react';

const Dashboard = ({ userProfile, onNavigate }) => {
  // REACT STATE - Multiple pieces of state for different dashboard sections
  const [activeTab, setActiveTab] = useState('home'); // Track which tab is active
  const [selectedFilter, setSelectedFilter] = useState('recommended'); // Filter internships
  const [bookmarkedInternships, setBookmarkedInternships] = useState([]); // Save favorites
  const [notifications, setNotifications] = useState(3); // Unread notifications
  const [userStats, setUserStats] = useState({
    xp: 150,
    level: 2,
    streak: 5,
    completedQuests: 3
  });

  // MOCK DATA - In a real app, this would come from an API
  const mockInternships = [
    {
      id: 1,
      title: 'Digital India Assistant',
      organization: 'Ministry of Electronics & IT',
      location: userProfile?.location || 'Delhi',
      duration: '3 months',
      stipend: '₹10,000/month',
      skills: ['Digital Literacy', 'Communication', 'Computer Basics'],
      matchPercentage: 95,
      type: 'Government',
      deadline: '15 days left',
      applicants: 234,
      isNew: true,
      description: 'Support digital literacy programs in rural areas'
    },
    {
      id: 2,
      title: 'Rural Development Trainee',
      organization: 'Ministry of Rural Development',
      location: userProfile?.location || 'Mumbai',
      duration: '6 months',
      stipend: '₹12,000/month',
      skills: ['Leadership', 'Communication', 'Social Work'],
      matchPercentage: 88,
      type: 'Government',
      deadline: '8 days left',
      applicants: 156,
      isNew: false,
      description: 'Work on village development projects and community engagement'
    },
    {
      id: 3,
      title: 'Healthcare Data Analyst',
      organization: 'Ministry of Health',
      location: userProfile?.location || 'Bangalore',
      duration: '4 months',
      stipend: '₹15,000/month',
      skills: ['Data Analysis', 'Computer Skills', 'Healthcare'],
      matchPercentage: 82,
      type: 'Government',
      deadline: '12 days left',
      applicants: 89,
      isNew: true,
      description: 'Analyze healthcare data to improve public health outcomes'
    }
  ];

  const mockMentors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      role: 'Senior Policy Advisor',
      organization: 'NITI Aayog',
      expertise: ['Government Policy', 'Rural Development'],
      rating: 4.9,
      sessions: 127,
      image: '👩‍💼',
      isAvailable: true
    },
    {
      id: 2,
      name: 'Rahul Gupta',
      role: 'Tech Lead',
      organization: 'Digital India',
      expertise: ['Technology', 'Digital Transformation'],
      rating: 4.8,
      sessions: 95,
      image: '👨‍💻',
      isAvailable: false
    }
  ];

  // REACT EFFECT - Runs when component mounts (similar to page load)
  useEffect(() => {
    // Simulate loading user progress and recommendations
    console.log('Dashboard loaded for user:', userProfile?.name);
    
    // In a real app, you'd fetch data here:
    // fetchUserRecommendations(userProfile.id);
    // fetchUserProgress(userProfile.id);
  }, [userProfile]); // Re-run if userProfile changes

  // EVENT HANDLERS - Functions that respond to user actions
  const toggleBookmark = (internshipId) => {
    setBookmarkedInternships(prev => 
      prev.includes(internshipId)
        ? prev.filter(id => id !== internshipId)
        : [...prev, internshipId]
    );
  };

  const handleApply = (internship) => {
    console.log('Applying to:', internship.title);
    // Navigate to applications page when applying
    onNavigate('applications');
  };

  const handleMentorConnect = (mentor) => {
    console.log('Connecting to mentor:', mentor.name);
    alert(`💬 Connecting you with ${mentor.name}!\n\nYou'll receive a chat invitation shortly.`);
  };

  // UTILITY FUNCTIONS
  const getSkillColor = (skill) => {
    const colors = {
      'Digital Literacy': 'bg-blue-500',
      'Communication': 'bg-green-500',
      'Computer Basics': 'bg-purple-500',
      'Leadership': 'bg-yellow-500',
      'Social Work': 'bg-pink-500',
      'Data Analysis': 'bg-cyan-500',
      'Healthcare': 'bg-red-500'
    };
    return colors[skill] || 'bg-gray-500';
  };

  const getLevelProgress = () => {
    const currentLevelXP = userStats.xp % 100;
    return (currentLevelXP / 100) * 100;
  };

  // TAB CONTENT RENDERERS - Each tab shows different content
  const renderHomeTab = () => (
    <div className="space-y-6">
      {/* Welcome Header with User Stats */}
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Welcome back, {userProfile?.name}! 👋</h2>
            <p className="text-gray-300">Ready to continue your journey?</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-yellow-400">
              <Zap className="w-5 h-5" />
              <span className="font-bold">{userStats.xp} XP</span>
            </div>
            <div className="text-sm text-gray-400">Level {userStats.level}</div>
          </div>
        </div>
        
        {/* XP Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Level Progress</span>
            <span>{Math.floor(getLevelProgress())}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${getLevelProgress()}%` }}
            ></div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">{userStats.streak}</div>
            <div className="text-xs text-gray-400">Day Streak 🔥</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-400">{userStats.completedQuests}</div>
            <div className="text-xs text-gray-400">Quests Done ✅</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-400">{bookmarkedInternships.length}</div>
            <div className="text-xs text-gray-400">Bookmarked 📚</div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => onNavigate('recommendations')}
          className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-xl p-4 hover:from-green-500/30 hover:to-blue-500/30 transition-all duration-200"
        >
          <Search className="w-6 h-6 text-green-400 mb-2" />
          <p className="font-medium text-white text-sm">Find Internships</p>
          <p className="text-gray-400 text-xs">Discover opportunities</p>
        </button>

        <button
          onClick={() => onNavigate('applications')}
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-200"
        >
          <FileText className="w-6 h-6 text-purple-400 mb-2" />
          <p className="font-medium text-white text-sm">My Applications</p>
          <p className="text-gray-400 text-xs">Track your progress</p>
        </button>
      </div>

      {/* Continue Your Journey Section */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Target className="w-5 h-5 text-green-400 mr-2" />
          Continue Your Journey
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Play className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-white">Complete Profile Setup</p>
                <p className="text-sm text-gray-400">Add portfolio and preferences</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-green-400" />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-white">Skill Assessment Quiz</p>
                <p className="text-sm text-gray-400">Test your current abilities</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Top Recommendations Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            Top Matches for You
          </h3>
          <button 
            onClick={() => setActiveTab('internships')}
            className="text-green-400 hover:text-green-300 text-sm font-medium"
          >
            View All →
          </button>
        </div>
        
        <div className="space-y-4">
          {mockInternships.slice(0, 2).map((internship) => (
            <div key={internship.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 hover:border-green-500/30 transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-white">{internship.title}</h4>
                    {internship.isNew && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{internship.organization}</p>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">{internship.matchPercentage}%</div>
                  <div className="text-xs text-gray-400">Match</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{internship.location}</span>
                <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{internship.duration}</span>
              </div>
              
              <button
                onClick={() => handleApply(internship)}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-200"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInternshipsTab = () => (
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2">
        {[
          { id: 'recommended', label: 'Recommended', icon: Star },
          { id: 'new', label: 'New', icon: Gift },
          { id: 'deadline', label: 'Ending Soon', icon: Clock },
          { id: 'bookmarked', label: 'Saved', icon: Bookmark }
        ].map((filter) => {
          const IconComponent = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                selectedFilter === filter.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span className="text-sm font-medium">{filter.label}</span>
            </button>
          );
        })}
      </div>

      {/* Internships List */}
      <div className="space-y-4">
        {mockInternships.map((internship) => (
          <div key={internship.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 hover:border-green-500/30 transition-all duration-200">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-lg font-semibold text-white">{internship.title}</h4>
                  {internship.isNew && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>
                  )}
                </div>
                <p className="text-gray-400 mb-2">{internship.organization}</p>
                <p className="text-gray-300 text-sm">{internship.description}</p>
              </div>
              <div className="text-right ml-4">
                <div className="text-2xl font-bold text-green-400 mb-1">{internship.matchPercentage}%</div>
                <div className="text-xs text-gray-400">Match Score</div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{internship.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{internship.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">{internship.stipend}</span>
              </div>
              <div className="flex items-center space-x-2 text-red-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{internship.deadline}</span>
              </div>
            </div>

            {/* Skills Required */}
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Skills Required:</p>
              <div className="flex flex-wrap gap-2">
                {internship.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`${getSkillColor(skill)} text-white text-xs px-3 py-1 rounded-full`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleApply(internship)}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200"
              >
                Apply Now
              </button>
              
              <button
                onClick={() => toggleBookmark(internship.id)}
                className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                  bookmarkedInternships.includes(internship.id)
                    ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                    : 'border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-500'
                }`}
              >
                <Bookmark className="w-5 h-5" />
              </button>
              
              <button className="w-12 h-12 rounded-lg border-2 border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-500 transition-all duration-200 flex items-center justify-center">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Applicant Count */}
            <div className="flex items-center justify-center mt-3 pt-3 border-t border-gray-700">
              <Users className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-gray-400 text-sm">{internship.applicants} applicants</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMentorsTab = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Connect with Expert Mentors</h3>
        <p className="text-gray-400">Get guidance from industry professionals</p>
      </div>

      <div className="space-y-4">
        {mockMentors.map((mentor) => (
          <div key={mentor.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                {mentor.image}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-white">{mentor.name}</h4>
                  {mentor.isAvailable && (
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  )}
                </div>
                <p className="text-blue-400 font-medium">{mentor.role}</p>
                <p className="text-gray-400 text-sm">{mentor.organization}</p>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 text-yellow-400 mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold">{mentor.rating}</span>
                </div>
                <p className="text-gray-400 text-sm">{mentor.sessions} sessions</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Expertise:</p>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleMentorConnect(mentor)}
              disabled={!mentor.isAvailable}
              className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                mentor.isAvailable
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {mentor.isAvailable ? (
                <span className="flex items-center justify-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect Now</span>
                </span>
              ) : (
                'Currently Unavailable'
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* User Profile Header */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
          👤
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{userProfile?.name}</h2>
        <p className="text-gray-400 mb-4">Level {userStats.level} Pathfinder</p>
        
        <div className="flex justify-center space-x-6">
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">{userStats.xp}</div>
            <div className="text-xs text-gray-400">Total XP</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-400">{userStats.completedQuests}</div>
            <div className="text-xs text-gray-400">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-400">{userStats.streak}</div>
            <div className="text-xs text-gray-400">Streak</div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm">Location</label>
            <p className="text-white font-medium">{userProfile?.location}</p>
          </div>
          
          <div>
            <label className="text-gray-400 text-sm">Education</label>
            <p className="text-white font-medium capitalize">{userProfile?.education}</p>
          </div>
          
          <div>
            <label className="text-gray-400 text-sm">Skills ({userProfile?.skills?.length || 0})</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {userProfile?.skills?.map((skill) => (
                <span
                  key={skill}
                  className="bg-green-500 text-white text-xs px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              )) || <span className="text-gray-400 text-sm">No skills added</span>}
            </div>
          </div>
          
          <div>
            <label className="text-gray-400 text-sm">Interests ({userProfile?.interests?.length || 0})</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {userProfile?.interests?.map((interest) => (
                <span
                  key={interest}
                  className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full"
                >
                  {interest}
                </span>
              )) || <span className="text-gray-400 text-sm">No interests added</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Achievements</h3>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center">
                    <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <p className="text-yellow-400 font-medium text-sm">Quest Master</p>
                    <p className="text-gray-400 text-xs">Complete 3 quests</p>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                    <Flame className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-green-400 font-medium text-sm">Streak Keeper</p>
                    <p className="text-gray-400 text-xs">5 day streak</p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
                    <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-blue-400 font-medium text-sm">Profile Pro</p>
                    <p className="text-gray-400 text-xs">Complete profile</p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-center opacity-50">
                    <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-purple-400 font-medium text-sm">Networker</p>
                    <p className="text-gray-400 text-xs">Connect 5 mentors</p>
                </div>
            </div>
        </div>
    </div>
);

  // Define bottom navigation items with view navigation
  const bottomNavItems = [
    { id: 'home', icon: Home, label: 'Home', view: null },
    { id: 'internships', icon: Search, label: 'Browse', view: 'recommendations' },
    { id: 'applications', icon: FileText, label: 'Applications', view: 'applications' },
    { id: 'mentors', icon: Users, label: 'Mentors', view: 'mentorship' },
    { id: 'profile', icon: User, label: 'Profile', view: null }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold">PragatiPath</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-yellow-400">
                <Zap className="w-4 h-4" />
                <span className="font-bold text-sm">{userStats.xp}</span>
              </div>
              
              <button className="relative">
                <Bell className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                {notifications > 0 && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                    {notifications}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Render active tab content */}
        {activeTab === 'home' && renderHomeTab()}
        {activeTab === 'internships' && renderInternshipsTab()}
        {activeTab === 'mentors' && renderMentorsTab()}
        {activeTab === 'profile' && renderProfileTab()}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            {bottomNavItems.map(({ id, icon: Icon, label, view }) => (
              <button
                key={id}
                onClick={() => {
                  if (view) {
                    // Navigate to different view (external navigation)
                    onNavigate(view);
                  } else {
                    // Stay on dashboard but change tab
                    setActiveTab(id);
                  }
                }}
                className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                  activeTab === id && !view
                    ? 'text-green-400 bg-green-500/10'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default Dashboard;
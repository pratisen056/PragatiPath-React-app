import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Star, 
  MessageCircle, 
  Video, 
  Calendar, 
  Clock,
  Award,
  Target,
  BookOpen,
  CheckCircle,
  Filter,
  Search,
  ChevronDown,
  Heart,
  MapPin,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Zap,
  ArrowRight,
  Phone,
  Mail,
  Globe,
  Badge,
  Crown,
  Gift,
  Eye,
  ThumbsUp,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

const MentorshipPlatform = ({ userProfile, onBack, onNavigate }) => {
  // REACT STATE MANAGEMENT
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedFilters, setSelectedFilters] = useState(['all']);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [connectedMentors, setConnectedMentors] = useState([]);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [pendingConnections, setPendingConnections] = useState([]);

  // MOCK MENTOR DATA - In real app, this comes from API
  const mockMentors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      role: 'Senior Policy Advisor',
      organization: 'NITI Aayog',
      location: 'New Delhi',
      expertise: ['Government Policy', 'Rural Development', 'Public Administration'],
      experience: 15,
      rating: 4.9,
      totalSessions: 247,
      responseTime: '< 2 hours',
      languages: ['Hindi', 'English'],
      bio: 'Passionate about bridging the gap between policy and implementation. Specialized in rural development programs and youth empowerment initiatives.',
      achievements: ['Excellence in Public Service', 'Youth Mentor of the Year'],
      availability: 'Available',
      priceRange: 'Free',
      sessionTypes: ['1-on-1 Chat', 'Video Call', 'Group Session'],
      specialties: ['Career Guidance', 'Interview Prep', 'Government Jobs'],
      image: '👩‍💼',
      isVerified: true,
      isPremium: false,
      matchPercentage: 95,
      totalMentees: 156,
      successRate: 92
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      role: 'Tech Lead',
      organization: 'Digital India Initiative',
      location: 'Bangalore',
      expertise: ['Technology', 'Digital Transformation', 'Product Development'],
      experience: 12,
      rating: 4.8,
      totalSessions: 189,
      responseTime: '< 4 hours',
      languages: ['English', 'Hindi', 'Kannada'],
      bio: 'Building digital solutions for rural India. Former startup founder with experience in scaling tech products for government initiatives.',
      achievements: ['Digital Innovation Award', 'Tech Leadership Excellence'],
      availability: 'Available',
      priceRange: 'Free',
      sessionTypes: ['1-on-1 Chat', 'Video Call', 'Code Review'],
      specialties: ['Technical Skills', 'Product Management', 'Startup Guidance'],
      image: '👨‍💻',
      isVerified: true,
      isPremium: true,
      matchPercentage: 88,
      totalMentees: 98,
      successRate: 89
    },
    {
      id: 3,
      name: 'Dr. Anjali Patel',
      role: 'Healthcare Program Director',
      organization: 'Ministry of Health',
      location: 'Mumbai',
      expertise: ['Healthcare Management', 'Public Health', 'Program Implementation'],
      experience: 18,
      rating: 4.9,
      totalSessions: 312,
      responseTime: '< 1 hour',
      languages: ['English', 'Hindi', 'Gujarati'],
      bio: 'Dedicated to improving healthcare accessibility in rural areas. Expert in designing and implementing large-scale health programs.',
      achievements: ['Excellence in Healthcare', 'Community Impact Leader'],
      availability: 'Available',
      priceRange: 'Free',
      sessionTypes: ['1-on-1 Chat', 'Video Call', 'Workshop'],
      specialties: ['Healthcare Career', 'Public Health', 'Project Management'],
      image: '👩‍⚕️',
      isVerified: true,
      isPremium: false,
      matchPercentage: 82,
      totalMentees: 203,
      successRate: 94
    },
    {
      id: 4,
      name: 'Suresh Reddy',
      role: 'Financial Inclusion Expert',
      organization: 'Reserve Bank of India',
      location: 'Hyderabad',
      expertise: ['Financial Services', 'Banking', 'Financial Literacy'],
      experience: 20,
      rating: 4.7,
      totalSessions: 156,
      responseTime: '< 6 hours',
      languages: ['English', 'Hindi', 'Telugu'],
      bio: 'Championing financial inclusion across rural India. Expert in banking operations and financial service delivery models.',
      achievements: ['Financial Innovation Leader', 'Rural Banking Excellence'],
      availability: 'Busy',
      priceRange: 'Free',
      sessionTypes: ['1-on-1 Chat', 'Group Session'],
      specialties: ['Banking Career', 'Financial Planning', 'Business Development'],
      image: '👨‍💼',
      isVerified: true,
      isPremium: false,
      matchPercentage: 76,
      totalMentees: 87,
      successRate: 88
    },
    {
      id: 5,
      name: 'Kavya Singh',
      role: 'Education Policy Specialist',
      organization: 'Ministry of Education',
      location: 'Chennai',
      expertise: ['Education Policy', 'Skill Development', 'Training Programs'],
      experience: 14,
      rating: 4.8,
      totalSessions: 198,
      responseTime: '< 3 hours',
      languages: ['English', 'Hindi', 'Tamil'],
      bio: 'Passionate about democratizing education through policy innovation. Specialist in designing skill development programs for youth.',
      achievements: ['Education Excellence Award', 'Policy Innovation Leader'],
      availability: 'Available',
      priceRange: 'Free',
      sessionTypes: ['1-on-1 Chat', 'Video Call', 'Workshop'],
      specialties: ['Education Career', 'Skill Development', 'Policy Research'],
      image: '👩‍🎓',
      isVerified: true,
      isPremium: true,
      matchPercentage: 91,
      totalMentees: 134,
      successRate: 91
    }
  ];

  // MOCK SESSION HISTORY
  const mockSessions = [
    {
      id: 1,
      mentorId: 1,
      mentorName: 'Dr. Priya Sharma',
      date: '2024-09-05',
      duration: '45 min',
      type: 'Video Call',
      topic: 'Government Job Interview Preparation',
      status: 'Completed',
      rating: 5,
      notes: 'Great session on interview techniques for government positions'
    },
    {
      id: 2,
      mentorId: 2,
      mentorName: 'Rahul Kumar',
      date: '2024-09-03',
      duration: '30 min',
      type: '1-on-1 Chat',
      topic: 'Technical Skills Roadmap',
      status: 'Completed',
      rating: 4,
      notes: 'Helpful guidance on learning path for technology roles'
    }
  ];

  // FILTER OPTIONS
  const filterOptions = [
    { id: 'all', label: 'All Mentors', icon: Users },
    { id: 'available', label: 'Available Now', icon: CheckCircle },
    { id: 'top-rated', label: 'Top Rated (4.5+)', icon: Star },
    { id: 'verified', label: 'Verified', icon: Badge },
    { id: 'free', label: 'Free Sessions', icon: Gift },
    { id: 'premium', label: 'Premium', icon: Crown }
  ];

  const sortOptions = [
    { id: 'rating', label: 'Highest Rated' },
    { id: 'experience', label: 'Most Experienced' },
    { id: 'sessions', label: 'Most Sessions' },
    { id: 'match', label: 'Best Match' },
    { id: 'response', label: 'Fastest Response' }
  ];

  const expertiseAreas = [
    'Government Policy', 'Technology', 'Healthcare', 'Education', 'Finance',
    'Rural Development', 'Digital Transformation', 'Public Administration',
    'Career Guidance', 'Skill Development'
  ];

  // REACT EFFECT
  useEffect(() => {
    console.log('Loading mentors for:', userProfile?.name);
    
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setMentors(mockMentors);
      setSessionHistory(mockSessions);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [userProfile]);

  // EVENT HANDLERS
  const handleConnect = (mentor) => {
    if (connectedMentors.includes(mentor.id)) {
      alert(`You're already connected with ${mentor.name}!`);
      return;
    }
    
    if (pendingConnections.includes(mentor.id)) {
      alert(`Connection request already sent to ${mentor.name}!`);
      return;
    }
    
    setPendingConnections(prev => [...prev, mentor.id]);
    
    setTimeout(() => {
      setConnectedMentors(prev => [...prev, mentor.id]);
      setPendingConnections(prev => prev.filter(id => id !== mentor.id));
      alert(`🎉 Successfully connected with ${mentor.name}!\n\nYou can now book sessions and start chatting.`);
    }, 2000);
  };

  const handleBookSession = (mentor) => {
    console.log('Booking session with:', mentor.name);
    alert(`📅 Session booking with ${mentor.name}\n\nRedirecting to calendar...`);
  };

  const handleMessage = (mentor) => {
    console.log('Starting chat with:', mentor.name);
    alert(`💬 Opening chat with ${mentor.name}\n\nChat feature coming soon!`);
  };

  // FILTER LOGIC
  const getFilteredMentors = () => {
    let filtered = mentors.filter(mentor => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = mentor.name.toLowerCase().includes(query) ||
                            mentor.role.toLowerCase().includes(query) ||
                            mentor.organization.toLowerCase().includes(query) ||
                            mentor.expertise.some(exp => exp.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Category filters
      if (!selectedFilters.includes('all')) {
        if (selectedFilters.includes('available') && mentor.availability !== 'Available') return false;
        if (selectedFilters.includes('top-rated') && mentor.rating < 4.5) return false;
        if (selectedFilters.includes('verified') && !mentor.isVerified) return false;
        if (selectedFilters.includes('free') && mentor.priceRange !== 'Free') return false;
        if (selectedFilters.includes('premium') && !mentor.isPremium) return false;
      }

      return true;
    });

    // Sort
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'sessions':
          return b.totalSessions - a.totalSessions;
        case 'match':
          return b.matchPercentage - a.matchPercentage;
        case 'response':
          return a.responseTime.localeCompare(b.responseTime);
        default:
          return 0;
      }
    });
  };

  // UTILITY FUNCTIONS
  const getConnectionStatus = (mentorId) => {
    if (connectedMentors.includes(mentorId)) return 'connected';
    if (pendingConnections.includes(mentorId)) return 'pending';
    return 'not_connected';
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Available': return 'text-green-400';
      case 'Busy': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  // LOADING STATE
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white mb-2">Finding Your Perfect Mentors</h2>
          <p className="text-gray-400">Matching you with expert mentors...</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-center text-blue-400 text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Analyzing your profile and interests
            </div>
            <div className="flex items-center justify-center text-green-400 text-sm">
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Finding compatible mentors
            </div>
            <div className="flex items-center justify-center text-purple-400 text-sm">
              <Target className="w-4 h-4 mr-2" />
              Calculating mentor compatibility
            </div>
          </div>
        </div>
      </div>
    );
  }

  // TAB RENDERERS
  const renderDiscoverTab = () => {
    const filteredMentors = getFilteredMentors();

    return (
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search mentors by name, role, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-xl transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500 focus:outline-none"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Filter Pills */}
          {showFilters && (
            <div className="flex flex-wrap gap-2 p-4 bg-gray-800/50 rounded-xl">
              {filterOptions.map((filter) => {
                const IconComponent = filter.icon;
                const isActive = selectedFilters.includes(filter.id);
                
                return (
                  <button
                    key={filter.id}
                    onClick={() => {
                      if (filter.id === 'all') {
                        setSelectedFilters(['all']);
                      } else {
                        setSelectedFilters(prev => {
                          const newFilters = prev.filter(f => f !== 'all');
                          return prev.includes(filter.id)
                            ? newFilters.filter(f => f !== filter.id)
                            : [...newFilters, filter.id];
                        });
                      }
                    }}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-400">
          Found {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''} for {userProfile?.name}
        </div>

        {/* Mentors Grid */}
        {filteredMentors.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No mentors found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSelectedFilters(['all']);
                setSearchQuery('');
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMentors.map((mentor) => {
              const connectionStatus = getConnectionStatus(mentor.id);
              
              return (
                <div key={mentor.id} className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                      {mentor.image}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-white text-lg truncate">{mentor.name}</h3>
                        {mentor.isVerified && (
                          <Badge className="w-4 h-4 text-blue-400" />
                        )}
                        {mentor.isPremium && (
                          <Crown className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                      <p className="text-blue-400 font-medium text-sm mb-1">{mentor.role}</p>
                      <p className="text-gray-400 text-sm truncate">{mentor.organization}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400 mb-1">{mentor.matchPercentage}%</div>
                      <div className="text-xs text-gray-400">Match</div>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold">{mentor.rating}</span>
                      </div>
                      <div className="text-xs text-gray-400">{mentor.totalSessions} sessions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-400 font-bold mb-1">{mentor.experience}yr</div>
                      <div className="text-xs text-gray-400">Experience</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-bold mb-1 ${getAvailabilityColor(mentor.availability)}`}>
                        {mentor.availability}
                      </div>
                      <div className="text-xs text-gray-400">{mentor.responseTime}</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{mentor.bio}</p>

                  {/* Expertise Tags */}
                  <div className="mb-4">
                    <p className="text-gray-400 text-xs mb-2">Expertise:</p>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {mentor.expertise.length > 3 && (
                        <span className="text-gray-400 text-xs px-2 py-1">
                          +{mentor.expertise.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {connectionStatus === 'connected' ? (
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleMessage(mentor)}
                          className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Message</span>
                        </button>
                        <button
                          onClick={() => handleBookSession(mentor)}
                          className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Book Session</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleConnect(mentor)}
                        disabled={connectionStatus === 'pending'}
                        className={`w-full font-medium py-3 rounded-lg transition-all duration-200 ${
                          connectionStatus === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transform hover:scale-[1.02]'
                        }`}
                      >
                        {connectionStatus === 'pending' ? (
                          <span className="flex items-center justify-center space-x-2">
                            <Clock className="w-4 h-4 animate-spin" />
                            <span>Request Sent</span>
                          </span>
                        ) : (
                          <span className="flex items-center justify-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>Connect</span>
                          </span>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-gray-700 text-xs text-gray-400">
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {mentor.totalMentees} mentees
                    </span>
                    <span className="flex items-center">
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      {mentor.successRate}% success
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {mentor.location}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderMyMentorsTab = () => {
    const myMentors = mentors.filter(mentor => connectedMentors.includes(mentor.id));
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2">Your Mentors</h3>
          <p className="text-gray-400">Connected mentors and ongoing relationships</p>
        </div>

        {myMentors.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No mentors connected yet</h3>
            <p className="text-gray-400 mb-6">Start by connecting with mentors in the Discover tab</p>
            <button
              onClick={() => setActiveTab('discover')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              Discover Mentors
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {myMentors.map((mentor) => (
              <div key={mentor.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl">
                    {mentor.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{mentor.name}</h4>
                    <p className="text-blue-400 text-sm">{mentor.role}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleMessage(mentor)}
                      className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => handleBookSession(mentor)}
                      className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="text-yellow-400 font-bold">{mentor.rating}</div>
                    <div className="text-gray-400">Rating</div>
                  </div>
                  <div>
                    <div className="text-green-400 font-bold">5</div>
                    <div className="text-gray-400">Sessions</div>
                  </div>
                  <div>
                    <div className="text-blue-400 font-bold">2 days</div>
                    <div className="text-gray-400">Last chat</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSessionsTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Session History</h3>
        <p className="text-gray-400">Your mentoring sessions and progress</p>
      </div>

      {sessionHistory.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No sessions yet</h3>
          <p className="text-gray-400 mb-6">Book your first session with a mentor to get started</p>
          <button
            onClick={() => setActiveTab('discover')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Find Mentors
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {sessionHistory.map((session) => (
            <div key={session.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-white mb-1">{session.topic}</h4>
                  <p className="text-blue-400 text-sm">{session.mentorName}</p>
                  <div className="flex items-center space-x-4 mt-2 text-gray-400 text-sm">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {session.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {session.duration}
                    </span>
                    <span className="flex items-center">
                      <Video className="w-4 h-4 mr-1" />
                      {session.type}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center text-yellow-400 mb-1">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    <span className="font-bold">{session.rating}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    session.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {session.status}
                  </span>
                </div>
              </div>
              
              {session.notes && (
                <div className="bg-gray-700/30 rounded-lg p-3">
                  <p className="text-gray-300 text-sm">{session.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center">
                <Users className="w-6 h-6 text-blue-400 mr-2" />
                Mentorship Platform
              </h1>
              <p className="text-gray-400">Connect with industry experts and accelerate your career</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-blue-400 font-bold">{connectedMentors.length}</div>
                <div className="text-xs text-gray-400">Connected</div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold">{sessionHistory.length}</div>
                <div className="text-xs text-gray-400">Sessions</div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
            {[
              { id: 'discover', label: 'Discover', icon: Search },
              { id: 'my-mentors', label: 'My Mentors', icon: Users },
              { id: 'sessions', label: 'Sessions', icon: Calendar }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                {id === 'my-mentors' && connectedMentors.length > 0 && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {connectedMentors.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === 'discover' && renderDiscoverTab()}
        {activeTab === 'my-mentors' && renderMyMentorsTab()}
        {activeTab === 'sessions' && renderSessionsTab()}
      </main>

      {/* Bottom spacing for mobile */}
      <div className="h-8"></div>
    </div>
  );
};

export default MentorshipPlatform;
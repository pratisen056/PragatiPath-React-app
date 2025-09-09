import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Users, 
  Bookmark, 
  Share2, 
  Filter,
  Search,
  ChevronDown,
  Target,
  Zap,
  Heart,
  Award,
  Briefcase,
  Calendar,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ThumbsUp,
  ArrowRight,
  Eye,
  MessageSquare
} from 'lucide-react';

const SmartRecommendationEngine = ({ userProfile, onInternshipSelect, onBack }) => {
  // REACT STATE MANAGEMENT
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState(['all']);
  const [sortBy, setSortBy] = useState('match');
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [appliedInternships, setAppliedInternships] = useState([]);

  // MOCK RECOMMENDATION DATA - In real app, this comes from AI API
  const mockRecommendations = [
    {
      id: 1,
      title: 'Digital India Fellowship',
      organization: 'Ministry of Electronics & Information Technology',
      type: 'Government',
      location: userProfile?.location || 'New Delhi',
      duration: '6 months',
      stipend: '₹15,000/month',
      applicationDeadline: '2024-10-15',
      matchPercentage: 98,
      aiReason: 'Perfect match based on your computer skills and government interest',
      requiredSkills: ['Computer Basics', 'Communication', 'English'],
      learningOutcomes: ['Digital governance', 'Public policy', 'Technology implementation'],
      difficulty: 'Beginner',
      applicants: 45,
      positions: 20,
      description: 'Help implement digital governance solutions in rural areas and support citizens with online services.',
      benefits: ['Certificate', 'Mentorship', 'Full-time offer potential'],
      tags: ['Technology', 'Government', 'Impact'],
      rating: 4.8,
      reviews: 127,
      isNew: true,
      urgency: 'high'
    },
    {
      id: 2,
      title: 'Rural Healthcare Assistant',
      organization: 'Ministry of Health and Family Welfare',
      type: 'Government',
      location: userProfile?.location || 'Bhopal',
      duration: '4 months',
      stipend: '₹12,000/month',
      applicationDeadline: '2024-09-28',
      matchPercentage: 92,
      aiReason: 'Great match for your social work interest and communication skills',
      requiredSkills: ['Communication', 'Empathy', 'Basic Health Knowledge'],
      learningOutcomes: ['Healthcare delivery', 'Community engagement', 'Public health'],
      difficulty: 'Intermediate',
      applicants: 78,
      positions: 15,
      description: 'Support rural healthcare initiatives and help bridge the gap between communities and healthcare services.',
      benefits: ['Health sector experience', 'Community impact', 'Medical training'],
      tags: ['Healthcare', 'Rural', 'Social Impact'],
      rating: 4.6,
      reviews: 89,
      isNew: false,
      urgency: 'medium'
    },
    {
      id: 3,
      title: 'Skill Development Coordinator',
      organization: 'Ministry of Skill Development',
      type: 'Government',
      location: userProfile?.location || 'Mumbai',
      duration: '5 months',
      stipend: '₹13,500/month',
      applicationDeadline: '2024-10-08',
      matchPercentage: 88,
      aiReason: 'Matches your education level and leadership potential',
      requiredSkills: ['Leadership', 'Training', 'Communication'],
      learningOutcomes: ['Training methodology', 'Skill assessment', 'Program management'],
      difficulty: 'Intermediate',
      applicants: 156,
      positions: 25,
      description: 'Coordinate skill development programs for youth and help design training curricula.',
      benefits: ['Training certification', 'Program management', 'Career counseling'],
      tags: ['Education', 'Skills', 'Youth'],
      rating: 4.7,
      reviews: 203,
      isNew: false,
      urgency: 'low'
    },
    {
      id: 4,
      title: 'Environmental Data Analyst',
      organization: 'Ministry of Environment & Forests',
      type: 'Government',
      location: userProfile?.location || 'Bangalore',
      duration: '6 months',
      stipend: '₹16,000/month',
      applicationDeadline: '2024-10-20',
      matchPercentage: 85,
      aiReason: 'Good match for your analytical mindset and technology skills',
      requiredSkills: ['Data Analysis', 'Computer Skills', 'Research'],
      learningOutcomes: ['Environmental monitoring', 'Data visualization', 'Policy analysis'],
      difficulty: 'Advanced',
      applicants: 203,
      positions: 12,
      description: 'Analyze environmental data to support climate change initiatives and conservation efforts.',
      benefits: ['Research experience', 'Environmental expertise', 'Data skills'],
      tags: ['Environment', 'Technology', 'Research'],
      rating: 4.9,
      reviews: 156,
      isNew: true,
      urgency: 'medium'
    },
    {
      id: 5,
      title: 'Financial Inclusion Officer',
      organization: 'Ministry of Finance',
      type: 'Government',
      location: userProfile?.location || 'Chennai',
      duration: '4 months',
      stipend: '₹14,000/month',
      applicationDeadline: '2024-09-25',
      matchPercentage: 82,
      aiReason: 'Matches your interest in helping underserved communities',
      requiredSkills: ['Mathematics', 'Communication', 'Financial Literacy'],
      learningOutcomes: ['Banking systems', 'Financial inclusion', 'Policy implementation'],
      difficulty: 'Intermediate',
      applicants: 342,
      positions: 30,
      description: 'Help implement financial inclusion programs and assist rural communities with banking services.',
      benefits: ['Financial sector exposure', 'Policy experience', 'Banking knowledge'],
      tags: ['Finance', 'Rural', 'Policy'],
      rating: 4.5,
      reviews: 278,
      isNew: false,
      urgency: 'high'
    }
  ];

  // FILTER OPTIONS
  const filterOptions = [
    { id: 'all', label: 'All Recommendations', icon: Target },
    { id: 'high-match', label: 'High Match (90%+)', icon: Star },
    { id: 'new', label: 'New Postings', icon: Zap },
    { id: 'urgent', label: 'Ending Soon', icon: Clock },
    { id: 'beginner', label: 'Beginner Friendly', icon: CheckCircle }
  ];

  const sortOptions = [
    { id: 'match', label: 'Best Match' },
    { id: 'deadline', label: 'Application Deadline' },
    { id: 'stipend', label: 'Stipend Amount' },
    { id: 'rating', label: 'Rating' }
  ];

  // REACT EFFECT - Simulates API call to get recommendations
  useEffect(() => {
    console.log('Loading recommendations for:', userProfile?.name);
    
    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      // In real app, this would be an actual API call:
      // const recs = await fetchRecommendations(userProfile);
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [userProfile]);

  // EVENT HANDLERS
  const toggleBookmark = (internshipId) => {
    setBookmarkedItems(prev => 
      prev.includes(internshipId) 
        ? prev.filter(id => id !== internshipId)
        : [...prev, internshipId]
    );
  };

const handleApply = (internship) => {
  if (appliedInternships.includes(internship.id)) {
    alert('You have already applied to this internship!');
    return;
  }
  
  setAppliedInternships(prev => [...prev, internship.id]);
  
  // Redirect to application manager instead of just showing alert
  if (onInternshipSelect) {
    onInternshipSelect(internship);
  }
  
  alert(`🎯 Application submitted for ${internship.title}!\n\nRedirecting to application tracker...`);
};

  const handleShare = (internship) => {
    // In real app, this would use Web Share API or copy to clipboard
    const shareText = `Check out this internship: ${internship.title} at ${internship.organization}`;
    console.log('Sharing:', shareText);
    alert('📱 Share link copied to clipboard!');
  };

  // FILTER LOGIC
  const getFilteredRecommendations = () => {
    let filtered = recommendations;

    // Apply filters
    if (!selectedFilters.includes('all')) {
      filtered = filtered.filter(rec => {
        if (selectedFilters.includes('high-match') && rec.matchPercentage >= 90) return true;
        if (selectedFilters.includes('new') && rec.isNew) return true;
        if (selectedFilters.includes('urgent') && rec.urgency === 'high') return true;
        if (selectedFilters.includes('beginner') && rec.difficulty === 'Beginner') return true;
        return false;
      });
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchPercentage - a.matchPercentage;
        case 'deadline':
          return new Date(a.applicationDeadline) - new Date(b.applicationDeadline);
        case 'stipend':
          return parseInt(b.stipend.replace(/[^0-9]/g, '')) - parseInt(a.stipend.replace(/[^0-9]/g, ''));
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return sorted;
  };

  // UTILITY FUNCTIONS
  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 80) return 'text-yellow-400';
    return 'text-blue-400';
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'border-red-500 bg-red-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      default: return 'border-green-500 bg-green-500/10';
    }
  };

  // LOADING STATE
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white mb-2">Finding Your Perfect Matches</h2>
          <p className="text-gray-400">Our AI is analyzing thousands of opportunities...</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-center text-green-400 text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Analyzing your skills and interests
            </div>
            <div className="flex items-center justify-center text-blue-400 text-sm">
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Matching with available positions
            </div>
            <div className="flex items-center justify-center text-purple-400 text-sm">
              <Target className="w-4 h-4 mr-2" />
              Calculating compatibility scores
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredRecommendations = getFilteredRecommendations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center">
                <Star className="w-6 h-6 text-yellow-400 mr-2" />
                Smart Recommendations
              </h1>
              <p className="text-gray-400">AI-powered matches based on your profile</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-green-500 focus:outline-none"
              >
                <option value="" disabled>Sort by</option>
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Pills */}
          {showFilters && (
            <div className="flex flex-wrap gap-2 mb-4 p-4 bg-gray-800/50 rounded-lg">
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
                        ? 'bg-green-500 text-white'
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

          {/* Results Count */}
          <div className="text-sm text-gray-400">
            Found {filteredRecommendations.length} perfect matches for {userProfile?.name}
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {filteredRecommendations.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No matches found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your filters or updating your profile</p>
            <button
              onClick={() => setSelectedFilters(['all'])}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredRecommendations.map((internship) => (
              <div key={internship.id} className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{internship.title}</h3>
                      {internship.isNew && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          NEW
                        </span>
                      )}
                      {appliedInternships.includes(internship.id) && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          APPLIED
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 font-medium mb-2">{internship.organization}</p>
                    <p className="text-gray-400 leading-relaxed">{internship.description}</p>
                  </div>
                  
                  <div className="text-right ml-6">
                    <div className={`text-3xl font-bold mb-1 ${getMatchColor(internship.matchPercentage)}`}>
                      {internship.matchPercentage}%
                    </div>
                    <div className="text-xs text-gray-400 mb-2">AI Match</div>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      <span className="text-sm font-medium">{internship.rating}</span>
                    </div>
                  </div>
                </div>

                {/* AI Reasoning */}
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-2">
                    <Zap className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-green-400 font-medium text-sm mb-1">AI Insight:</p>
                      <p className="text-gray-300 text-sm">{internship.aiReason}</p>
                    </div>
                  </div>
                </div>

                {/* Key Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{internship.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{internship.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">{internship.stipend}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 text-sm font-medium">
                      {getDaysUntilDeadline(internship.applicationDeadline)} days left
                    </span>
                  </div>
                </div>

                {/* Skills & Tags */}
                <div className="mb-4 space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {internship.requiredSkills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {internship.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>Application Progress</span>
                    <span>{internship.applicants}/{internship.positions + internship.applicants} total</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                      style={{ width: `${(internship.applicants / (internship.positions + internship.applicants)) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {internship.positions} positions still available
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleApply(internship)}
                    disabled={appliedInternships.includes(internship.id)}
                    className={`flex-1 font-semibold py-3 px-6 rounded-xl transition-all duration-200 ${
                      appliedInternships.includes(internship.id)
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white transform hover:scale-[1.02]'
                    }`}
                  >
                    {appliedInternships.includes(internship.id) ? (
                      <span className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Applied</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <span>Apply Now</span>
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </button>
                  
                  <button
                    onClick={() => toggleBookmark(internship.id)}
                    className={`w-12 h-12 rounded-xl border-2 transition-all duration-200 flex items-center justify-center ${
                      bookmarkedItems.includes(internship.id)
                        ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                        : 'border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() => handleShare(internship)}
                    className="w-12 h-12 rounded-xl border-2 border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-500 transition-all duration-200 flex items-center justify-center"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  
                  <button className="w-12 h-12 rounded-xl border-2 border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-500 transition-all duration-200 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>

                {/* Applicant Stats */}
                <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {internship.applicants} applied
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {internship.reviews} reviews
                    </span>
                    <span className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {Math.round(internship.rating * 20)}% satisfaction
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom spacing */}
      <div className="h-8"></div>
    </div>
  );
};

export default SmartRecommendationEngine;
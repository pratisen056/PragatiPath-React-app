import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Calendar,
  MapPin,
  Building,
  User,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Award,
  Target,
  Bookmark,
  MessageSquare,
  Video,
  ExternalLink,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  Send,
  Paperclip,
  CheckSquare,
  AlertTriangle,
  Info,
  Zap,
  Heart,
  ThumbsUp,
  Share2
} from 'lucide-react';

const ApplicationManager = ({ userProfile, onBack, onNavigate }) => {
  // STATE MANAGEMENT
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  // MOCK APPLICATION DATA
  const mockApplications = [
    {
      id: 1,
      internshipTitle: 'Digital India Fellowship',
      organization: 'Ministry of Electronics & IT',
      appliedDate: '2024-09-01',
      status: 'interview_scheduled',
      statusMessage: 'Interview scheduled for Sept 12, 2024 at 10:00 AM',
      priority: 'high',
      stipend: '₹15,000/month',
      duration: '6 months',
      location: 'New Delhi',
      applicationId: 'APP001',
      progress: 75,
      nextStep: 'Prepare for technical interview',
      interviewDate: '2024-09-12',
      interviewType: 'Virtual',
      documents: ['resume.pdf', 'cover_letter.pdf', 'certificates.pdf'],
      timeline: [
        { step: 'Application Submitted', date: '2024-09-01', status: 'completed' },
        { step: 'Initial Screening', date: '2024-09-03', status: 'completed' },
        { step: 'Document Verification', date: '2024-09-05', status: 'completed' },
        { step: 'Interview Scheduled', date: '2024-09-08', status: 'current' },
        { step: 'Final Decision', date: 'Pending', status: 'pending' }
      ],
      matchPercentage: 95,
      tips: [
        'Review technical concepts related to digital governance',
        'Prepare examples of your problem-solving skills',
        'Research recent Digital India initiatives'
      ]
    },
    {
      id: 2,
      internshipTitle: 'Rural Healthcare Assistant',
      organization: 'Ministry of Health',
      appliedDate: '2024-08-28',
      status: 'under_review',
      statusMessage: 'Application under review by HR team',
      priority: 'medium',
      stipend: '₹12,000/month',
      duration: '4 months',
      location: 'Bhopal',
      applicationId: 'APP002',
      progress: 45,
      nextStep: 'Wait for initial screening results',
      documents: ['resume.pdf', 'cover_letter.pdf'],
      timeline: [
        { step: 'Application Submitted', date: '2024-08-28', status: 'completed' },
        { step: 'Initial Screening', date: '2024-08-30', status: 'current' },
        { step: 'Document Verification', date: 'Pending', status: 'pending' },
        { step: 'Interview', date: 'Pending', status: 'pending' },
        { step: 'Final Decision', date: 'Pending', status: 'pending' }
      ],
      matchPercentage: 88,
      tips: [
        'Keep your phone available for potential screening calls',
        'Review basic healthcare terminology',
        'Prepare examples of community service experience'
      ]
    },
    {
      id: 3,
      internshipTitle: 'Environmental Data Analyst',
      organization: 'Ministry of Environment',
      appliedDate: '2024-08-25',
      status: 'accepted',
      statusMessage: 'Congratulations! Offer letter sent',
      priority: 'high',
      stipend: '₹16,000/month',
      duration: '6 months',
      location: 'Bangalore',
      applicationId: 'APP003',
      progress: 100,
      nextStep: 'Complete joining formalities',
      documents: ['resume.pdf', 'offer_letter.pdf', 'joining_kit.pdf'],
      timeline: [
        { step: 'Application Submitted', date: '2024-08-25', status: 'completed' },
        { step: 'Initial Screening', date: '2024-08-27', status: 'completed' },
        { step: 'Document Verification', date: '2024-08-29', status: 'completed' },
        { step: 'Interview', date: '2024-09-02', status: 'completed' },
        { step: 'Offer Extended', date: '2024-09-06', status: 'completed' }
      ],
      matchPercentage: 92,
      offerDetails: {
        startDate: '2024-09-15',
        reportingTime: '9:00 AM',
        contactPerson: 'Dr. Amit Sharma',
        contactEmail: 'amit.sharma@gov.in',
        reportingAddress: 'Environment Bhawan, CGO Complex, Bangalore'
      }
    },
    {
      id: 4,
      internshipTitle: 'Financial Inclusion Officer',
      organization: 'Ministry of Finance',
      appliedDate: '2024-08-20',
      status: 'rejected',
      statusMessage: 'Thank you for your interest. Unfortunately, we cannot proceed.',
      priority: 'low',
      stipend: '₹14,000/month',
      duration: '4 months',
      location: 'Chennai',
      applicationId: 'APP004',
      progress: 25,
      nextStep: 'Consider applying to similar positions',
      documents: ['resume.pdf'],
      timeline: [
        { step: 'Application Submitted', date: '2024-08-20', status: 'completed' },
        { step: 'Initial Screening', date: '2024-08-22', status: 'completed' },
        { step: 'Application Rejected', date: '2024-08-24', status: 'completed' }
      ],
      matchPercentage: 76,
      feedback: 'Consider gaining more experience in financial services before reapplying.'
    }
  ];

  // MOCK DOCUMENTS DATA
  const mockDocuments = [
    {
      id: 1,
      name: 'resume.pdf',
      type: 'Resume',
      size: '245 KB',
      uploadDate: '2024-08-15',
      status: 'approved',
      usedIn: ['APP001', 'APP002', 'APP003', 'APP004']
    },
    {
      id: 2,
      name: 'cover_letter.pdf',
      type: 'Cover Letter',
      size: '123 KB',
      uploadDate: '2024-08-20',
      status: 'approved',
      usedIn: ['APP001', 'APP002']
    },
    {
      id: 3,
      name: 'certificates.pdf',
      type: 'Certificates',
      size: '890 KB',
      uploadDate: '2024-08-18',
      status: 'pending',
      usedIn: ['APP001']
    },
    {
      id: 4,
      name: 'transcript.pdf',
      type: 'Academic Transcript',
      size: '567 KB',
      uploadDate: '2024-08-10',
      status: 'approved',
      usedIn: []
    }
  ];

  // USEEFFECT
  useEffect(() => {
    console.log('Loading applications for:', userProfile?.name);
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setApplications(mockApplications);
      setDocuments(mockDocuments);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [userProfile]);

  // UTILITY FUNCTIONS
  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-500/10 border-green-500/30 text-green-400';
      case 'interview_scheduled': return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      case 'under_review': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
      case 'rejected': return 'bg-red-500/10 border-red-500/30 text-red-400';
      default: return 'bg-gray-500/10 border-gray-500/30 text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': return CheckCircle;
      case 'interview_scheduled': return Calendar;
      case 'under_review': return Clock;
      case 'rejected': return XCircle;
      default: return AlertCircle;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'accepted': return 'Accepted';
      case 'interview_scheduled': return 'Interview Scheduled';
      case 'under_review': return 'Under Review';
      case 'rejected': return 'Rejected';
      default: return 'Unknown';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // FILTER LOGIC
  const getFilteredApplications = () => {
    return applications.filter(app => {
      const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
      const matchesSearch = !searchQuery || 
        app.internshipTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.organization.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });
  };

  // EVENT HANDLERS
  const handleFileUpload = (file) => {
    setUploadingFile(true);
    
    // Simulate file upload
    setTimeout(() => {
      const newDocument = {
        id: documents.length + 1,
        name: file.name,
        type: file.name.includes('resume') ? 'Resume' : 
              file.name.includes('cover') ? 'Cover Letter' :
              file.name.includes('transcript') ? 'Academic Transcript' : 'Other',
        size: `${Math.round(file.size / 1024)} KB`,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        usedIn: []
      };
      
      setDocuments(prev => [...prev, newDocument]);
      setUploadingFile(false);
      setShowUploadModal(false);
      alert('File uploaded successfully! It will be reviewed within 24 hours.');
    }, 2000);
  };

  const handleDeleteDocument = (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== docId));
    }
  };

  const handleWithdrawApplication = (appId) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      setApplications(prev => prev.map(app => 
        app.id === appId 
          ? { ...app, status: 'withdrawn', statusMessage: 'Application withdrawn by candidate' }
          : app
      ));
      alert('Application withdrawn successfully.');
    }
  };

  // LOADING STATE
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Your Applications</h2>
          <p className="text-gray-400">Fetching application status and documents...</p>
        </div>
      </div>
    );
  }

  // TAB RENDERERS
  const renderApplicationsTab = () => {
    const filteredApps = getFilteredApplications();
    
    return (
      <div className="space-y-6">
        {/* Search and Filter Bar */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
            />
          </div>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="under_review">Under Review</option>
            <option value="interview_scheduled">Interview Scheduled</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Applications List */}
        {filteredApps.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No applications found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApps.map((app) => {
              const StatusIcon = getStatusIcon(app.status);
              
              return (
                <div key={app.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 hover:border-green-500/30 transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-white">{app.internshipTitle}</h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {getStatusLabel(app.status)}
                        </span>
                        <Star className={`w-4 h-4 ${getPriorityColor(app.priority)}`} />
                      </div>
                      <p className="text-blue-400 font-medium mb-1">{app.organization}</p>
                      <p className="text-gray-400 text-sm">{app.statusMessage}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-lg">{app.matchPercentage}%</div>
                      <div className="text-xs text-gray-400">Match</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Application Progress</span>
                      <span>{app.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${app.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{app.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{app.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">{app.stipend}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Applied {formatDate(app.appliedDate)}</span>
                    </div>
                  </div>

                  {/* Next Step */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4">
                    <div className="flex items-start space-x-2">
                      <Target className="w-4 h-4 text-blue-400 mt-0.5" />
                      <div>
                        <p className="text-blue-400 font-medium text-sm">Next Step:</p>
                        <p className="text-gray-300 text-sm">{app.nextStep}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setSelectedApplication(app)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    
                    {app.status !== 'rejected' && app.status !== 'accepted' && (
                      <button
                        onClick={() => handleWithdrawApplication(app.id)}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Withdraw</span>
                      </button>
                    )}
                    
                    <button className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderDocumentsTab = () => (
    <div className="space-y-6">
      {/* Upload Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Document Library</h3>
          <p className="text-gray-400 text-sm">Manage your application documents</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{doc.name}</h4>
                  <p className="text-gray-400 text-xs">{doc.type} • {doc.size}</p>
                </div>
              </div>
              
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                doc.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                doc.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {doc.status}
              </span>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Uploaded</span>
                <span className="text-gray-300">{formatDate(doc.uploadDate)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Used in</span>
                <span className="text-gray-300">{doc.usedIn.length} applications</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1 text-sm">
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-2 px-3 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteDocument(doc.id)}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium py-2 px-3 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
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
                <FileText className="w-6 h-6 text-green-400 mr-2" />
                Application Manager
              </h1>
              <p className="text-gray-400">Track your internship applications and documents</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-green-400 font-bold text-lg">{applications.length}</div>
                <div className="text-xs text-gray-400">Total Applications</div>
              </div>
              <div className="text-center">
                <div className="text-blue-400 font-bold text-lg">
                  {applications.filter(app => app.status === 'accepted').length}
                </div>
                <div className="text-xs text-gray-400">Accepted</div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
            {[
              { id: 'applications', label: 'Applications', icon: FileText },
              { id: 'documents', label: 'Documents', icon: Upload },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-green-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === 'applications' && renderApplicationsTab()}
        {activeTab === 'documents' && renderDocumentsTab()}
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Upload Document</h3>
            
            <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center mb-4">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">Drop files here or click to browse</p>
              <p className="text-gray-500 text-sm">PDF, DOC, DOCX up to 10MB</p>
              
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg cursor-pointer mt-4 transition-colors"
              >
                Choose File
              </label>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition-colors"
                disabled={uploadingFile}
              >
                Cancel
              </button>
            </div>

            {uploadingFile && (
              <div className="mt-4 text-center">
                <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-blue-400 text-sm">Uploading...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{selectedApplication.internshipTitle}</h3>
                <p className="text-blue-400 font-medium">{selectedApplication.organization}</p>
                <p className="text-gray-400 text-sm">Application ID: {selectedApplication.applicationId}</p>
              </div>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Status Section */}
            <div className={`rounded-xl p-4 mb-6 ${getStatusColor(selectedApplication.status)}`}>
              <div className="flex items-center space-x-2 mb-2">
                {React.createElement(getStatusIcon(selectedApplication.status), { className: "w-5 h-5" })}
                <span className="font-semibold">{getStatusLabel(selectedApplication.status)}</span>
              </div>
              <p className="text-sm opacity-90">{selectedApplication.statusMessage}</p>
            </div>

            {/* Timeline */}
            <div className="mb-6">
              <h4 className="font-semibold text-white mb-4 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Application Timeline
              </h4>
              <div className="space-y-3">
                {selectedApplication.timeline.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      step.status === 'completed' ? 'bg-green-400' :
                      step.status === 'current' ? 'bg-blue-400' :
                      'bg-gray-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className={`font-medium ${
                        step.status === 'current' ? 'text-blue-400' : 'text-white'
                      }`}>{step.step}</p>
                      <p className="text-gray-400 text-sm">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interview Details (if scheduled) */}
            {selectedApplication.status === 'interview_scheduled' && selectedApplication.interviewDate && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-blue-400 mb-3 flex items-center">
                  <Video className="w-4 h-4 mr-2" />
                  Interview Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date & Time:</span>
                    <span className="text-white font-medium">{formatDate(selectedApplication.interviewDate)} at 10:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white">{selectedApplication.interviewType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">45 minutes</span>
                  </div>
                </div>
              </div>
            )}

            {/* Offer Details (if accepted) */}
            {selectedApplication.status === 'accepted' && selectedApplication.offerDetails && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-green-400 mb-3 flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  Offer Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Start Date:</span>
                    <span className="text-white font-medium">{formatDate(selectedApplication.offerDetails.startDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Reporting Time:</span>
                    <span className="text-white">{selectedApplication.offerDetails.reportingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contact Person:</span>
                    <span className="text-white">{selectedApplication.offerDetails.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contact Email:</span>
                    <span className="text-blue-400">{selectedApplication.offerDetails.contactEmail}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Feedback (if rejected) */}
            {selectedApplication.status === 'rejected' && selectedApplication.feedback && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-red-400 mb-3 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Feedback
                </h4>
                <p className="text-gray-300 text-sm">{selectedApplication.feedback}</p>
              </div>
            )}

            {/* Tips Section */}
            {selectedApplication.tips && selectedApplication.tips.length > 0 && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-yellow-400 mb-3 flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Tips for Success
                </h4>
                <ul className="space-y-1">
                  {selectedApplication.tips.map((tip, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Documents */}
            <div className="mb-6">
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <Paperclip className="w-4 h-4 mr-2" />
                Submitted Documents
              </h4>
              <div className="space-y-2">
                {selectedApplication.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span className="text-white text-sm">{doc}</span>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              {selectedApplication.status === 'interview_scheduled' && (
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <Video className="w-4 h-4" />
                  <span>Join Interview</span>
                </button>
              )}
              
              {selectedApplication.status === 'accepted' && (
                <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Accept Offer</span>
                </button>
              )}
              
              <button
                onClick={() => setSelectedApplication(null)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom spacing */}
      <div className="h-8"></div>
    </div>
  );
};

export default ApplicationManager;

import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  GraduationCap, 
  Users, 
  Heart, 
  Briefcase, 
  Star,
  CheckCircle,
  Mic,
  MicOff
} from 'lucide-react';

const OnboardingQuest = ({ onComplete, onBack }) => {
  // STATE MANAGEMENT - This is the React "brain" that remembers user choices
  const [currentStep, setCurrentStep] = useState(0);
  const [userProfile, setUserProfile] = useState({
    name: '',
    location: '',
    education: '',
    skills: [],
    interests: [],
    preferredLanguage: 'English',
    hasSmartphone: true
  });
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);

  // QUEST STEPS - Each step is an object with title, description, and component type
  const questSteps = [
    {
      id: 'welcome',
      title: 'Welcome Adventurer!',
      subtitle: 'Let\'s start your career quest',
      icon: '🚀',
      progress: 0
    },
    {
      id: 'personal',
      title: 'Tell us about yourself',
      subtitle: 'Basic information to personalize your journey',
      icon: '👋',
      progress: 16
    },
    {
      id: 'location',
      title: 'Where are you from?',
      subtitle: 'Help us find local opportunities',
      icon: '📍',
      progress: 33
    },
    {
      id: 'education',
      title: 'Your Education Level',
      subtitle: 'Match you with suitable programs',
      icon: '🎓',
      progress: 50
    },
    {
      id: 'skills',
      title: 'Your Superpowers',
      subtitle: 'Select your current skills',
      icon: '⚡',
      progress: 66
    },
    {
      id: 'interests',
      title: 'What excites you?',
      subtitle: 'Choose your career interests',
      icon: '💡',
      progress: 83
    },
    {
      id: 'complete',
      title: 'Quest Complete!',
      subtitle: 'Your profile is ready',
      icon: '🎉',
      progress: 100
    }
  ];

  // MOCK DATA for dropdowns and selections
  const indianStates = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const educationLevels = [
    { value: '10th', label: '10th Pass', icon: '📚' },
    { value: '12th', label: '12th Pass', icon: '🎒' },
    { value: 'diploma', label: 'Diploma', icon: '📜' },
    { value: 'undergraduate', label: 'Undergraduate', icon: '🎓' },
    { value: 'graduate', label: 'Graduate', icon: '🏆' }
  ];

  const skillsList = [
    { id: 'communication', label: 'Communication', icon: '💬', category: 'soft' },
    { id: 'computer', label: 'Computer Basics', icon: '💻', category: 'technical' },
    { id: 'english', label: 'English', icon: '🇬🇧', category: 'language' },
    { id: 'mathematics', label: 'Mathematics', icon: '🔢', category: 'academic' },
    { id: 'teamwork', label: 'Teamwork', icon: '🤝', category: 'soft' },
    { id: 'leadership', label: 'Leadership', icon: '👑', category: 'soft' },
    { id: 'coding', label: 'Programming', icon: '⌨️', category: 'technical' },
    { id: 'design', label: 'Design', icon: '🎨', category: 'creative' }
  ];

  const interestsList = [
    { id: 'technology', label: 'Technology', icon: '💻', color: 'blue' },
    { id: 'government', label: 'Government', icon: '🏛️', color: 'green' },
    { id: 'healthcare', label: 'Healthcare', icon: '🏥', color: 'red' },
    { id: 'education', label: 'Education', icon: '📚', color: 'purple' },
    { id: 'finance', label: 'Finance', icon: '💰', color: 'yellow' },
    { id: 'research', label: 'Research', icon: '🔬', color: 'cyan' },
    { id: 'social', label: 'Social Work', icon: '🤲', color: 'pink' },
    { id: 'environment', label: 'Environment', icon: '🌱', color: 'emerald' }
  ];

  // EVENT HANDLERS - Functions that handle user interactions
  const updateProfile = (field, value) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skillId) => {
    setUserProfile(prev => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter(s => s !== skillId)
        : [...prev.skills, skillId]
    }));
  };

  const toggleInterest = (interestId) => {
    setUserProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(i => i !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const nextStep = () => {
    if (currentStep < questSteps.length - 1) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    console.log('Voice toggle:', !isVoiceActive);
  };

  const handleComplete = () => {
  console.log('Onboarding completed with profile:', userProfile);
  if (onComplete) {
    onComplete(userProfile); // Pass user data to parent
  } else {
    alert('🎉 Congratulations! Your quest is complete!');
  }
};
  // VALIDATION FUNCTIONS
  const isStepValid = () => {
    switch (currentStep) {
      case 1: return userProfile.name.trim().length > 0;
      case 2: return userProfile.location.trim().length > 0;
      case 3: return userProfile.education.trim().length > 0;
      case 4: return userProfile.skills.length > 0;
      case 5: return userProfile.interests.length > 0;
      default: return true;
    }
  };

  // RENDER STEP CONTENT - Each step has different UI
  const renderStepContent = () => {
    const step = questSteps[currentStep];

    switch (step.id) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <div className="text-8xl mb-6">{step.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-4">{step.title}</h2>
            <p className="text-xl text-gray-300 max-w-md mx-auto leading-relaxed">
              Ready to discover amazing internship opportunities? Let's build your profile in just 6 steps!
            </p>
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-xl p-6 mt-8">
              <p className="text-green-400 font-semibold">🎯 What you'll get:</p>
              <ul className="text-gray-300 mt-3 space-y-2 text-left">
                <li>• Personalized internship matches</li>
                <li>• Skill gap analysis & learning paths</li>
                <li>• Direct mentor connections</li>
                <li>• Application tracking & support</li>
              </ul>
            </div>
          </div>
        );

      case 'personal':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-2">{step.title}</h2>
              <p className="text-gray-400">{step.subtitle}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 font-medium mb-2">What should we call you? 👋</label>
                <input
                  type="text"
                  placeholder="Enter your name (e.g., Priya, Rahul, Amit)"
                  value={userProfile.name}
                  onChange={(e) => updateProfile('name', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors text-lg"
                />
              </div>

              {userProfile.name && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                  <p className="text-green-400">Nice to meet you, {userProfile.name}! 🌟</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-2">{step.title}</h2>
              <p className="text-gray-400">{step.subtitle}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Select your state 📍</label>
                <select
                  value={userProfile.location}
                  onChange={(e) => updateProfile('location', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:border-green-500 focus:outline-none transition-colors text-lg"
                >
                  <option value="">Choose your state</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {userProfile.location && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
                  <MapPin className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                  <p className="text-blue-400">Great! We'll find opportunities in {userProfile.location} 🎯</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-2">{step.title}</h2>
              <p className="text-gray-400">{step.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {educationLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => updateProfile('education', level.value)}
                  className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                    userProfile.education === level.value
                      ? 'border-green-500 bg-green-500/10 text-green-400'
                      : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <span className="text-2xl">{level.icon}</span>
                  <span className="font-medium text-lg">{level.label}</span>
                  {userProfile.education === level.value && (
                    <CheckCircle className="w-5 h-5 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-2">{step.title}</h2>
              <p className="text-gray-400">{step.subtitle}</p>
              <p className="text-sm text-green-400 mt-2">Select at least one skill</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {skillsList.map((skill) => (
                <button
                  key={skill.id}
                  onClick={() => toggleSkill(skill.id)}
                  className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-300 ${
                    userProfile.skills.includes(skill.id)
                      ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                      : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <span className="text-xl">{skill.icon}</span>
                  <span className="font-medium text-sm">{skill.label}</span>
                  {userProfile.skills.includes(skill.id) && (
                    <CheckCircle className="w-4 h-4 ml-auto" />
                  )}
                </button>
              ))}
            </div>

            {userProfile.skills.length > 0 && (
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
                <p className="text-purple-400">
                  Awesome! You have {userProfile.skills.length} skill{userProfile.skills.length !== 1 ? 's' : ''} selected ⚡
                </p>
              </div>
            )}
          </div>
        );

      case 'interests':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-2">{step.title}</h2>
              <p className="text-gray-400">{step.subtitle}</p>
              <p className="text-sm text-green-400 mt-2">Choose what motivates you</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {interestsList.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-300 ${
                    userProfile.interests.includes(interest.id)
                      ? `border-${interest.color}-500 bg-${interest.color}-500/10 text-${interest.color}-400`
                      : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <span className="text-xl">{interest.icon}</span>
                  <span className="font-medium text-sm">{interest.label}</span>
                  {userProfile.interests.includes(interest.id) && (
                    <CheckCircle className="w-4 h-4 ml-auto" />
                  )}
                </button>
              ))}
            </div>

            {userProfile.interests.length > 0 && (
              <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-xl p-4 text-center">
                <Heart className="w-5 h-5 text-pink-400 mx-auto mb-2" />
                <p className="text-pink-400">
                  Perfect! You're interested in {userProfile.interests.length} area{userProfile.interests.length !== 1 ? 's' : ''} 💖
                </p>
              </div>
            )}
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="text-8xl mb-6">{step.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-4">{step.title}</h2>
            <p className="text-xl text-gray-300 max-w-md mx-auto leading-relaxed">
              Congratulations {userProfile.name}! Your profile is ready and we're finding the perfect internships for you.
            </p>

            {/* Profile Summary */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-6 text-left space-y-3">
              <h3 className="text-lg font-semibold text-green-400 text-center mb-4">Your Quest Summary 📋</h3>
              <div className="space-y-2 text-gray-300">
                <p><span className="text-green-400">Name:</span> {userProfile.name}</p>
                <p><span className="text-blue-400">Location:</span> {userProfile.location}</p>
                <p><span className="text-purple-400">Education:</span> {userProfile.education}</p>
                <p><span className="text-yellow-400">Skills:</span> {userProfile.skills.length} selected</p>
                <p><span className="text-pink-400">Interests:</span> {userProfile.interests.length} areas</p>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <p className="text-yellow-400 font-semibold">🎯 Next Steps:</p>
              <p className="text-gray-300 mt-2">
                We'll now match you with relevant internships and connect you with mentors in your field!
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Progress Header */}
      <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4">
          {/* Progress Bar */}
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-sm text-gray-400">Quest Progress</span>
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 rounded-full h-2 transition-all duration-500"
                style={{ width: `${questSteps[currentStep].progress}%` }}
              ></div>
            </div>
            <span className="text-sm text-green-400 font-semibold">
              {questSteps[currentStep].progress}%
            </span>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center space-x-2">
            {questSteps.map((step, index) => (
              <div
                key={step.id}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-green-500 scale-125'
                    : completedSteps.includes(index)
                    ? 'bg-blue-500'
                    : 'bg-gray-600'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
          {renderStepContent()}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Back Button */}
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              currentStep === 0
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          {/* Voice Button */}
          <button
            onClick={toggleVoice}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isVoiceActive 
                ? 'bg-red-500 shadow-lg shadow-red-500/50' 
                : 'bg-blue-500 hover:bg-blue-400 shadow-lg shadow-blue-500/50'
            }`}
          >
            {isVoiceActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Next/Complete Button */}
          {currentStep === questSteps.length - 1 ? (
            <button
              onClick={handleComplete}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <span>Complete Quest</span>
              <Star className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={!isStepValid()}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform ${
                isStepValid()
                  ? 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white hover:scale-105'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Need help? Try voice navigation or contact our support team 🎤
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingQuest;
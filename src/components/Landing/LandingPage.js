import React, { useState, useEffect } from 'react';
import { Mic, Globe, ArrowRight, Target, Users, BookOpen, Shield, Play, CheckCircle, Zap, Clock, Volume2 } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [currentStep, setCurrentStep] = useState(0);
  const [isVoiceAnimating, setIsVoiceAnimating] = useState(false);

  // Auto-rotate how it works steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStartJourney = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      console.error('onGetStarted prop not provided to LandingPage');
    }
  };

  const handleVoiceDemo = () => {
    setIsVoiceAnimating(true);
    setTimeout(() => setIsVoiceAnimating(false), 2000);
    // Here you could integrate actual voice recognition
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowLanguageModal(false);
  };

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'ur', name: 'Urdu', native: 'اردو' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'as', name: 'Assamese', native: 'অসমীয়া' }
  ];

  const howItWorksSteps = [
    {
      step: 1,
      title: "Tell us about you",
      subtitle: "आप के बारे में बताएं",
      description: "Simple quest-style onboarding in your language",
      icon: "👋",
      color: "green"
    },
    {
      step: 2,
      title: "Get top matches instantly",
      subtitle: "तुरंत मिलें बेहतरीन मैच",
      description: "AI finds 3-5 perfect internship opportunities for you",
      icon: "🎯",
      color: "blue"
    },
    {
      step: 3,
      title: "Apply & get mentored",
      subtitle: "आवेदन करें और मार्गदर्शन पाएं",
      description: "One-click apply with mentor support throughout",
      icon: "🤝",
      color: "purple"
    }
  ];

  const whyPragatiStats = [
    { stat: "3x Faster", description: "to your first internship", icon: "⚡" },
    { stat: "8+ Languages", description: "Regional language support", icon: "🗣️" },
    { stat: "1-Click Apply", description: "Voice enabled applications", icon: "👆" },
    { stat: "500+ Mentors", description: "Industry experts ready to help", icon: "👥" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 md:p-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">PragatiPath</h1>
            <p className="text-sm text-gray-400">PM Internship Scheme</p>
          </div>
        </div>

        <button
          onClick={() => setShowLanguageModal(true)}
          className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm">{selectedLanguage}</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Government Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium">
            <Shield className="w-4 h-4 mr-2" />
            Government of India Initiative
          </div>
        </div>

        {/* Enhanced Hero Section */}
        <div className="text-center mb-16">
          {/* Main Tagline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Find Your Perfect Internship
            </span>
            <br />
            <span className="text-white text-3xl md:text-4xl">Powered by AI. Tailored for You.</span>
          </h1>
          
          {/* Hindi Translation */}
          <p className="text-lg text-green-400 mb-6 font-medium">
            आपके लिए, आपके जैसे छात्रों के द्वारा
          </p>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            AI-powered career guidance platform connecting rural and first-generation learners to 
            government internship opportunities. Equal opportunities for every Indian youth.
          </p>

          {/* Enhanced Statistics */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">10K+</div>
              <div className="text-gray-400">Internships</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-gray-400">Mentors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">12</div>
              <div className="text-gray-400">Languages</div>
            </div>
          </div>
        </div>

        {/* How It Works - Visual Steps Carousel */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-white">How It </span>
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Works</span>
          </h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Step indicators */}
            <div className="flex justify-center space-x-4 mb-8">
              {howItWorksSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    currentStep === index ? 'bg-green-500 scale-150' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            {/* Current Step Display */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 text-center border border-gray-600">
              <div className="text-6xl mb-4">{howItWorksSteps[currentStep].icon}</div>
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full mb-4 ${
                currentStep === 0 ? 'bg-green-500' : currentStep === 1 ? 'bg-blue-500' : 'bg-purple-500'
              }`}>
                <span className="text-white font-bold text-sm">{howItWorksSteps[currentStep].step}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{howItWorksSteps[currentStep].title}</h3>
              <p className="text-lg text-gray-300 mb-4">{howItWorksSteps[currentStep].subtitle}</p>
              <p className="text-gray-400 max-w-md mx-auto">{howItWorksSteps[currentStep].description}</p>
            </div>
          </div>
        </div>

        {/* Why PragatiPath - Enhanced Stats */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-white">Why </span>
            <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">PragatiPath?</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {whyPragatiStats.map((item, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700 hover:border-green-500 transition-colors">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-xl font-bold text-green-400 mb-2">{item.stat}</div>
                <div className="text-sm text-gray-400">{item.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Voice Navigation Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">Voice-First Experience</h3>
          <p className="text-lg text-gray-300 mb-6">Try voice navigation - speak in your language!</p>
          
          <div className="flex justify-center items-center space-x-6">
            {/* Animated Microphone Button */}
            <button 
              onClick={handleVoiceDemo}
              className="relative w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
            >
              <Mic className="w-8 h-8 text-white" />
              {/* Enhanced pulsing animation */}
              <div className={`absolute inset-0 rounded-full bg-green-500 opacity-20 ${isVoiceAnimating ? 'animate-ping' : ''}`}></div>
              <div className={`absolute inset-0 rounded-full bg-green-500 opacity-10 ${isVoiceAnimating ? 'animate-ping' : ''}`} style={{animationDelay: '0.5s'}}></div>
            </button>

            {/* Voice Demo Button */}
            <button
              onClick={handleVoiceDemo}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition-colors"
            >
              <Volume2 className="w-5 h-5" />
              <span>Try Voice Search</span>
            </button>
          </div>

          {/* Voice Animation Feedback */}
          {isVoiceAnimating && (
            <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-xl p-4 max-w-md mx-auto">
              <p className="text-green-400 font-semibold">🎤 Listening...</p>
              <p className="text-gray-300 text-sm mt-1">Try saying "Find internships in technology"</p>
            </div>
          )}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mb-16">
          <div className="max-w-md mx-auto space-y-4">
            <button
              onClick={handleStartJourney}
              className="group w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 hover:from-green-600 hover:via-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2"
            >
              <Mic className="w-5 h-5" />
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-gray-400 text-sm">Free • No registration required • Voice enabled</p>
          </div>
        </div>

        {/* Features Grid - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 p-8 rounded-2xl text-center hover:bg-gray-750 transition-colors border border-gray-700 hover:border-green-500">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Smart Matching</h3>
            <p className="text-gray-400">AI finds 3-5 perfect internship matches based on your profile</p>
            <div className="mt-4 flex justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-2xl text-center hover:bg-gray-750 transition-colors border border-gray-700 hover:border-blue-500">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Expert Mentorship</h3>
            <p className="text-gray-400">Connect with industry mentors for guidance and support</p>
            <div className="mt-4 flex justify-center">
              <CheckCircle className="w-5 h-5 text-blue-400" />
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-2xl text-center hover:bg-gray-750 transition-colors border border-gray-700 hover:border-purple-500">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Skill Development</h3>
            <p className="text-gray-400">Identify gaps and get personalized learning paths</p>
            <div className="mt-4 flex justify-center">
              <CheckCircle className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Accessibility Strip */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 text-center border border-gray-600">
          <p className="text-gray-300 text-sm">
            <span className="text-green-400 font-semibold">✓ Works on any smartphone</span> • 
            <span className="text-blue-400 font-semibold"> No jargon</span> • 
            <span className="text-purple-400 font-semibold"> Voice and language support for everyone</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Designed for first-generation learners • Rural-friendly • Low data usage
          </p>
        </div>
      </main>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full max-h-96 overflow-y-auto">
            <h3 className="text-xl font-bold mb-6 text-center">Choose Your Language</h3>
            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.name)}
                  className={`p-3 rounded-lg text-left transition-colors ${
                    selectedLanguage === lang.name 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  <div className="font-medium">{lang.name}</div>
                  <div className="text-sm opacity-75">{lang.native}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowLanguageModal(false)}
              className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
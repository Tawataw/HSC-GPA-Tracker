/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './store/AppContext';
import { GPADashboard } from './components/GPADashboard';
import { SubjectResultTable } from './components/SubjectResultTable';
import { TargetGPAAnalyzer } from './components/TargetGPAAnalyzer';
import { VisualAnalytics } from './components/VisualAnalytics';
import { PaperInputCard } from './components/PaperInputCard';
import { SUBJECT_CONFIGS } from './config';
import { GraduationCap, Share2, Settings, Download, Calculator, BookOpen, BarChart3, AlertCircle, Cloud, CloudOff, RefreshCw, LogOut } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/Card';
import { initAuth, googleSignIn, logout } from './lib/auth';
import { saveToDrive, loadFromDrive } from './lib/drive';
import type { User } from 'firebase/auth';

function MainApp() {
  const { result, resetData, activeScenario, state, setActiveScenario, loadFromSync } = useAppContext();
  const [activeTab, setActiveTab] = useState<'calculator' | 'analytics' | 'rules'>('calculator');
  const [needsAuth, setNeedsAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => {
        setUser(user);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleSyncToDrive = async () => {
    if (needsAuth) {
      await handleLogin();
      return;
    }
    
    setIsSyncing(true);
    try {
      await saveToDrive(state);
      alert('Successfully saved scenarios to Google Drive!');
    } catch (err) {
      console.error('Failed to save to Drive:', err);
      alert('Failed to save to Drive. Please try logging in again.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLoadFromDrive = async () => {
    if (needsAuth) {
      await handleLogin();
      return;
    }

    setIsSyncing(true);
    try {
      const data = await loadFromDrive();
      if (data && data.scenarios) {
        if (window.confirm('This will overwrite your current marks with the data from Google Drive. Are you sure?')) {
          loadFromSync(data);
          alert('Successfully loaded scenarios from Google Drive!');
        }
      } else {
        alert('No saved data found in Google Drive.');
      }
    } catch (err) {
      console.error('Failed to load from Drive:', err);
      alert('Failed to load from Drive. Please try logging in again.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleShare = async () => {
    const text = `HSC GPA ANALYZER BD\n\nExpected GPA: ${result.finalGpa.toFixed(2)} / 5.00\nTotal Marks: ${result.totalMarks} / 1300\nPercentage: ${result.overallPercentage.toFixed(2)}%\nStatus: ${result.isPass ? 'PASS' : 'FAIL'}\n\nGenerated via HSC GPA Analyzer BD`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My HSC Expected Result',
          text: text,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('Result copied to clipboard!');
    }
  };

  return (
    <div className={`min-h-screen bg-[#0c0e14] font-sans text-white selection:bg-indigo-500/30 transition-colors duration-200 pb-12 overflow-hidden relative flex flex-col`}>
      {/* Background Blobs */}
      <div className="fixed top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed top-[20%] right-[10%] w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white hidden sm:block italic">
              NEBULA <span className="text-indigo-400 not-italic">BD</span>
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center mr-2 bg-white/5 p-1 rounded-xl border border-white/10">
              {Object.keys(state.scenarios).map(id => (
                <button
                  key={id}
                  onClick={() => setActiveScenario(id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    state.activeScenarioId === id 
                      ? 'bg-white/10 text-indigo-300 shadow-sm border border-white/5' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {state.scenarios[id].name}
                </button>
              ))}
            </div>
            
            {needsAuth ? (
              <button onClick={handleLogin} className="p-2 text-white/60 hover:text-blue-300 hover:bg-white/5 transition-colors bg-white/5 rounded-xl shadow-sm border border-white/10 flex items-center gap-2 text-sm font-medium" title="Sign in with Google">
                <CloudOff className="w-5 h-5" />
                <span className="hidden lg:block">Sign In</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleLoadFromDrive} 
                  disabled={isSyncing}
                  className="p-2 text-white/60 hover:text-green-300 hover:bg-white/5 transition-colors bg-white/5 rounded-xl shadow-sm border border-white/10 disabled:opacity-50" 
                  title="Load from Drive"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleSyncToDrive} 
                  disabled={isSyncing}
                  className="p-2 text-white/60 hover:text-blue-300 hover:bg-white/5 transition-colors bg-white/5 rounded-xl shadow-sm border border-white/10 disabled:opacity-50" 
                  title="Save to Drive"
                >
                  {isSyncing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Cloud className="w-5 h-5" />}
                </button>
                <button 
                  onClick={handleLogout} 
                  className="p-2 text-white/60 hover:text-red-400 hover:bg-white/5 transition-colors bg-white/5 rounded-xl shadow-sm border border-white/10" 
                  title="Sign out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
            
            <button onClick={handleShare} className="p-2 text-white/60 hover:text-indigo-300 hover:bg-white/5 transition-colors bg-white/5 rounded-xl shadow-sm border border-white/10">
              <Share2 className="w-5 h-5" />
            </button>
            <button onClick={resetData} className="p-2 text-white/60 hover:text-red-400 hover:bg-white/5 transition-colors bg-white/5 rounded-xl shadow-sm border border-white/10" title="Reset All Data">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {activeTab === 'calculator' && (
        <div className="bg-white/5 border-b border-white/10 backdrop-blur-md text-white py-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-3xl md:text-5xl font-light mb-4">
              Know Your <span className="font-semibold italic">Expected HSC Result</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
              Enter your CQ, MCQ, and Practical marks to instantly calculate your subject-wise grades, total marks, and accurate final GPA.
            </p>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 -mt-6">
        {activeTab === 'calculator' && (
          <div className="relative z-20">
            <GPADashboard />
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-px overflow-x-auto hide-scrollbar z-10 relative">
          <button 
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-5 py-3 font-medium text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === 'calculator' ? 'border-indigo-400 text-indigo-300 bg-white/5' : 'border-transparent text-white/50 hover:text-white/80 hover:bg-white/5'}`}
          >
            <Calculator className="w-4 h-4" /> Marks Entry
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-5 py-3 font-medium text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === 'analytics' ? 'border-indigo-400 text-indigo-300 bg-white/5' : 'border-transparent text-white/50 hover:text-white/80 hover:bg-white/5'}`}
          >
            <BarChart3 className="w-4 h-4" /> Performance Analytics
          </button>
          <button 
            onClick={() => setActiveTab('rules')}
            className={`flex items-center gap-2 px-5 py-3 font-medium text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === 'rules' ? 'border-indigo-400 text-indigo-300 bg-white/5' : 'border-transparent text-white/50 hover:text-white/80 hover:bg-white/5'}`}
          >
            <BookOpen className="w-4 h-4" /> How It Works
          </button>
        </div>

        {activeTab === 'calculator' && (
          <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500 z-10 relative">
            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SUBJECT_CONFIGS.map(subject => (
                <div key={subject.id} className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                    <h3 className="font-semibold text-xl text-white tracking-tight">{subject.name}</h3>
                    {subject.id === activeScenario.optionalSubject && (
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">
                        Optional
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-4 h-full">
                    {subject.papers.map(paper => (
                      <PaperInputCard key={paper.id} paper={paper} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <SubjectResultTable />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mt-4 z-10 relative">
            <TargetGPAAnalyzer />
            <VisualAnalytics />
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-4 z-10 relative">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <AlertCircle className="w-6 h-6 text-indigo-400" />
                  Calculation Rules (HSC Science)
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none text-base text-white/60">
                <ul className="space-y-4">
                  <li><strong>Subject Combination:</strong> For two-paper subjects (Bangla, English, Physics, Chemistry, Biology, Higher Math), the marks from the 1st and 2nd papers are added together out of 200.</li>
                  <li><strong>Subject Grading:</strong> The combined total out of 200 determines the subject grade and GPA. You do NOT get separate GPAs for 1st and 2nd papers.</li>
                  <li><strong>ICT Grading:</strong> ICT is out of 100. It is internally converted to a 200-mark equivalent scale to apply the standard grading boundaries.</li>
                  <li><strong>Optional Subject Bonus:</strong> The 4th (optional) subject provides a bonus to your total GPA. The formula is <code className="bg-white/10 border border-white/10 px-1 py-0.5 rounded text-indigo-300 font-bold">Bonus = Optional GPA - 2.00</code>. If the result is negative, the bonus is 0.</li>
                  <li><strong>Final GPA Formula:</strong> The final GPA is calculated by summing the GPAs of the 6 main subjects, adding the optional bonus, and dividing by 6. The result is capped at 5.00.</li>
                  <li><strong>Pass/Fail:</strong> If you receive a GPA of 0.00 (Grade F) in any of the 6 main subjects, your overall result will be a FAIL, regardless of your total marks.</li>
                </ul>
                <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h4 className="font-semibold text-white mb-4 text-lg">Grading Boundaries (Out of 200)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-medium text-sm">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex justify-between"><span>160–200</span><span className="text-green-400 font-bold">A+ (5.00)</span></div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex justify-between"><span>140–159</span><span className="text-white/90 font-bold">A (4.00)</span></div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex justify-between"><span>120–139</span><span className="text-white/90 font-bold">A- (3.50)</span></div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex justify-between"><span>100–119</span><span className="text-white/90 font-bold">B (3.00)</span></div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex justify-between"><span>80–99</span><span className="text-white/90 font-bold">C (2.00)</span></div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex justify-between"><span>66–79</span><span className="text-white/90 font-bold">D (1.00)</span></div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex justify-between text-red-400"><span>0–65</span><span className="font-bold">F (0.00)</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

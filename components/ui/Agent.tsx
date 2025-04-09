"use client"

import React, { useState } from 'react';
import { Mic, MicOff, Phone, PhoneOff, User, UserRound } from 'lucide-react';

function App() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [transcripts, setTranscripts] = useState({
    interviewer: [],
    candidate: []
  });

  const toggleCall = () => {
    setIsCallActive(!isCallActive);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800  p-4">
        <h1 className="text-2xl font-bold text-center">Voice Interview Session</h1>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Interviewer */}
          <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center h-[60vh] justify-around">
            <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <UserRound className="w-16 h-16" />
            </div>
            <div className="flex items-center space-x-2">
              {isMuted ? <MicOff className="text-red-500" /> : <Mic className="text-green-500" />}
            </div>
          </div>

          {/* Candidate */}
          <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center  h-[60vh] justify-around">
            <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <User className="w-16 h-16" />
            </div>
            <div className="flex items-center space-x-2">
              {isMuted ? <MicOff className="text-red-500" /> : <Mic className="text-green-500" />}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={toggleMute}
            className={`p-4 rounded-full ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
              } transition-colors`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          <button
            onClick={toggleCall}
            className={`p-4 rounded-full ${isCallActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } transition-colors`}
          >
            {isCallActive ? <PhoneOff className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
          </button>
        </div>


        {/* <div className="grid md:grid-cols-2 gap-8">
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Interviewer Transcript</h3>
            <div className="h-64 overflow-y-auto bg-gray-700 rounded-lg p-4">
              <p className="text-gray-300">
                "Hello, thank you for joining us today. Could you tell us about your background?"
              </p>
              <p className="text-gray-300 mt-4">
                "That's interesting. Could you elaborate on your experience with React?"
              </p>
            </div>
          </div>


        </div> */}
      </main>
    </div>
  );
}

export default App;
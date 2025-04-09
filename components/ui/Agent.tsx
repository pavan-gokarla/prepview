"use client";

import React, { useState } from "react";
import { Mic, MicOff, Phone, PhoneOff } from "lucide-react";

function App() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState(false);
  const [isCandidateSpeaking, setIsCandidateSpeaking] = useState(false);

  const toggleCall = () => {
    setIsCallActive(!isCallActive);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <header className="bg-gray-800/70 backdrop-blur-md shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-400">
          Voice Interview Session
        </h1>
      </header>

      <main className="container mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          {/* Interviewer */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center h-[60vh] justify-center">
            <div
              className={`relative w-32 h-32 rounded-full flex items-center justify-center mb-6 transition-all ${isInterviewerSpeaking ? "animate-pulse" : ""
                }`}
            >
              {/* Pulsing effect */}
              {isInterviewerSpeaking && (
                <div className="absolute inset-0 rounded-full bg-indigo-500 opacity-50 blur-lg"></div>
              )}
              {/* Avatar */}
              <img
                src="/path-to-interviewer-image.jpg"
                alt="Interviewer"
                className="w-full h-full rounded-full object-cover z-10"
              />
            </div>
            <button
              onClick={() => setIsInterviewerSpeaking(!isInterviewerSpeaking)}
              className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg"
            >
              Toggle Speaking (Interviewer)
            </button>
          </div>

          {/* Candidate */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center h-[60vh] justify-center">
            <div
              className={`relative w-32 h-32 rounded-full flex items-center justify-center mb-6 transition-all ${isCandidateSpeaking ? "animate-pulse" : ""
                }`}
            >
              {/* Pulsing effect */}
              {isCandidateSpeaking && (
                <div className="absolute inset-0 rounded-full bg-indigo-500 opacity-50 blur-lg"></div>
              )}
              {/* Avatar */}
              <img
                src="/path-to-candidate-image.jpg"
                alt="Candidate"
                className="w-full h-full rounded-full object-cover z-10"
              />
            </div>
            <button
              onClick={() => setIsCandidateSpeaking(!isCandidateSpeaking)}
              className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg"
            >
              Toggle Speaking (Candidate)
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-6">
          <button
            onClick={toggleMute}
            className={`p-5 rounded-full shadow-lg transition-colors ${isMuted
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-700 hover:bg-gray-600"
              }`}
          >
            {isMuted ? (
              <MicOff className="w-8 h-8 text-gray-100" />
            ) : (
              <Mic className="w-8 h-8 text-gray-100" />
            )}
          </button>
          <button
            onClick={toggleCall}
            className={`p-5 rounded-full shadow-lg transition-colors ${isCallActive
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
              }`}
          >
            {isCallActive ? (
              <PhoneOff className="w-8 h-8 text-gray-100" />
            ) : (
              <Phone className="w-8 h-8 text-gray-100" />
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
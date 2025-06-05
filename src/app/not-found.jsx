"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Home, ArrowLeft, RefreshCw } from "lucide-react";

export default function NotFound() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [countDown, setCountDown] = useState(10);

  useEffect(() => {
    // Start animation immediately
    setTimeout(() => setAnimationComplete(true), 1000);
    
    // Countdown timer for auto-redirect
    const timer = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-6 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-lg w-full">
        {/* Animated error code */}
        <div className="relative mb-8">
          <h1 className={`text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-2 transition-all duration-1000 ${
            animationComplete ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            404
          </h1>
          
          {/* Glitch effect decorations */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-12 bg-blue-500/20 blur-xl -z-10 rotate-3"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-12 bg-pink-500/20 blur-xl -z-10 -rotate-2"></div>
        </div>
        
        {/* Message */}
        <div className={`space-y-4 transition-all duration-1000 delay-300 ${
          animationComplete ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
        }`}>
          <h2 className="text-3xl font-bold text-gray-800">Page Not Found</h2>
          
          <p className="text-gray-600 text-lg">
            The page you're looking for has vanished into the digital void.
          </p>
          
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto my-4"></div>
          
          <p className="text-sm text-gray-500">
            Redirecting to home in <span className="font-mono font-bold text-purple-600">{countDown}</span> seconds
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/" className="w-full sm:w-auto">
              <Button 
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center gap-2 px-6 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                <Home className="w-5 h-5" />
                Return Home
              </Button>
            </Link>
            
            <Button 
              className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center gap-2 px-6 py-6 rounded-xl border border-gray-300 shadow hover:shadow-md transition-all duration-300"
              onClick={() => window.history.back()}
              variant="outline"
              size="lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
      
      {/* Error trace - design element */}
      <div className={`mt-16 max-w-md w-full font-mono text-xs text-gray-500 bg-gray-100 p-4 rounded-lg border border-gray-200 transition-all duration-1000 delay-500 ${
        animationComplete ? "opacity-70 transform-none" : "opacity-0 translate-y-10"
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold">Error Trace</span>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="animate-typing">
            <span className="text-purple-600">&gt;</span> ERROR: Route not found<br/>
            <span className="text-purple-600">&gt;</span> LOCATION: {typeof window !== 'undefined' ? window.location.pathname : '/unknown'}<br/>
            <span className="text-purple-600">&gt;</span> STATUS: 404<br/>
            <span className="text-purple-600">&gt;</span> Initializing redirect sequence...
          </div>
        </div>
      </div>
    </div>
  );
}
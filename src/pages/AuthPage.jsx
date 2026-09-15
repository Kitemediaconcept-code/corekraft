import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';

export default function AuthPage({ onLoginSuccess }) {
  const [view, setView] = useState('login'); // 'login' or 'signup'
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState(null);

  // Password strength logic
  const calculateStrength = (pwd) => {
    let score = 0;
    if (pwd.length > 5) score += 1;
    if (pwd.length > 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const strengthScore = calculateStrength(password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
  const strengthColors = ['bg-red-500', 'bg-red-400', 'bg-amber-400', 'bg-blue-400', 'bg-emerald-400', 'bg-emerald-500'];

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    setError(null);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1200);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!acceptTerms) {
      setError('You must accept the Terms & Conditions.');
      return;
    }
    setError(null);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1200);
  };

  // Switch between views and reset errors
  const switchView = (newView) => {
    setView(newView);
    setError(null);
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#FFF5F8] to-white flex items-center justify-center p-4 lg:p-8 animate-fade-in relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#000000]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-[440px] bg-white/70 backdrop-blur-2xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[32px] overflow-hidden relative z-10 my-8 transition-all duration-500">
        
        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Corekraft" className="h-10 mx-auto mb-6 object-contain" />
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              {view === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h2>
            <p className="text-[14px] text-gray-500 font-medium">
              {view === 'login' ? 'Login to continue shopping' : 'Join us and start shopping'}
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 text-red-600 text-[13px] font-semibold px-4 py-3 rounded-2xl flex items-center gap-2 animate-shake">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {view === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4 animate-fade-in">
              <div>
                <label htmlFor="email" className="block text-[12px] font-bold text-gray-700 mb-1.5 ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-[14px] rounded-2xl focus:ring-2 focus:ring-[#000000]/20 focus:border-[#000000] block px-4 py-3.5 pl-11 transition-all outline-none"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-[12px] font-bold text-gray-700 mb-1.5 ml-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-[14px] rounded-2xl focus:ring-2 focus:ring-[#000000]/20 focus:border-[#000000] block px-4 py-3.5 pl-11 pr-11 transition-all outline-none"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <input id="remember" type="checkbox" className="w-4 h-4 text-[#000000] border-gray-300 rounded focus:ring-[#000000] cursor-pointer" />
                  <label htmlFor="remember" className="text-[13px] font-medium text-gray-600 cursor-pointer select-none">Remember me</label>
                </div>
                <button type="button" className="text-[13px] font-bold text-[#000000] hover:text-[#111111] transition">Forgot Password?</button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#111] hover:bg-[#333] text-white font-bold rounded-2xl text-[15px] px-5 py-4 transition-all mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Login'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4 animate-fade-in">
              <div>
                <label htmlFor="name" className="block text-[12px] font-bold text-gray-700 mb-1.5 ml-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-[14px] rounded-2xl focus:ring-2 focus:ring-[#000000]/20 focus:border-[#000000] block px-4 py-3.5 pl-11 transition-all outline-none"
                    placeholder="Rohan Mehta"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-[12px] font-bold text-gray-700 mb-1.5 ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-[14px] rounded-2xl focus:ring-2 focus:ring-[#000000]/20 focus:border-[#000000] block px-4 py-3.5 pl-11 transition-all outline-none"
                    placeholder="rohan@acme.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-[12px] font-bold text-gray-700 mb-1.5 ml-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Phone size={18} />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-[14px] rounded-2xl focus:ring-2 focus:ring-[#000000]/20 focus:border-[#000000] block px-4 py-3.5 pl-11 transition-all outline-none"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-[12px] font-bold text-gray-700 mb-1.5 ml-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-[14px] rounded-2xl focus:ring-2 focus:ring-[#000000]/20 focus:border-[#000000] block px-4 py-3.5 pl-11 pr-11 transition-all outline-none"
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {password && (
                  <div className="mt-2 ml-1">
                    <div className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden bg-gray-100">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div 
                          key={level} 
                          className={`flex-1 transition-all duration-300 ${strengthScore >= level ? strengthColors[strengthScore] : 'bg-transparent'}`} 
                        ></div>
                      ))}
                    </div>
                    <p className={`text-[10px] font-bold mt-1 text-right ${strengthScore >= 3 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {strengthLabels[strengthScore] || 'Too Weak'}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-[12px] font-bold text-gray-700 mb-1.5 ml-1">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full bg-gray-50/50 border text-gray-900 text-[14px] rounded-2xl focus:ring-2 focus:ring-[#000000]/20 focus:border-[#000000] block px-4 py-3.5 pl-11 pr-11 transition-all outline-none ${confirmPassword && confirmPassword !== password ? 'border-red-300' : 'border-gray-200'}`}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input 
                  id="terms" 
                  type="checkbox" 
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#000000] border-gray-300 rounded focus:ring-[#000000] cursor-pointer" 
                  required
                />
                <label htmlFor="terms" className="text-[12px] font-medium text-gray-600 cursor-pointer select-none leading-tight">
                  I agree to the <a href="#" className="text-[#000000] font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-[#000000] font-bold hover:underline">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#111] hover:bg-[#333] text-white font-bold rounded-2xl text-[15px] px-5 py-4 transition-all mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Create Account'}
              </button>
            </form>
          )}

          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-[11px] font-bold uppercase tracking-widest">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button 
            type="button"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full bg-white border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-800 font-bold rounded-2xl text-[14px] px-5 py-3.5 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              <path d="M1 1h22v22H1z" fill="none"/>
            </svg>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-[13px] font-medium text-gray-600">
            {view === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button"
              onClick={() => switchView(view === 'login' ? 'signup' : 'login')}
              className="text-[#000000] font-bold hover:underline"
            >
              {view === 'login' ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

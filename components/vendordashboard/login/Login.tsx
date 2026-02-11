"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Smartphone } from "lucide-react";

export default function LoginPage() {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [loginMethod, setLoginMethod] = useState<"email" | "mobile">("email");
  const [tooltip, setTooltip] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showTooltip = (message: any, type: any) => {
    setTooltip({ show: true, message, type });
    setTimeout(() => setTooltip({ show: false, message: "", type: "" }), 3000);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateMobile = (mobile: string) => {
    return /^[0-9]{10}$/.test(mobile);
  };

  const detectLoginMethod = (input: string) => {
    if (validateEmail(input)) {
      return "email";
    } else if (validateMobile(input)) {
      return "mobile";
    }
    return null;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!loginInput) {
      showTooltip("Please enter email or mobile number", "error");
      return;
    }

    const detectedMethod = detectLoginMethod(loginInput);

    if (!detectedMethod) {
      showTooltip(
        "Please enter a valid email or 10-digit mobile number",
        "error",
      );
      return;
    }

    if (!password) {
      showTooltip("Please enter your password", "error");
      return;
    }

    setLoginMethod(detectedMethod);
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setShowOtpScreen(true);

      if (detectedMethod === "email") {
        showTooltip(`OTP sent to your email: ${loginInput}`, "otp");
      } else {
        showTooltip(`OTP sent to your mobile: ${loginInput}`, "otp");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    if (otp === "") {
      showTooltip("Please enter OTP", "error");
      return;
    }

    if (otp === "123456") {
      showTooltip("Login successful! Redirecting...", "success");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } else {
      showTooltip("Invalid OTP. Please try again", "error");
    }
  };

  const handleResendOtp = () => {
    if (loginMethod === "email") {
      showTooltip(`OTP resent to your email: ${loginInput}`, "otp");
    } else {
      showTooltip(`OTP resent to your mobile: ${loginInput}`, "otp");
    }
  };

  const getInputPlaceholder = () => {
    return "Email or 10-digit mobile number";
  };

  const getOtpMessage = () => {
    if (loginMethod === "email") {
      return `OTP sent to ${loginInput}`;
    } else {
      return `OTP sent to ${loginInput}`;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {tooltip.show && (
            <div
              className={`fixed top-5 right-5 z-50 px-3 py-2 rounded-lg text-xs font-medium shadow-lg ${
                tooltip.type === "otp"
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : tooltip.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {tooltip.message}
            </div>
          )}

          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#8B6A3E]/10 mb-3">
              {!showOtpScreen ? (
                loginMethod === "email" ? (
                  <Mail className="w-5 h-5 text-[#8B6A3E]" />
                ) : (
                  <Smartphone className="w-5 h-5 text-[#8B6A3E]" />
                )
              ) : (
                <Mail className="w-5 h-5 text-[#8B6A3E]" />
              )}
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {showOtpScreen ? "Verify OTP" : "Sign In"}
            </h2>
            <p className="text-xs text-gray-600">
              {showOtpScreen
                ? getOtpMessage()
                : "Enter your email/mobile and password"}
            </p>
          </div>

          {!showOtpScreen ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email or Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    {loginMethod === "email" ? (
                      <Mail className="h-3.5 w-3.5 text-gray-400" />
                    ) : (
                      <Smartphone className="h-3.5 w-3.5 text-gray-400" />
                    )}
                  </div>
                  <input
                    type="text"
                    value={loginInput}
                    onChange={(e) => {
                      setLoginInput(e.target.value);
                      const method = detectLoginMethod(e.target.value);
                      if (method) {
                        setLoginMethod(method);
                      }
                    }}
                    className="block w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition"
                    placeholder={getInputPlaceholder()}
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {loginInput && detectLoginMethod(loginInput) === "email"
                    ? "✓ Valid email format"
                    : loginInput && detectLoginMethod(loginInput) === "mobile"
                      ? "✓ Valid mobile number"
                      : loginInput
                        ? "✗ Enter valid email or 10-digit mobile"
                        : ""}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Lock className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-8 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-3 w-3 text-[#8B6A3E] focus:ring-[#8B6A3E] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-1.5 text-xs text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href="/vendorsentotp"
                  className="text-xs font-medium text-[#8B6A3E] hover:text-[#755735] transition"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading || !detectLoginMethod(loginInput)}
                className="w-full py-2 px-4 bg-[#8B6A3E] text-white text-sm font-medium rounded-lg hover:bg-[#755735] focus:outline-none focus:ring-1 focus:ring-[#8B6A3E] focus:ring-offset-1 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-1.5 h-3.5 w-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending OTP...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-200 transition text-xs"
                >
                  <span className="flex items-center justify-center text-gray-700 font-medium">
                    <svg className="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                    </svg>
                    Google
                  </span>
                </button>
                <button
                  type="button"
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-200 transition text-xs"
                >
                  <span className="flex items-center justify-center text-gray-700 font-medium">
                    <svg
                      className="w-3.5 h-3.5 mr-1.5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                    </svg>
                    Facebook
                  </span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="text-center py-2">
                {loginMethod === "email" ? (
                  <Mail className="h-8 w-8 text-[#8B6A3E] mx-auto mb-2" />
                ) : (
                  <Smartphone className="h-8 w-8 text-[#8B6A3E] mx-auto mb-2" />
                )}
                <h3 className="text-sm font-medium text-gray-800">
                  Verify {loginMethod === "email" ? "Email" : "Mobile"}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  Enter the 6-digit OTP sent to {loginInput}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))
                  }
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />
              </div>

              <button
                onClick={handleOtpVerify}
                className="w-full py-2 px-4 bg-[#8B6A3E] text-white text-sm font-medium rounded-lg hover:bg-[#755735] focus:outline-none focus:ring-1 focus:ring-[#8B6A3E] focus:ring-offset-1 transition"
              >
                Verify OTP
              </button>

              <p className="text-center text-xs text-gray-600">
                Didn't receive OTP?{" "}
                <button
                  onClick={handleResendOtp}
                  className="text-[#8B6A3E] hover:underline"
                >
                  Resend
                </button>
              </p>

              <button
                onClick={() => setShowOtpScreen(false)}
                className="w-full py-2 px-4 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-200 transition"
              >
                Back to Login
              </button>
            </div>
          )}

          {!showOtpScreen && (
            <div className="mt-5 text-center">
              <p className="text-xs text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/vendorregister"
                  className="font-medium text-[#8B6A3E] hover:text-[#755735] transition"
                >
                  Vendor Sign up
                </Link>
              </p>
            </div>
          )}
        </div>

        {!showOtpScreen && (
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-[#8B6A3E] hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#8B6A3E] hover:underline">
                Privacy
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

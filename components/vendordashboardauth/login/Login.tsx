"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Smartphone, Briefcase } from "lucide-react";

type LoginMethod = "email" | "mobile" | null;
type TooltipType = "otp" | "success" | "error" | "";

interface TooltipState {
  show: boolean;
  message: string;
  type: TooltipType;
}

export default function VendorLoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [loginInput, setLoginInput] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showOtpScreen, setShowOtpScreen] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [loginMethod, setLoginMethod] = useState<LoginMethod>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    show: false,
    message: "",
    type: "",
  });

  const showTooltip = (message: string, type: TooltipType): void => {
    setTooltip({ show: true, message, type });
    setTimeout(() => setTooltip({ show: false, message: "", type: "" }), 3000);
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateMobile = (mobile: string): boolean => {
    return /^[0-9]{10}$/.test(mobile);
  };

  const detectLoginMethod = (input: string): LoginMethod => {
    if (validateEmail(input)) {
      return "email";
    } else if (validateMobile(input)) {
      return "mobile";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
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

  const handleOtpVerify = async (): Promise<void> => {
    if (otp === "") {
      showTooltip("Please enter OTP", "error");
      return;
    }

    if (otp === "123456") {
      showTooltip("Vendor Logged in successfully", "success");
      login("vendor");
      setTimeout(() => {
        router.replace("/vendordashboardpage");
      }, 1000);
    }
  };

  const handleResendOtp = (): void => {
    if (loginMethod === "email") {
      showTooltip(`OTP resent to your email: ${loginInput}`, "otp");
    } else {
      showTooltip(`OTP resent to your mobile: ${loginInput}`, "otp");
    }
  };

  const getInputPlaceholder = (): string => {
    return "Email or 10-digit mobile number";
  };

  const getOtpMessage = (): string => {
    return `OTP sent to ${loginInput}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#8B6A3E]/10 to-[#755735]/10 px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#8B6A3E] flex items-center justify-center">
                <span className="text-white text-xs font-bold">SP</span>
              </div>
              <h1 className="text-base font-semibold text-gray-900">
                Service Portal - Vendor
              </h1>
            </div>
          </div>

          {/* Tooltip */}
          {tooltip.show && (
            <div
              className={`fixed top-5 right-5 z-50 px-4 py-2 rounded-lg text-xs font-medium shadow-lg animate-in slide-in-from-top-2 ${
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

          <div className="p-6">
            <div className="text-center mb-5">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#8B6A3E]/10 mb-3">
                {!showOtpScreen ? (
                  loginMethod === "email" ? (
                    <Mail className="w-5 h-5 text-[#8B6A3E]" />
                  ) : loginMethod === "mobile" ? (
                    <Smartphone className="w-5 h-5 text-[#8B6A3E]" />
                  ) : (
                    <Briefcase className="w-5 h-5 text-[#8B6A3E]" />
                  )
                ) : (
                  <Mail className="w-5 h-5 text-[#8B6A3E]" />
                )}
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {showOtpScreen ? "Verify OTP" : "Vendor Login"}
              </h2>
              <p className="text-xs text-gray-600">
                {showOtpScreen
                  ? getOtpMessage()
                  : "Access your vendor dashboard"}
              </p>
            </div>

            {!showOtpScreen ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email or Mobile Number{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      {loginMethod === "email" ? (
                        <Mail className="h-3.5 w-3.5 text-gray-400" />
                      ) : loginMethod === "mobile" ? (
                        <Smartphone className="h-3.5 w-3.5 text-gray-400" />
                      ) : (
                        <Briefcase className="h-3.5 w-3.5 text-gray-400" />
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
                      className="block w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition bg-white"
                      placeholder={getInputPlaceholder()}
                      required
                    />
                  </div>
                  <p className="text-xs mt-1.5">
                    {loginInput &&
                      detectLoginMethod(loginInput) === "email" && (
                        <span className="text-green-600 flex items-center gap-1">
                          <span className="inline-block w-3 h-3 bg-green-600 rounded-full"></span>
                          Valid email format
                        </span>
                      )}
                    {loginInput &&
                      detectLoginMethod(loginInput) === "mobile" && (
                        <span className="text-green-600 flex items-center gap-1">
                          <span className="inline-block w-3 h-3 bg-green-600 rounded-full"></span>
                          Valid mobile number
                        </span>
                      )}
                    {loginInput && !detectLoginMethod(loginInput) && (
                      <span className="text-red-600 flex items-center gap-1">
                        <span className="inline-block w-3 h-3 bg-red-600 rounded-full"></span>
                        Enter valid email or 10-digit mobile
                      </span>
                    )}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <Lock className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-8 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition bg-white"
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
                      className="h-3.5 w-3.5 text-[#8B6A3E] focus:ring-[#8B6A3E] border-gray-300 rounded"
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
                  className="w-full py-2 px-4 bg-[#8B6A3E] text-white text-sm font-medium rounded-lg hover:bg-[#755735] focus:outline-none focus:ring-2 focus:ring-[#8B6A3E] focus:ring-offset-1 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-3.5 w-3.5 text-white"
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
                    </>
                  ) : (
                    "Vendor Sign In"
                  )}
                </button>

                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
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
                    className="w-full py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-200 transition text-xs flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    className="w-full py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-200 transition text-xs flex items-center justify-center gap-1.5"
                  >
                    <svg
                      className="w-3.5 h-3.5 fill-[#1877F2]"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="text-center py-2">
                  <div className="w-16 h-16 bg-[#8B6A3E]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    {loginMethod === "email" ? (
                      <Mail className="h-6 w-6 text-[#8B6A3E]" />
                    ) : (
                      <Smartphone className="h-6 w-6 text-[#8B6A3E]" />
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-gray-800">
                    Verify {loginMethod === "email" ? "Email" : "Mobile"}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Enter the 6-digit OTP sent to
                  </p>
                  <p className="text-sm font-medium text-[#8B6A3E] mt-0.5">
                    {loginInput}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Enter OTP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))
                    }
                    className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition text-center tracking-widest"
                    placeholder="• • • • • •"
                    maxLength={6}
                    autoFocus
                  />
                </div>

                <button
                  onClick={handleOtpVerify}
                  className="w-full py-2 px-4 bg-[#8B6A3E] text-white text-sm font-medium rounded-lg hover:bg-[#755735] focus:outline-none focus:ring-2 focus:ring-[#8B6A3E] focus:ring-offset-1 transition"
                >
                  Verify OTP
                </button>

                <p className="text-center text-xs text-gray-600">
                  Didn't receive OTP?{" "}
                  <button
                    onClick={handleResendOtp}
                    className="text-[#8B6A3E] font-medium hover:underline"
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
              <div className="mt-5 text-center border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-600">
                  New vendor?{" "}
                  <Link
                    href="/vendorregister"
                    className="font-medium text-[#8B6A3E] hover:text-[#755735] transition"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            )}
          </div>
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
            <p className="text-xs text-gray-400 mt-2">
              © 2024 Service Portal. All rights reserved.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

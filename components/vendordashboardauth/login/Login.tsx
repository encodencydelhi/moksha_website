// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth, USERS } from "@/context/AuthContext";
// import {
//   Mail,
//   KeyRound,
//   Truck,
//   Briefcase,
//   Eye,
//   EyeOff,
//   Smartphone,
// } from "lucide-react";
// import Link from "next/link";

// export default function VendorLoginPage() {
//   const { login } = useAuth();
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [step, setStep] = useState<"email" | "otp">("email");
//   const [otp, setOtp] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<
//     "pandit" | "ambulance" | null
//   >(null);
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [tooltip, setTooltip] = useState({
//     show: false,
//     message: "",
//     type: "",
//   });

//   const showTooltip = (message: string, type: string) => {
//     setTooltip({ show: true, message, type });
//     setTimeout(() => setTooltip({ show: false, message: "", type: "" }), 3000);
//   };

//   const handleSendOtp = () => {
//     if (!email) {
//       showTooltip("Please enter email", "error");
//       return;
//     }

//     setIsLoading(true);

//     setTimeout(() => {
//       if (email === USERS.pandit.email || email === USERS.ambulance.email) {
//         setStep("otp");
//         if (email === USERS.pandit.email) {
//           setSelectedCategory("pandit");
//           showTooltip(`OTP sent to ${email}`, "otp");
//         }
//         if (email === USERS.ambulance.email) {
//           setSelectedCategory("ambulance");
//           showTooltip(`OTP sent to ${email}`, "otp");
//         }
//       } else {
//         showTooltip("Email not registered as vendor", "error");
//       }
//       setIsLoading(false);
//     }, 800);
//   };

//   const handleVerifyOtp = () => {
//     if (otp !== "1234") {
//       showTooltip("Invalid OTP", "error");
//       return;
//     }

//     showTooltip("Vendor logged in successfully", "success");

//     setTimeout(() => {
//       if (email === USERS.pandit.email) {
//         login(USERS.pandit);
//       }
//       if (email === USERS.ambulance.email) {
//         login(USERS.ambulance);
//       }
//       router.push("/vendordashboardpage");
//     }, 1000);
//   };

//   const handleResendOtp = () => {
//     showTooltip(`OTP resent to ${email}`, "otp");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
//           {/* Header - Same as first design */}
//           <div className="bg-gradient-to-r from-[#8B6A3E]/10 to-[#755735]/10 px-6 py-5 border-b border-gray-200">
//             <div className="flex items-center justify-center gap-2">
//               <div className="w-8 h-8 rounded-full bg-[#8B6A3E] flex items-center justify-center">
//                 <span className="text-white text-xs font-bold">SP</span>
//               </div>
//               <h1 className="text-base font-semibold text-gray-900">
//                 Service Portal - Vendor
//               </h1>
//             </div>
//           </div>

//           {/* Tooltip */}
//           {tooltip.show && (
//             <div
//               className={`fixed top-5 right-5 z-50 px-4 py-2 rounded-lg text-xs font-medium shadow-lg animate-in slide-in-from-top-2 ${
//                 tooltip.type === "otp"
//                   ? "bg-blue-50 text-blue-700 border border-blue-200"
//                   : tooltip.type === "success"
//                     ? "bg-green-50 text-green-700 border border-green-200"
//                     : "bg-red-50 text-red-700 border border-red-200"
//               }`}
//             >
//               {tooltip.message}
//             </div>
//           )}

//           <div className="p-8">
//             <div className="text-center mb-6">
//               <h2 className="text-lg font-semibold text-gray-800 mb-1">
//                 {step === "email" ? "Vendor Login" : "Verify OTP"}
//               </h2>
//               <p className="text-xs text-gray-600">
//                 {step === "email"
//                   ? "Access your vendor dashboard"
//                   : `OTP sent to ${email}`}
//               </p>
//             </div>

//             {step === "email" ? (
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   handleSendOtp();
//                 }}
//                 className="space-y-4"
//               >
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-1">
//                     Email Address <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
//                       <Mail className="h-3.5 w-3.5 text-gray-400" />
//                     </div>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="block w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition bg-white"
//                       placeholder="vendor@example.com"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Password Input */}
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-1">
//                     Password <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
//                       <KeyRound className="h-3.5 w-3.5 text-gray-400" />
//                     </div>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="block w-full pl-8 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition bg-white"
//                       placeholder="••••••••"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute inset-y-0 right-0 pr-2.5 flex items-center"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
//                       ) : (
//                         <Eye className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Remember Me & Forgot Password */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id="remember"
//                       checked={rememberMe}
//                       onChange={(e) => setRememberMe(e.target.checked)}
//                       className="h-3.5 w-3.5 text-[#8B6A3E] focus:ring-[#8B6A3E] border-gray-300 rounded"
//                     />
//                     <label
//                       htmlFor="remember"
//                       className="ml-1.5 text-xs text-gray-700"
//                     >
//                       Remember me
//                     </label>
//                   </div>
//                   <Link
//                     href="/vendorsentotp"
//                     className="text-xs font-medium text-[#8B6A3E] hover:text-[#755735] transition"
//                   >
//                     Forgot password?
//                   </Link>
//                 </div>

//                 {/* Demo Credentials */}
//                 <p className="text-xs text-gray-500 text-center bg-gray-50 p-2 rounded-lg">
//                   Demo: pandit@example.com / ambulance@example.com
//                 </p>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={!email || isLoading}
//                   className="w-full py-2 px-4 bg-[#8B6A3E] text-white text-sm font-medium rounded-lg hover:bg-[#755735] focus:outline-none focus:ring-2 focus:ring-[#8B6A3E] focus:ring-offset-1 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {isLoading ? (
//                     <>
//                       <svg
//                         className="animate-spin h-3.5 w-3.5 text-white"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         />
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         />
//                       </svg>
//                       Sending OTP...
//                     </>
//                   ) : (
//                     "Send OTP"
//                   )}
//                 </button>

//                 {/* Social Login */}
//                 <div className="relative my-5">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-gray-200"></div>
//                   </div>
//                   <div className="relative flex justify-center text-xs">
//                     <span className="px-2 bg-white text-gray-500">
//                       Or continue with
//                     </span>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-2">
//                   <button
//                     type="button"
//                     className="w-full py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-200 transition text-xs flex items-center justify-center gap-1.5"
//                   >
//                     <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
//                       <path
//                         fill="#4285F4"
//                         d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                       />
//                     </svg>
//                     Google
//                   </button>
//                   <button
//                     type="button"
//                     className="w-full py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-200 transition text-xs flex items-center justify-center gap-1.5"
//                   >
//                     <svg
//                       className="w-3.5 h-3.5 fill-[#1877F2]"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                     </svg>
//                     Facebook
//                   </button>
//                 </div>
//               </form>
//             ) : (
//               <div className="space-y-4">
//                 {/* OTP Screen */}
//                 <div className="text-center py-2">
//                   <div className="w-16 h-16 bg-[#8B6A3E]/10 rounded-full flex items-center justify-center mx-auto mb-3">
//                     {selectedCategory === "ambulance" ? (
//                       <Truck className="h-6 w-6 text-red-600" />
//                     ) : (
//                       <Briefcase className="h-6 w-6 text-[#8B6A3E]" />
//                     )}
//                   </div>
//                   <h3 className="text-sm font-medium text-gray-800">
//                     Verify{" "}
//                     {selectedCategory === "ambulance" ? "Ambulance" : "Pandit"}{" "}
//                     Account
//                   </h3>
//                   <p className="text-xs text-gray-600 mt-1">
//                     Enter the 4-digit OTP sent to
//                   </p>
//                   <p className="text-sm font-medium text-[#8B6A3E] mt-0.5">
//                     {email}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-1">
//                     Enter OTP <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={otp}
//                     onChange={(e) =>
//                       setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))
//                     }
//                     className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition text-center tracking-widest"
//                     placeholder="• • • •"
//                     maxLength={4}
//                     autoFocus
//                   />
//                 </div>

//                 <p className="text-xs text-gray-500 text-center">
//                   Demo OTP: 1234
//                 </p>

//                 <button
//                   onClick={handleVerifyOtp}
//                   disabled={otp.length !== 4}
//                   className="w-full py-2 px-4 bg-[#8B6A3E] text-white text-sm font-medium rounded-lg hover:bg-[#755735] focus:outline-none focus:ring-2 focus:ring-[#8B6A3E] focus:ring-offset-1 transition disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   Verify & Login
//                 </button>

//                 <p className="text-center text-xs text-gray-600">
//                   Didn't receive OTP?{" "}
//                   <button
//                     onClick={handleResendOtp}
//                     className="text-[#8B6A3E] font-medium hover:underline"
//                   >
//                     Resend
//                   </button>
//                 </p>

//                 <button
//                   onClick={() => setStep("email")}
//                   className="w-full py-2 px-4 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-200 transition"
//                 >
//                   ← Back to Login
//                 </button>
//               </div>
//             )}

//             {/* Register Link */}
//             {step === "email" && (
//               <div className="mt-5 text-center border-t border-gray-100 pt-4">
//                 <p className="text-xs text-gray-600">
//                   New vendor?{" "}
//                   <Link
//                     href="/vendorregister"
//                     className="font-medium text-[#8B6A3E] hover:text-[#755735] transition"
//                   >
//                     Create account
//                   </Link>
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         {step === "email" && (
//           <div className="text-center mt-4">
//             <p className="text-xs text-gray-500">
//               By signing in, you agree to our{" "}
//               <Link href="/terms" className="text-[#8B6A3E] hover:underline">
//                 Terms
//               </Link>{" "}
//               and{" "}
//               <Link href="/privacy" className="text-[#8B6A3E] hover:underline">
//                 Privacy
//               </Link>
//             </p>
//             <p className="text-xs text-gray-400 mt-2">
//               © 2024 Service Portal. All rights reserved.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, USERS } from "@/context/AuthContext";
import { Mail, KeyRound, Truck, Briefcase, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function VendorLoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [otp, setOtp] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "pandit" | "ambulance" | null
  >(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tooltip, setTooltip] = useState({
    show: false,
    message: "",
    type: "",
  });

  // ✅ Check registered email on component mount
  useEffect(() => {
    const registeredEmail = localStorage.getItem("registeredEmail");
    const registeredCategory = localStorage.getItem("registeredCategory");

    if (registeredEmail && registeredCategory) {
      setEmail(registeredEmail);
      setSelectedCategory(registeredCategory as "pandit" | "ambulance");
    }
  }, []);

  const showTooltip = (message: string, type: string) => {
    setTooltip({ show: true, message, type });
    setTimeout(() => setTooltip({ show: false, message: "", type: "" }), 3000);
  };

  const handleSendOtp = () => {
    if (!email) {
      showTooltip("Please enter email", "error");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // ✅ Check in localStorage registered users first
      const vendorUsers = JSON.parse(
        localStorage.getItem("vendorUsers") || "[]",
      );
      const registeredUser = vendorUsers.find((u: any) => u.email === email);

      // ✅ Also check USERS object for demo users
      const isDemoUser =
        email === USERS.pandit.email || email === USERS.ambulance.email;

      if (registeredUser || isDemoUser) {
        setStep("otp");

        // Set category from registered user or demo user
        if (registeredUser) {
          setSelectedCategory(registeredUser.category);
        } else if (email === USERS.pandit.email) {
          setSelectedCategory("pandit");
        } else if (email === USERS.ambulance.email) {
          setSelectedCategory("ambulance");
        }

        showTooltip(`OTP sent to ${email}`, "otp");
      } else {
        showTooltip(
          "Email not registered as vendor. Please register first.",
          "error",
        );
      }

      setIsLoading(false);
    }, 800);
  };

  const handleVerifyOtp = () => {
    if (otp !== "1234") {
      showTooltip("Invalid OTP", "error");
      return;
    }

    showTooltip("Vendor logged in successfully", "success");

    setTimeout(() => {
      // ✅ Get user data from localStorage
      const vendorUsers = JSON.parse(
        localStorage.getItem("vendorUsers") || "[]",
      );
      const registeredUser = vendorUsers.find((u: any) => u.email === email);

      if (registeredUser) {
        // Login with registered user data
        login({
          email: registeredUser.email,
          name: registeredUser.name || registeredUser.fullName || "Vendor",
          role: "vendor",
          category: registeredUser.category,
        });

        // Store in localStorage for dashboard
        localStorage.setItem("role", "vendor");
        localStorage.setItem("vendorCategory", registeredUser.category);
        localStorage.setItem(
          "userName",
          registeredUser.name || registeredUser.fullName || "Vendor",
        );
        localStorage.setItem("userEmail", registeredUser.email);
      } else if (email === USERS.pandit.email) {
        login(USERS.pandit);
        localStorage.setItem("vendorCategory", "pandit");
        localStorage.setItem("userName", USERS.pandit.name);
      } else if (email === USERS.ambulance.email) {
        login(USERS.ambulance);
        localStorage.setItem("vendorCategory", "ambulance");
        localStorage.setItem("userName", USERS.ambulance.name);
      }

      router.push("/vendordashboardpage");
    }, 1000);
  };

  const handleResendOtp = () => {
    showTooltip(`OTP resent to ${email}`, "otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
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

          {tooltip.show && (
            <div
              className={`fixed top-5 right-5 z-50 px-4 py-2 rounded-lg text-xs font-medium shadow-lg ${
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

          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {step === "email" ? "Vendor Login" : "Verify OTP"}
              </h2>
              <p className="text-xs text-gray-600">
                {step === "email"
                  ? "Access your vendor dashboard"
                  : `OTP sent to ${email}`}
              </p>
              {selectedCategory && step === "email" && (
                <p className="text-xs font-medium text-[#8B6A3E] mt-2">
                  {selectedCategory === "pandit"
                    ? "🕉️ Pandit Partner"
                    : "🚑 Ambulance Partner"}
                </p>
              )}
            </div>

            {step === "email" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendOtp();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <Mail className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition bg-white"
                      placeholder="vendor@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <KeyRound className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-8 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition bg-white"
                      placeholder="••••••••"
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

                <p className="text-xs text-gray-500 text-center bg-gray-50 p-2 rounded-lg">
                  Demo: pandit@example.com / ambulance@example.com
                </p>

                <button
                  type="submit"
                  disabled={!email || isLoading}
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
                    "Send OTP"
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
                    {selectedCategory === "ambulance" ? (
                      <Truck className="h-6 w-6 text-red-600" />
                    ) : (
                      <Briefcase className="h-6 w-6 text-[#8B6A3E]" />
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-gray-800">
                    Verify{" "}
                    {selectedCategory === "ambulance" ? "Ambulance" : "Pandit"}{" "}
                    Account
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Enter the 4-digit OTP sent to
                  </p>
                  <p className="text-sm font-medium text-[#8B6A3E] mt-0.5">
                    {email}
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
                      setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))
                    }
                    className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition text-center tracking-widest"
                    placeholder="• • • •"
                    maxLength={4}
                    autoFocus
                  />
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Demo OTP: 1234
                </p>

                <button
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 4}
                  className="w-full py-2 px-4 bg-[#8B6A3E] text-white text-sm font-medium rounded-lg hover:bg-[#755735] focus:outline-none focus:ring-2 focus:ring-[#8B6A3E] focus:ring-offset-1 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Verify & Login
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
                  onClick={() => setStep("email")}
                  className="w-full py-2 px-4 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-200 transition"
                >
                  ← Back to Login
                </button>
              </div>
            )}

            {step === "email" && (
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

        {step === "email" && (
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

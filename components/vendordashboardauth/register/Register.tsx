// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import {
//   Briefcase,
//   Check,
//   ArrowRight,
//   ArrowLeft,
//   FileText,
// } from "lucide-react";
// import {
//   commonStep1Fields,
//   vendorCategories,
//   getStepsForCategory,
//   VendorFormData,
//   TooltipState,
//   TooltipType,
// } from "@/components/vendordashboardauth/register/vendordata";

// export default function VendorRegistrationPage() {
//   const [selectedCategory, setSelectedCategory] = useState<string>(
//     vendorCategories[0].id,
//   );
//   const [vendorForm, setVendorForm] = useState<VendorFormData>({});
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [currentStep, setCurrentStep] = useState<number>(1);
//   const [tooltip, setTooltip] = useState<TooltipState>({
//     show: false,
//     message: "",
//     type: "",
//   });

//   const showTooltip = (message: string, type: TooltipType): void => {
//     setTooltip({ show: true, message, type });
//     setTimeout(() => setTooltip({ show: false, message: "", type: "" }), 3000);
//   };

//   const handleVendorChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >,
//   ): void => {
//     const { name, value, type } = e.target;

//     if (type === "checkbox") {
//       const checked = (e.target as HTMLInputElement).checked;
//       setVendorForm((prev) => ({ ...prev, [name]: checked }));
//     } else if (type === "file") {
//       const files = (e.target as HTMLInputElement).files;
//       if (files && files[0]) {
//         setVendorForm((prev) => ({ ...prev, [name]: files[0].name }));
//       }
//     } else {
//       setVendorForm((prev) => ({ ...prev, [name]: value }));
//     }

//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validateCurrentStep = (): boolean => {
//     const newErrors: Record<string, string> = {};

//     if (currentStep === 1) {
//       commonStep1Fields
//         .filter((field) => field.required)
//         .forEach((field) => {
//           const value = vendorForm[field.name];
//           if (!value || value === "") {
//             newErrors[field.name] = `${field.label} is required`;
//           }
//         });
//     } else {
//       const currentCategory = vendorCategories.find(
//         (cat) => cat.id === selectedCategory,
//       );

//       if (currentCategory) {
//         const currentStepFields = currentCategory.fields.filter(
//           (field) => field.step === currentStep && field.required,
//         );

//         currentStepFields.forEach((field) => {
//           const value = vendorForm[field.name];
//           if (!value || value === "") {
//             newErrors[field.name] = `${field.label} is required`;
//           }
//         });
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNextStep = (): void => {
//     if (validateCurrentStep()) {
//       setCurrentStep((prev) => prev + 1);
//     } else {
//       showTooltip("Please fill all required fields in this step", "error");
//     }
//   };

//   const handlePreviousStep = (): void => {
//     setCurrentStep((prev) => prev - 1);
//   };

//   const handleVendorSubmit = async (e: React.FormEvent): Promise<void> => {
//     e.preventDefault();

//     if (!validateCurrentStep()) {
//       showTooltip("Please fill all required fields", "error");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       showTooltip(
//         "Vendor registration successful! Awaiting approval.",
//         "success",
//       );
//       console.log("Vendor Form Data:", vendorForm);

//       setTimeout(() => {
//         setVendorForm({});
//         setCurrentStep(1);
//       }, 2000);
//     } catch (error) {
//       showTooltip("Registration failed. Please try again.", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const currentCategory =
//     vendorCategories.find((cat) => cat.id === selectedCategory) ||
//     vendorCategories[0];

//   const steps = getStepsForCategory(selectedCategory);
//   const maxSteps = steps.length;

//   const getCurrentStepFields = () => {
//     if (currentStep === 1) {
//       return commonStep1Fields;
//     } else {
//       return currentCategory.fields.filter(
//         (field) => field.step === currentStep,
//       );
//     }
//   };

//   const currentStepFields = getCurrentStepFields();

//   const getStepIcon = (stepId: number) => {
//     const step = steps.find((s) => s.id === stepId);
//     return step?.icon || FileText;
//   };

//   const renderField = (field: any) => {
//     const commonClasses = `w-full px-3 py-2.5 text-xs border rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition ${
//       errors[field.name] ? "border-red-500 bg-red-50" : "border-gray-300"
//     }`;

//     switch (field.type) {
//       case "textarea":
//         return (
//           <textarea
//             name={field.name}
//             value={
//               typeof vendorForm[field.name] === "string"
//                 ? (vendorForm[field.name] as string)
//                 : ""
//             }
//             onChange={handleVendorChange}
//             rows={3}
//             className={`${commonClasses} resize-none`}
//             placeholder={field.placeholder}
//           />
//         );

//       case "checkbox":
//         return (
//           <div className="flex items-center mt-1.5 h-[38px]">
//             <input
//               type="checkbox"
//               name={field.name}
//               checked={
//                 typeof vendorForm[field.name] === "boolean"
//                   ? (vendorForm[field.name] as boolean)
//                   : false
//               }
//               onChange={handleVendorChange}
//               className="h-4 w-4 text-[#8B6A3E] border-gray-300 rounded focus:ring-[#8B6A3E]"
//             />
//             <span className="ml-2 text-xs text-gray-600">Yes, available</span>
//           </div>
//         );

//       case "select":
//         return (
//           <select
//             name={field.name}
//             value={
//               typeof vendorForm[field.name] === "string"
//                 ? (vendorForm[field.name] as string)
//                 : ""
//             }
//             onChange={handleVendorChange}
//             className={commonClasses}
//           >
//             <option value="">-- Select --</option>
//             {field.options?.map((opt: string) => (
//               <option key={opt} value={opt}>
//                 {opt}
//               </option>
//             ))}
//           </select>
//         );

//       case "file":
//         return (
//           <input
//             type="file"
//             name={field.name}
//             onChange={handleVendorChange}
//             className={`${commonClasses} file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-[#8B6A3E]/10 file:text-[#8B6A3E] hover:file:bg-[#8B6A3E]/20`}
//             accept={field.accept}
//           />
//         );

//       default:
//         return (
//           <input
//             type={field.type}
//             name={field.name}
//             value={
//               typeof vendorForm[field.name] === "string"
//                 ? (vendorForm[field.name] as string)
//                 : ""
//             }
//             onChange={handleVendorChange}
//             className={commonClasses}
//             placeholder={field.placeholder}
//           />
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
//       {tooltip.show && (
//         <div
//           className={`fixed top-5 right-5 z-50 px-4 py-2 rounded-lg text-xs font-medium shadow-lg transition-all ${
//             tooltip.type === "success"
//               ? "bg-green-50 text-green-700 border border-green-200"
//               : tooltip.type === "error"
//                 ? "bg-red-50 text-red-700 border border-red-200"
//                 : "bg-blue-50 text-blue-700 border border-blue-200"
//           }`}
//         >
//           {tooltip.message}
//         </div>
//       )}

//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//           <div className="bg-gradient-to-r from-[#8B6A3E]/10 to-[#755735]/10 px-6 py-5 border-b border-gray-200">
//             <div className="flex items-center justify-center gap-2 text-center">
//               <div>
//                 <h1 className="text-base text-xl font-semibold text-gray-900">
//                   Vendor Registration Portal
//                 </h1>
//                 <p className="text-xs text-gray-500 mt-0.5">
//                   Join our network of verified service providers
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="p-6">
//             <form onSubmit={handleVendorSubmit} className="space-y-6">
//               <div className="mb-6">
//                 <div className="flex items-center justify-between">
//                   {steps.map((step, index) => (
//                     <React.Fragment key={step.id}>
//                       <div className="flex flex-col items-center relative">
//                         <div
//                           className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
//                             currentStep > step.id
//                               ? "bg-[#8B6A3E] border-[#8B6A3E] text-white"
//                               : currentStep === step.id
//                                 ? "bg-[#8B6A3E] border-[#8B6A3E] text-white ring-4 ring-[#8B6A3E]/20"
//                                 : "bg-white border-gray-300 text-gray-400"
//                           }`}
//                         >
//                           {currentStep > step.id ? (
//                             <Check className="h-4 w-4" />
//                           ) : (
//                             <step.icon className="h-4 w-4" />
//                           )}
//                         </div>
//                         <span
//                           className={`text-[10px] font-medium mt-1.5 ${
//                             currentStep >= step.id
//                               ? "text-gray-900"
//                               : "text-gray-500"
//                           }`}
//                         >
//                           {step.title}
//                         </span>
//                         <span className="text-[8px] text-gray-500 hidden sm:block">
//                           {step.description}
//                         </span>
//                       </div>

//                       {index < steps.length - 1 && (
//                         <div className="flex-1 mx-1 relative">
//                           <div
//                             className={`h-0.5 ${
//                               currentStep > step.id
//                                 ? "bg-[#8B6A3E]"
//                                 : "bg-gray-200"
//                             }`}
//                           />
//                         </div>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-[#8B6A3E]/5 p-4 rounded-lg border border-[#8B6A3E]/20 mb-4 shadow-sm hover:shadow-md transition-shadow">
//                 <div className="flex items-start gap-3">
//                   <div className="mt-0.5">
//                     <div className="w-6 h-6 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center">
//                       <Briefcase className="h-3.5 w-3.5 text-[#8B6A3E]" />
//                     </div>
//                   </div>
//                   <div className="flex-1">
//                     <label className="block text-md font-semibold text-[#8B6A3E] mb-1.5 flex items-center gap-1">
//                       <span className="bg-[#8B6A3E]/10 px-2 py-0.5 rounded">
//                         STEP 1
//                       </span>
//                       Select Service Category
//                       <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative max-w-md ">
//                       <select
//                         value={selectedCategory}
//                         onChange={(e) => {
//                           setSelectedCategory(e.target.value);
//                           setCurrentStep(1);
//                         }}
//                         className="text-sm w-full pl-3 pr-8 py-2.5 text-xs bg-white border-2 border-[#8B6A3E]/30 rounded-lg focus:ring-2 focus:ring-[#8B6A3E]/20 focus:border-[#8B6A3E] outline-none appearance-none font-medium"
//                       >
//                         {vendorCategories.map((cat) => (
//                           <option key={cat.id} value={cat.id} className="py-2">
//                             {cat.name}
//                           </option>
//                         ))}
//                       </select>
//                       <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                         <svg
//                           className="h-4 w-4 text-[#8B6A3E]"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M19 9l-7 7-7-7"
//                           />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8B6A3E] to-[#8B6A3E]/50 rounded-l-lg hidden md:block"></div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {currentStepFields.map((field) => (
//                   <div
//                     key={field.name}
//                     className={
//                       field.type === "textarea" ? "md:col-span-3" : "col-span-1"
//                     }
//                   >
//                     <label className="block text-[11px] font-medium text-gray-700 mb-1.5">
//                       {field.label}
//                       {field.required && (
//                         <span className="text-red-500 ml-1">*</span>
//                       )}
//                     </label>

//                     {renderField(field)}

//                     {errors[field.name] && (
//                       <p className="text-[10px] text-red-500 mt-1">
//                         {errors[field.name]}
//                       </p>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               <div className="flex justify-between pt-4 border-t border-gray-200 mt-6">
//                 <button
//                   type="button"
//                   onClick={handlePreviousStep}
//                   disabled={currentStep === 1}
//                   className={`px-4 py-2 text-xs font-medium rounded-lg flex items-center gap-2 transition ${
//                     currentStep === 1
//                       ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                       : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   <ArrowLeft className="h-3.5 w-3.5" />
//                   Previous
//                 </button>

//                 {currentStep < maxSteps ? (
//                   <button
//                     type="button"
//                     onClick={handleNextStep}
//                     className="px-4 py-2 bg-[#8B6A3E] text-white text-xs font-medium rounded-lg hover:bg-[#755735] transition flex items-center gap-2"
//                   >
//                     Next Step
//                     <ArrowRight className="h-3.5 w-3.5" />
//                   </button>
//                 ) : (
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="px-6 py-2 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
//                   >
//                     {isLoading ? (
//                       <>
//                         <svg
//                           className="animate-spin h-3.5 w-3.5 text-white"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           />
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           />
//                         </svg>
//                         Submitting...
//                       </>
//                     ) : (
//                       <>
//                         <Check className="h-3.5 w-3.5" />
//                         Submit Registration
//                       </>
//                     )}
//                   </button>
//                 )}
//               </div>

//               <div className="text-center">
//                 <p className="text-[10px] text-gray-500">
//                   Step {currentStep} of {maxSteps} •{" "}
//                   {Math.round((currentStep / maxSteps) * 100)}% Complete
//                 </p>
//                 <div className="w-full bg-gray-200 h-1 rounded-full mt-2">
//                   <div
//                     className="bg-[#8B6A3E] h-1 rounded-full transition-all"
//                     style={{ width: `${(currentStep / maxSteps) * 100}%` }}
//                   />
//                 </div>
//               </div>

//               <div className="text-center pt-2">
//                 <p className="text-[12px] text-gray-600">
//                   Already registered?{" "}
//                   <Link
//                     href="/vendorlogin"
//                     className="font-medium text-[#8B6A3E] hover:text-[#755735] transition"
//                   >
//                     Sign in here
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Check,
  ArrowRight,
  ArrowLeft,
  FileText,
} from "lucide-react";
import {
  commonStep1Fields,
  vendorCategories,
  getStepsForCategory,
  VendorFormData,
  TooltipState,
  TooltipType,
} from "@/components/vendordashboardauth/register/vendordata";

export default function VendorRegistrationPage() {
  const router = useRouter(); // ✅ Add router
  const [selectedCategory, setSelectedCategory] = useState<string>(
    vendorCategories[0].id,
  );
  const [vendorForm, setVendorForm] = useState<VendorFormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [tooltip, setTooltip] = useState<TooltipState>({
    show: false,
    message: "",
    type: "",
  });

  const showTooltip = (message: string, type: TooltipType): void => {
    setTooltip({ show: true, message, type });
    setTimeout(() => setTooltip({ show: false, message: "", type: "" }), 3000);
  };

  const handleVendorChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ): void => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setVendorForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const files = (e.target as HTMLInputElement).files;
      if (files && files[0]) {
        setVendorForm((prev) => ({ ...prev, [name]: files[0].name }));
      }
    } else {
      setVendorForm((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      commonStep1Fields
        .filter((field) => field.required)
        .forEach((field) => {
          const value = vendorForm[field.name];
          if (!value || value === "") {
            newErrors[field.name] = `${field.label} is required`;
          }
        });
    } else {
      const currentCategory = vendorCategories.find(
        (cat) => cat.id === selectedCategory,
      );

      if (currentCategory) {
        const currentStepFields = currentCategory.fields.filter(
          (field) => field.step === currentStep && field.required,
        );

        currentStepFields.forEach((field) => {
          const value = vendorForm[field.name];
          if (!value || value === "") {
            newErrors[field.name] = `${field.label} is required`;
          }
        });
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (): void => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => prev + 1);
    } else {
      showTooltip("Please fill all required fields in this step", "error");
    }
  };

  const handlePreviousStep = (): void => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleVendorSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateCurrentStep()) {
      showTooltip("Please fill all required fields", "error");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const email = vendorForm.email as string;
      const name =
        (vendorForm.fullName as string) ||
        (vendorForm.contactPerson as string) ||
        "Vendor";

      if (email) {
        localStorage.setItem("registeredEmail", email);
        localStorage.setItem("registeredCategory", selectedCategory);
        localStorage.setItem("registeredName", name);

        const users = JSON.parse(localStorage.getItem("vendorUsers") || "[]");

        const existingUserIndex = users.findIndex(
          (u: any) => u.email === email,
        );

        const userData = {
          email,
          name,
          category: selectedCategory,
          role: "vendor",
          registeredAt: new Date().toISOString(),
          ...vendorForm,
        };

        if (existingUserIndex !== -1) {
          users[existingUserIndex] = {
            ...users[existingUserIndex],
            ...userData,
          };
        } else {
          users.push(userData);
        }

        localStorage.setItem("vendorUsers", JSON.stringify(users));

        const authUsers = JSON.parse(localStorage.getItem("authUsers") || "[]");
        const authUserData = {
          email,
          name,
          category: selectedCategory,
          role: "vendor",
          password: "demo123",
        };

        const existingAuthIndex = authUsers.findIndex(
          (u: any) => u.email === email,
        );
        if (existingAuthIndex !== -1) {
          authUsers[existingAuthIndex] = authUserData;
        } else {
          authUsers.push(authUserData);
        }

        localStorage.setItem("authUsers", JSON.stringify(authUsers));
      }

      showTooltip(
        "Vendor registration successful! Awaiting approval.",
        "success",
      );
      console.log("Vendor Form Data:", vendorForm);
      console.log("Registered Email:", email);
      console.log("Registered Category:", selectedCategory);

      setTimeout(() => {
        router.push(`/vendorlogin?email=${encodeURIComponent(email)}`);
      }, 1500);
    } catch (error) {
      showTooltip("Registration failed. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const currentCategory =
    vendorCategories.find((cat) => cat.id === selectedCategory) ||
    vendorCategories[0];

  const steps = getStepsForCategory(selectedCategory);
  const maxSteps = steps.length;

  const getCurrentStepFields = () => {
    if (currentStep === 1) {
      return commonStep1Fields;
    } else {
      return currentCategory.fields.filter(
        (field) => field.step === currentStep,
      );
    }
  };

  const currentStepFields = getCurrentStepFields();

  const getStepIcon = (stepId: number) => {
    const step = steps.find((s) => s.id === stepId);
    return step?.icon || FileText;
  };

  const renderField = (field: any) => {
    const commonClasses = `w-full px-3 py-2.5 text-xs border rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition ${
      errors[field.name] ? "border-red-500 bg-red-50" : "border-gray-300"
    }`;

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            name={field.name}
            value={
              typeof vendorForm[field.name] === "string"
                ? (vendorForm[field.name] as string)
                : ""
            }
            onChange={handleVendorChange}
            rows={3}
            className={`${commonClasses} resize-none`}
            placeholder={field.placeholder}
          />
        );

      case "checkbox":
        return (
          <div className="flex items-center mt-1.5 h-[38px]">
            <input
              type="checkbox"
              name={field.name}
              checked={
                typeof vendorForm[field.name] === "boolean"
                  ? (vendorForm[field.name] as boolean)
                  : false
              }
              onChange={handleVendorChange}
              className="h-4 w-4 text-[#8B6A3E] border-gray-300 rounded focus:ring-[#8B6A3E]"
            />
            <span className="ml-2 text-xs text-gray-600">Yes, available</span>
          </div>
        );

      case "select":
        return (
          <select
            name={field.name}
            value={
              typeof vendorForm[field.name] === "string"
                ? (vendorForm[field.name] as string)
                : ""
            }
            onChange={handleVendorChange}
            className={commonClasses}
          >
            <option value="">-- Select --</option>
            {field.options?.map((opt: string) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      case "file":
        return (
          <input
            type="file"
            name={field.name}
            onChange={handleVendorChange}
            className={`${commonClasses} file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-[#8B6A3E]/10 file:text-[#8B6A3E] hover:file:bg-[#8B6A3E]/20`}
            accept={field.accept}
          />
        );

      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={
              typeof vendorForm[field.name] === "string"
                ? (vendorForm[field.name] as string)
                : ""
            }
            onChange={handleVendorChange}
            className={commonClasses}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
      {tooltip.show && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-2 rounded-lg text-xs font-medium shadow-lg transition-all ${
            tooltip.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : tooltip.type === "error"
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-blue-50 text-blue-700 border border-blue-200"
          }`}
        >
          {tooltip.message}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#8B6A3E]/10 to-[#755735]/10 px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-center gap-2 text-center">
              <div>
                <h1 className="text-base text-xl font-semibold text-gray-900">
                  Vendor Registration Portal
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Join our network of verified service providers
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleVendorSubmit} className="space-y-6">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                      <div className="flex flex-col items-center relative">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                            currentStep > step.id
                              ? "bg-[#8B6A3E] border-[#8B6A3E] text-white"
                              : currentStep === step.id
                                ? "bg-[#8B6A3E] border-[#8B6A3E] text-white ring-4 ring-[#8B6A3E]/20"
                                : "bg-white border-gray-300 text-gray-400"
                          }`}
                        >
                          {currentStep > step.id ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <step.icon className="h-4 w-4" />
                          )}
                        </div>
                        <span
                          className={`text-[10px] font-medium mt-1.5 ${
                            currentStep >= step.id
                              ? "text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          {step.title}
                        </span>
                        <span className="text-[8px] text-gray-500 hidden sm:block">
                          {step.description}
                        </span>
                      </div>

                      {index < steps.length - 1 && (
                        <div className="flex-1 mx-1 relative">
                          <div
                            className={`h-0.5 ${
                              currentStep > step.id
                                ? "bg-[#8B6A3E]"
                                : "bg-gray-200"
                            }`}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="bg-[#8B6A3E]/5 p-4 rounded-lg border border-[#8B6A3E]/20 mb-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <div className="w-6 h-6 rounded-full bg-[#8B6A3E]/10 flex items-center justify-center">
                      <Briefcase className="h-3.5 w-3.5 text-[#8B6A3E]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-md font-semibold text-[#8B6A3E] mb-1.5 flex items-center gap-1">
                      <span className="bg-[#8B6A3E]/10 px-2 py-0.5 rounded">
                        STEP 1
                      </span>
                      Select Service Category
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative max-w-md ">
                      <select
                        value={selectedCategory}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setCurrentStep(1);
                        }}
                        className="text-sm w-full pl-3 pr-8 py-2.5 text-xs bg-white border-2 border-[#8B6A3E]/30 rounded-lg focus:ring-2 focus:ring-[#8B6A3E]/20 focus:border-[#8B6A3E] outline-none appearance-none font-medium"
                      >
                        {vendorCategories.map((cat) => (
                          <option key={cat.id} value={cat.id} className="py-2">
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          className="h-4 w-4 text-[#8B6A3E]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8B6A3E] to-[#8B6A3E]/50 rounded-l-lg hidden md:block"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentStepFields.map((field) => (
                  <div
                    key={field.name}
                    className={
                      field.type === "textarea" ? "md:col-span-3" : "col-span-1"
                    }
                  >
                    <label className="block text-[11px] font-medium text-gray-700 mb-1.5">
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>

                    {renderField(field)}

                    {errors[field.name] && (
                      <p className="text-[10px] text-red-500 mt-1">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-200 mt-6">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  disabled={currentStep === 1}
                  className={`px-4 py-2 text-xs font-medium rounded-lg flex items-center gap-2 transition ${
                    currentStep === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Previous
                </button>

                {currentStep < maxSteps ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-4 py-2 bg-[#8B6A3E] text-white text-xs font-medium rounded-lg hover:bg-[#755735] transition flex items-center gap-2"
                  >
                    Next Step
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        Submit Registration
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="text-center">
                <p className="text-[10px] text-gray-500">
                  Step {currentStep} of {maxSteps} •{" "}
                  {Math.round((currentStep / maxSteps) * 100)}% Complete
                </p>
                <div className="w-full bg-gray-200 h-1 rounded-full mt-2">
                  <div
                    className="bg-[#8B6A3E] h-1 rounded-full transition-all"
                    style={{ width: `${(currentStep / maxSteps) * 100}%` }}
                  />
                </div>
              </div>

              <div className="text-center pt-2">
                <p className="text-[12px] text-gray-600">
                  Already registered?{" "}
                  <Link
                    href="/vendorlogin"
                    className="font-medium text-[#8B6A3E] hover:text-[#755735] transition"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

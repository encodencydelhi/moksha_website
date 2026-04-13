"use client";

import { useState, useEffect, Suspense } from "react";
import {
  ShoppingCart,
  Loader,
  ArrowLeft,
  Check,
  AlertCircle,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getAllServices,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "@/lib/apiClient";
import Navbar from "@/components/navbar/Navbar";
import Topbar from "@/components/topbar/Topbar";
import Footer from "@/components/Footer/Footer";

interface Service {
  _id: string;
  name: string;
  price: number;
  description: string;
  features?: string[];
  icon?: string;
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");

  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    name: "",
    address: "",
  });

  useEffect(() => {
    // Fetch services
    const fetchServices = async () => {
      try {
        const res = await getAllServices();
        const data = res.data;
        if (data.success && data.data) {
          setServices(data.data);

          // If serviceId provided, find and select that service
          if (serviceId) {
            const service = data.data.find(
              (s: Service) => s._id === serviceId,
            );
            if (service) {
              setSelectedService(service);
            } else {
              setSelectedService(data.data[0] || null);
            }
          } else {
            setSelectedService(data.data[0] || null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [serviceId]);

  const handlePayment = async (e: any) => {
    e.preventDefault();

    if (
      !selectedService ||
      !formData.email ||
      !formData.phone ||
      !formData.name
    ) {
      setError("कृपया सभी फील्ड भरें और सेवा चुनें");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("कृपया सही ईमेल दर्ज करें");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      setError("कृपया 10 अंकों का फोन नंबर दर्ज करें");
      return;
    }

    setPaymentLoading(true);
    setError("");
    setSuccess("");

    try {
      // Step 1: Create order from backend
      const orderRes = await createRazorpayOrder({
        serviceId: selectedService._id,
        amount: selectedService.price,
        email: formData.email,
        phone: formData.phone,
        name: formData.name,
        description: `Service: ${selectedService.name}`,
      });

      const orderData = orderRes.data;

      if (!orderData.success) {
        throw new Error(orderData.message || "ऑर्डर बनाने में विफल");
      }

      // Step 2: Load Razorpay checkout script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => {
        const options = {
          key: orderData.order.key_id || orderData.key_id,
          amount: orderData.order.amount,
          currency: orderData.order.currency,
          order_id: orderData.order.id,
          name: "Moksha Voyage",
          description: selectedService.name,
          image: "/assets/logoreal.jpeg",

          handler: async (response: any) => {
            try {
              // Step 3: Verify payment signature
              const verifyRes = await verifyRazorpayPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              const verifyData = verifyRes.data;

              if (verifyData.success) {
                setSuccess(`✓ पेमेंट सफल हुई! 
                Transaction ID: ${verifyData.payment?.transactionId || "N/A"}
                राशि: ₹${verifyData.payment?.amount || selectedService.price}
                सेवा: ${selectedService.name}
                कृपया अपनी ईमेल जांचें - रसीद और पुष्टि प्राप्त करें।`);

                // Reset form
                setTimeout(() => {
                  setFormData({ email: "", phone: "", name: "", address: "" });
                  setSelectedService(services[0] || null);
                }, 3000);
              } else {
                throw new Error(verifyData.message || "पेमेंट सत्यापन विफल");
              }
            } catch (err: any) {
              setError(`पेमेंट त्रुटि: ${err.message}`);
            } finally {
              setPaymentLoading(false);
            }
          },

          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },

          theme: {
            color: "#8B6A3E",
          },

          modal: {
            ondismiss: () => {
              setError("पेमेंट उपयोगकर्ता द्वारा रद्द किया गया");
              setPaymentLoading(false);
            },
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };

      script.onerror = () => {
        setError("भुगतान गेटवे लोड करने में विफल");
        setPaymentLoading(false);
      };

      document.body.appendChild(script);
    } catch (err: any) {
      setError(`पेमेंट त्रुटि: ${err.message}`);
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8B6A3E] to-[#3A2A1F]">
        <Topbar />
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader className="animate-spin text-[#E8DBC5]" size={48} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B6A3E] to-[#3A2A1F]">
      <Topbar />
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#E8DBC5] hover:text-white mb-6 transition"
        >
          <ArrowLeft size={20} />
          वापस जाएं
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <ShoppingCart size={48} className="text-[#E8DBC5]" />
          </div>
          <h1 className="text-3xl font-bold text-[#E8DBC5] mb-2">
            सेवा खरीदें
          </h1>
          <p className="text-[#c9b696]">
            मोक्ष यात्रा सेवाओं के लिए भुगतान पूरा करें
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
              <div className="flex gap-3 mb-2">
                <Check className="text-green-500" size={24} />
                <p className="text-green-700 whitespace-pre-line font-semibold text-base">
                  {success}
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <div className="flex gap-3">
                <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
                <p className="text-red-700 font-semibold">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handlePayment} className="p-8 space-y-6">
            {/* Service Selection or Display */}
            {serviceId && selectedService ? (
              // If service pre-selected from URL, show it as read-only card
              <div>
                <label className="block text-sm font-semibold text-[#3A2A1F] mb-3">
                  चयनित सेवा
                </label>
                <div className="bg-gradient-to-r from-[#8B6A3E] to-[#A0845C] text-white p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-2">
                    {selectedService.name}
                  </h3>
                  <p className="text-[#E8DBC5] mb-4">
                    {selectedService.description}
                  </p>
                  <div className="text-3xl font-bold">
                    ₹{selectedService.price}
                  </div>
                </div>
              </div>
            ) : (
              // If no pre-selected service, show dropdown
              <div>
                <label className="block text-sm font-semibold text-[#3A2A1F] mb-3">
                  सेवा चुनें *
                </label>
                <select
                  value={selectedService?._id || ""}
                  onChange={(e) => {
                    const service = services.find(
                      (s) => s._id === e.target.value,
                    );
                    setSelectedService(service || null);
                  }}
                  className="w-full px-4 py-3 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E] text-[#3A2A1F]"
                >
                  <option value="">-- सेवा चुनें --</option>
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name} - ₹{service.price}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Service Features */}
            {selectedService?.features &&
              selectedService.features.length > 0 && (
                <div className="bg-[#F8F4EC] rounded-lg p-4">
                  <p className="font-semibold text-[#3A2A1F] mb-3">
                    ✓ शामिल सुविधाएं:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedService.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check
                          size={16}
                          className="text-[#8B6A3E] mt-0.5 flex-shrink-0"
                        />
                        <span className="text-sm text-[#5A4030]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Order Summary */}
            {selectedService && (
              <div className="bg-[#F8F4EC] border border-[#e8dbc5] rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-[#5A4030]">सेवा:</span>
                  <span className="font-semibold text-[#3A2A1F]">
                    {selectedService.name}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[#8B6A3E] border-t border-[#e8dbc5] pt-2 mt-2">
                  <span>कुल राशि:</span>
                  <span>₹{selectedService.price}</span>
                </div>
              </div>
            )}

            {/* Customer Details */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-[#3A2A1F] mb-3">
                आपका विवरण *
              </label>

              <input
                type="text"
                placeholder="पूरा नाम"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E] text-[#3A2A1F] placeholder-[#8B7A6A]"
                required
              />

              <input
                type="email"
                placeholder="ईमेल पता"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E] text-[#3A2A1F] placeholder-[#8B7A6A]"
                required
              />

              <input
                type="tel"
                placeholder="फोन नंबर"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E] text-[#3A2A1F] placeholder-[#8B7A6A]"
                required
              />

              <textarea
                placeholder="पता (वैकल्पिक)"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full px-4 py-3 border border-[#e8dbc5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6A3E] text-[#3A2A1F] placeholder-[#8B7A6A] resize-none"
                rows={3}
              />
            </div>

            {/* Test Card Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-semibold mb-2">
                🧪 टेस्ट मोड - यह कार्ड उपयोग करें:
              </p>
              <p className="text-sm text-blue-800 font-mono">
                <strong>कार्ड:</strong> 4111 1111 1111 1111
                <br />
                <strong>Expiry:</strong> Any future date
                <br />
                <strong>CVV:</strong> Any 3 digits
              </p>
            </div>

            {/* Payment Button */}
            <button
              type="submit"
              disabled={paymentLoading || !selectedService}
              className="w-full bg-gradient-to-r from-[#8B6A3E] to-[#5A3E2B] hover:from-[#6B5A3E] hover:to-[#3A2E1B] text-white font-bold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
            >
              {paymentLoading ? (
                <>
                  <Loader size={24} className="animate-spin" />
                  प्रसंस्करण...
                </>
              ) : (
                <>
                  <ShoppingCart size={24} />₹{selectedService?.price || 0} का
                  भुगतान करें
                </>
              )}
            </button>

            {/* Security Info */}
            <div className="text-center text-sm text-[#8B7A6A]">
              <p>🔒 Razorpay द्वारा सुरक्षित भुगतान</p>
              <p>आपकी भुगतान जानकारी एन्क्रिप्ट की गई है</p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-[#8B6A3E] to-[#3A2A1F] flex items-center justify-center">
          <Loader className="animate-spin text-[#E8DBC5]" size={48} />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}

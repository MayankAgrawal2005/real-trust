import { useState } from "react";
import { api } from "../api";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage("");
    setStatus("idle");
    try {
      await api.post("/subscribers", { email });
      setMessage("Subscribed successfully!");
      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Error subscribing");
      }
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubscribe}
      className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 space-y-3"
    >
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">
          Email Address
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 text-black rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Subscribe
          </button>
        </div>
      </div>

      {message && (
        <p
          className={`text-xs ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}

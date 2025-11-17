import { useState } from "react";
import { api } from "../api";

export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setStatus("idle");
    try {
      await api.post("/contacts", form);
      setMessage("Contact submitted successfully!");
      setStatus("success");
      setForm({ fullName: "", email: "", mobile: "", city: "" });
    } catch (err) {
      console.error(err);
      setMessage("Error submitting form");
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 space-y-4"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Full Name
          </label>
          <input
            name="fullName"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full text-black rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Email Address
          </label>
          <input
            name="email"
            placeholder="you@example.com"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Mobile Number
          </label>
          <input
            name="mobile"
            placeholder="9876543210"
            value={form.mobile}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            City
          </label>
          <input
            name="city"
            placeholder="Indore"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>

      {message && (
        <p
          className={`text-xs mt-1 ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}

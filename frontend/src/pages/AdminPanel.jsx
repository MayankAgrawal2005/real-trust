


import { useEffect, useState } from "react";
import { api } from "../api";

export default function AdminPanel() {
  const [projectForm, setProjectForm] = useState({
    imageUrl: "",
    name: "",
    description: "",
  });

  const [clientForm, setClientForm] = useState({
    imageUrl: "",
    name: "",
    description: "",
    designation: "",
  });

  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  const [activeTab, setActiveTab] = useState("overview");

  const handleProjectChange = (e) => {
    setProjectForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClientChange = (e) => {
    setClientForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addProject = async (e) => {
    e.preventDefault();
    try {
      await api.post("/projects", projectForm);
      alert("Project added!");
      setProjectForm({ imageUrl: "", name: "", description: "" });
    } catch (err) {
      console.error(err);
      alert("Error adding project");
    }
  };

  const addClient = async (e) => {
    e.preventDefault();
    try {
      await api.post("/clients", clientForm);
      alert("Client added!");
      setClientForm({
        imageUrl: "",
        name: "",
        description: "",
        designation: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding client");
    }
  };

  const fetchAdminData = async () => {
    try {
      const [contactsRes, subsRes] = await Promise.all([
        api.get("/contacts"),
        api.get("/subscribers"),
      ]);
      setContacts(contactsRes.data);
      setSubscribers(subsRes.data);
    } catch (err) {
      console.error("Error fetching admin data", err);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
        {/* ======= HEADER ======= */}
        <header className="flex flex-col gap-4 mb-6 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-sky-400/70 mb-1">
            • Admin
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Control Center
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-md">
              Manage landing page content, leads and newsletter subscribers in
              one place.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-300 border border-emerald-500/50">
              <span className="mr-1 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
             Admin Panel
            </span>
          </div>
        </header>

        {/* ======= TOP STATS ======= */}
        <section className="grid gap-3 sm:grid-cols-3 mb-6 sm:mb-8">
          <StatCard
            title="Total Contacts"
            value={contacts.length}
            accent="from-sky-500/90 to-cyan-400/90"
          />
          <StatCard
            title="Subscribers"
            value={subscribers.length}
            accent="from-violet-500/90 to-fuchsia-500/90"
          />
          <StatCard
            title="Status"
            value="Live"
            accent="from-emerald-500/90 to-lime-400/90"
          />
        </section>

        {/* ======= TABS ======= */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { id: "overview", label: "Overview" },
            { id: "projects", label: "Projects" },
            { id: "clients", label: "Clients" },
            { id: "contacts", label: "Contacts" },
            { id: "subscribers", label: "Subscribers" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium border transition ${
                activeTab === tab.id
                  ? "bg-sky-500 text-white border-sky-500 shadow shadow-sky-500/40"
                  : "bg-slate-900/60 text-slate-300 border-slate-700 hover:border-sky-500/60 hover:text-sky-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ======= TAB CONTENT ======= */}
        <div className="space-y-8">
          {activeTab === "overview" && (
            <OverviewSection
              onGoProjects={() => setActiveTab("projects")}
              onGoClients={() => setActiveTab("clients")}
              onGoContacts={() => setActiveTab("contacts")}
              onGoSubscribers={() => setActiveTab("subscribers")}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsSection
              projectForm={projectForm}
              onChange={handleProjectChange}
              onSubmit={addProject}
            />
          )}

          {activeTab === "clients" && (
            <ClientsSection
              clientForm={clientForm}
              onChange={handleClientChange}
              onSubmit={addClient}
            />
          )}

          {activeTab === "contacts" && (
            <ContactsSection
              contacts={contacts}
              onRefresh={fetchAdminData}
            />
          )}

          {activeTab === "subscribers" && (
            <SubscribersSection
              subscribers={subscribers}
              onRefresh={fetchAdminData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* -------- Small components -------- */

function StatCard({ title, value, accent }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-4 sm:px-5 sm:py-5 shadow-lg shadow-slate-950/40">
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br ${accent} opacity-40 blur-2xl`}
      />
      <p className="text-[11px] font-medium text-slate-400">{title}</p>
      <p className="mt-1 text-xl sm:text-2xl font-semibold">{value}</p>
    </div>
  );
}

/* ======= OVERVIEW ======= */
function OverviewSection({
  onGoProjects,
  onGoClients,
  onGoContacts,
  onGoSubscribers,
}) {
  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 shadow-xl shadow-slate-950/50 p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          Welcome to the Dashboard
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-4">
          Use the sections on the right to manage what appears on the public
          landing page.
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
          <li>• <b>Projects</b> → cards in the “Our Projects” section.</li>
          <li>• <b>Clients</b> → testimonials in the “Happy Clients” section.</li>
          <li>• <b>Contacts</b> → leads from hero + contact forms.</li>
          <li>• <b>Subscribers</b> → newsletter email list.</li>
        </ul>
      </div>

      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 shadow-xl shadow-slate-950/50 p-5 sm:p-6">
        <h3 className="text-sm font-semibold mb-3 text-slate-100">
          Quick Actions
        </h3>
        <div className="grid gap-2">
          <QuickButton label="Add new Project" onClick={onGoProjects} />
          <QuickButton label="Add new Client" onClick={onGoClients} />
          <QuickButton label="View Contacts" onClick={onGoContacts} />
          <QuickButton label="View Subscribers" onClick={onGoSubscribers} />
        </div>
      </div>
    </section>
  );
}

function QuickButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-xs sm:text-sm text-left text-slate-200 hover:border-sky-500 hover:text-sky-200 hover:bg-slate-900 transition flex items-center justify-between"
    >
      <span>{label}</span>
      <span className="text-sky-400 text-xs">↗</span>
    </button>
  );
}

/* ======= PROJECTS ======= */
function ProjectsSection({ projectForm, onChange, onSubmit }) {
  return (
    <section className="bg-slate-900/80 rounded-2xl border border-slate-800 shadow-xl shadow-slate-950/50 p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">
            Project Management
          </h2>
          <p className="text-[11px] text-slate-400">
            Add cards for the &quot;Our Projects&quot; section.
          </p>
        </div>
        <span className="hidden sm:inline-flex rounded-full bg-sky-500/15 px-3 py-1 text-[10px] uppercase tracking-wide text-sky-300 border border-sky-500/40">
          POST /api/projects
        </span>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Project Image URL
            </label>
            <input
              name="imageUrl"
              placeholder="https://example.com/project.jpg"
              value={projectForm.imageUrl}
              onChange={onChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/80 focus:border-sky-500/80 transition"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Project Name
            </label>
            <input
              name="name"
              placeholder="Landing Page Revamp"
              value={projectForm.name}
              onChange={onChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/80 focus:border-sky-500/80 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">
            Project Description
          </label>
          <textarea
            name="description"
            rows={3}
            placeholder="Short description about the project..."
            value={projectForm.description}
            onChange={onChange}
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/80 focus:border-sky-500/80 transition resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-2.5 text-xs sm:text-sm font-medium text-white shadow-md shadow-sky-500/40 hover:shadow-lg hover:shadow-sky-500/50 hover:from-sky-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-950 transition"
          >
            + Add Project
          </button>
        </div>
      </form>
    </section>
  );
}

/* ======= CLIENTS ======= */
function ClientsSection({ clientForm, onChange, onSubmit }) {
  return (
    <section className="bg-slate-900/80 rounded-2xl border border-slate-800 shadow-xl shadow-slate-950/50 p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">
            Client Management
          </h2>
          <p className="text-[11px] text-slate-400">
            Add testimonials for the &quot;Happy Clients&quot; section.
          </p>
        </div>
        <span className="hidden sm:inline-flex rounded-full bg-violet-500/15 px-3 py-1 text-[10px] uppercase tracking-wide text-violet-200 border border-violet-500/40">
          POST /api/clients
        </span>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Client Image URL
            </label>
            <input
              name="imageUrl"
              placeholder="https://example.com/client.jpg"
              value={clientForm.imageUrl}
              onChange={onChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/80 focus:border-violet-500/80 transition"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Client Name
            </label>
            <input
              name="name"
              placeholder="John Doe"
              value={clientForm.name}
              onChange={onChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/80 focus:border-violet-500/80 transition"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Client Description
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Client feedback..."
              value={clientForm.description}
              onChange={onChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/80 focus:border-violet-500/80 transition resize-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Designation
            </label>
            <input
              name="designation"
              placeholder="CEO, TechCorp"
              value={clientForm.designation}
              onChange={onChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/80 focus:border-violet-500/80 transition"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2.5 text-xs sm:text-sm font-medium text-white shadow-md shadow-violet-500/40 hover:shadow-lg hover:shadow-violet-500/50 hover:from-violet-600 hover:to-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 focus:ring-offset-slate-950 transition"
          >
            + Add Client
          </button>
        </div>
      </form>
    </section>
  );
}

/* ======= CONTACTS TABLE ======= */
function ContactsSection({ contacts, onRefresh }) {
  return (
    <section className="bg-slate-900/80 rounded-2xl border border-slate-800 shadow-xl shadow-slate-950/50">
      <div className="flex items-center justify-between px-4 sm:px-5 pt-4 sm:pt-5 pb-3 border-b border-slate-800/80">
        <div>
          <h2 className="text-lg font-semibold">Contact Form Responses</h2>
          <p className="text-[11px] text-slate-400">
            Leads coming from hero &amp; contact forms. (GET /api/contacts)
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="text-[11px] sm:text-xs font-medium text-sky-300 hover:text-sky-200 border border-sky-500/50 rounded-full px-3 py-1 bg-sky-500/15 transition"
        >
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-xs sm:text-sm">
          <thead className="bg-slate-950/70">
            <tr>
              <th className=" sm:px-4 py-2  font-medium text-slate-300">
                Full Name
              </th>
              <th className="px-3 sm:px-4 py-2 font-medium text-slate-300">
                Email
              </th>
              <th className="px-3 sm:px-4 py-2  font-medium text-slate-300">
                Mobile
              </th>
              <th className="px-3 sm:px-4 py-2  font-medium text-slate-300">
                City
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {contacts.map((c) => (
              <tr key={c._id} className="hover:bg-slate-900/70 transition">
                <td className="px-3 sm:px-4 py-2.5">{c.fullName}</td>
                <td className="px-3 sm:px-4 py-2.5 text-slate-300">
                  {c.email}
                </td>
                <td className="px-3 sm:px-4 py-2.5 text-slate-300">
                  {c.mobile}
                </td>
                <td className="px-3 sm:px-4 py-2.5 text-slate-300">
                  {c.city}
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 sm:px-4 py-6 text-center text-slate-500 text-[11px] sm:text-xs"
                >
                  No contact submissions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ======= SUBSCRIBERS LIST ======= */
function SubscribersSection({ subscribers, onRefresh }) {
  return (
    <section className="bg-slate-900/80 rounded-2xl border border-slate-800 shadow-xl shadow-slate-950/50">
      <div className="flex items-center justify-between px-4 sm:px-5 pt-4 sm:pt-5 pb-3 border-b border-slate-800/80">
        <div>
          <h2 className="text-lg font-semibold">
            Newsletter Subscribers
          </h2>
          <p className="text-[11px] text-slate-400">
            Emails from the newsletter section. (GET /api/subscribers)
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="text-[11px] sm:text-xs font-medium text-sky-300 hover:text-sky-200 border border-sky-500/50 rounded-full px-3 py-1 bg-sky-500/15 transition"
        >
          Refresh
        </button>
      </div>

      <div className="p-4 sm:p-5">
        {subscribers.length === 0 ? (
          <p className="text-[11px] sm:text-xs text-slate-500">
            No subscribers yet. Once users subscribe, you&apos;ll see their
            emails here.
          </p>
        ) : (
          <ul className="space-y-2 text-xs sm:text-sm max-h-72 overflow-y-auto pr-1">
            {subscribers.map((s) => (
              <li
                key={s._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 border-b border-slate-800/70 last:border-0 pb-2 last:pb-0"
              >
                <span className="truncate text-slate-100">{s.email}</span>
                <span className="text-[10px] text-slate-400">
                  {new Date(s.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}


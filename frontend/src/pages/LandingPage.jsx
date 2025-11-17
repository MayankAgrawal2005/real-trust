


import { useEffect, useState } from "react";
import { api } from "../api";
import ContactForm from "../components/ContactForm";
import NewsletterForm from "../components/NewsletterForm";

export default function LandingPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  // Hero contact form (Get a Free Consultation)
  const [heroForm, setHeroForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [heroMsg, setHeroMsg] = useState("");
  const [heroStatus, setHeroStatus] = useState("idle");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, clientRes] = await Promise.all([
          api.get("/projects"),
          api.get("/clients"),
        ]);
        setProjects(projRes.data);
        setClients(clientRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, []);

  const handleHeroChange = (e) => {
    setHeroForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    setHeroMsg("");
    setHeroStatus("idle");
    try {
      await api.post("/contacts", heroForm);
      setHeroMsg("Thank you! We will contact you soon.");
      setHeroStatus("success");
      setHeroForm({ fullName: "", email: "", mobile: "", city: "" });
    } catch (err) {
      console.error(err);
      setHeroMsg("Something went wrong. Please try again.");
      setHeroStatus("error");
    }
  };

  return (
    <div className="bg-slate-50">
      {/* ================= HERO ================= */}
      <section
        id="hero"
        className="relative bg-slate-900 text-white overflow-hidden"
      >
        {/* Background image */}
        <img
          src="https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Team discussion"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/20" />

        <div className="relative max-w-6xl mx-auto px-4 py-16 lg:py-24 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
          {/* Left text */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-sky-200 mb-3">
              REAL TRUST • DIGITAL SOLUTIONS
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Consultation, Design
              <br />
              <span className="text-sky-300">&amp; Marketing</span>
            </h1>
            <p className="text-sm md:text-base text-slate-100/80 max-w-xl mb-6">
              We help you build, launch and scale your digital products with
              robust engineering, delightful design, and data-driven marketing.
            </p>

            <div className="flex flex-wrap gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-sky-500/20 flex items-center justify-center">
                  ✓
                </span>
                <span>End-to-end product engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-sky-500/20 flex items-center justify-center">
                  ✓
                </span>
                <span>Cloud-native scalable stack</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-sky-500/20 flex items-center justify-center">
                  ✓
                </span>
                <span>Design &amp; growth consulting</span>
              </div>
            </div>
          </div>

          {/* Right: Get a Free Consultation form */}
          <div className="bg-white rounded-2xl shadow-2xl shadow-slate-900/40 p-6 md:p-7 text-slate-900">
            <h2 className="text-xl font-semibold mb-1">
              Get a Free Consultation
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Share your details and we&apos;ll reach out with a tailored plan
              for your product.
            </p>

            <form onSubmit={handleHeroSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Full Name
                </label>
                <input
                  name="fullName"
                  value={heroForm.fullName}
                  onChange={handleHeroChange}
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={heroForm.email}
                  onChange={handleHeroChange}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Mobile Number
                </label>
                <input
                  name="mobile"
                  value={heroForm.mobile}
                  onChange={handleHeroChange}
                  required
                  placeholder="9876543210"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  City
                </label>
                <input
                  name="city"
                  value={heroForm.city}
                  onChange={handleHeroChange}
                  required
                  placeholder="Indore"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-md bg-orange-500 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition"
              >
                Schedule a Call
              </button>
            </form>

            {heroMsg && (
              <p
                className={`mt-3 text-xs ${
                  heroStatus === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {heroMsg}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ================= NOT YOUR AVERAGE / CIRCLES SECTION ================= */}
      <section className="max-w-6xl mx-auto px-4 py-14 md:py-18 grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-3">
            Not Your Average Product Partner
          </h2>
          <p className="text-sm md:text-base text-slate-600 mb-4">
            From idea to launch, we work as an extended part of your team. We
            combine strategy, design and engineering to ship products that
            actually move business metrics.
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• Discovery, prototyping &amp; UX design</li>
            <li>• Full-stack web &amp; mobile development</li>
            <li>• Cloud, DevOps &amp; observability setup</li>
            <li>• Continuous optimisation &amp; growth experiments</li>
          </ul>
        </div>

        {/* Circular images */}
        <div className="relative h-64 md:h-72">
          <div className="absolute left-6 top-4 h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src="https://images.pexels.com/photos/7731322/pexels-photo-7731322.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Team"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute right-2 md:right-10 top-16 h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Clients"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute left-20 bottom-0 h-28 w-28 md:h-32 md:w-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src="https://images.pexels.com/photos/1181400/pexels-photo-1181400.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Workspace"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-slate-800">
            Why Choose Us?
          </h2>
          <div className="mx-auto mt-2 mb-8 h-1 w-16 rounded-full bg-sky-500" />

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon="📈"
              title="Potential ROI"
              text="We focus on the metrics that matter, from activation and retention to lifetime value."
            />
            <FeatureCard
              icon="🎨"
              title="Design"
              text="Pixel-perfect, accessible and responsive interfaces that your users love to use."
            />
            <FeatureCard
              icon="⚙️"
              title="Engineering"
              text="Battle-tested MERN stack foundations, cloud-ready architecture and clean code."
            />
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-3">
            About Us
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto mb-6">
            With years of experience in product engineering and customer-first
            delivery, we partner with startups and enterprises to build digital
            products that scale. Clear communication, strong ownership and a
            bias for action are at the core of how we work.
          </p>
          <button className="inline-flex items-center justify-center rounded-full border border-sky-500 px-6 py-2 text-sm font-medium text-sky-600 hover:bg-sky-50">
            Learn More
          </button>
        </div>
      </section>

      {/* ================= OUR PROJECTS (from backend) ================= */}
      <section id="projects" className="bg-sky-50">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-slate-800">
            Our Projects
          </h2>
          <p className="text-center text-sm md:text-base text-slate-600 max-w-2xl mx-auto mt-2 mb-8">
             <code>/</code>
            . Add new projects from the Admin panel to see them here.
          </p>

          {projects.length === 0 ? (
            <p className="text-center text-sm text-slate-500">
              No projects added yet.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col"
                >
                  <div className="h-40 bg-slate-100 overflow-hidden">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-800 mb-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-600 mb-3 flex-1">
                      {p.description}
                    </p>
                    <button className="self-start rounded-full bg-orange-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-orange-600">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= HAPPY CLIENTS (from backend) ================= */}
      <section id="clients" className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-slate-800">
            Happy Clients
          </h2>
          <p className="text-center text-sm md:text-base text-slate-600 max-w-2xl mx-auto mt-2 mb-8">
            {/* Testimonials are also powered by your backend{" "}
            <code>/api/clients</code>. Add clients in the Admin panel. */}
          </p>

          {clients.length === 0 ? (
            <p className="text-center text-sm text-slate-500">
              No clients added yet.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {clients.map((c) => (
                <div
                  key={c._id}
                  className="bg-slate-50 rounded-xl shadow-sm border border-slate-100 p-5 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-200">
                      <img
                        src={c.imageUrl}
                        alt={c.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">
                        {c.name}
                      </h3>
                      <p className="text-[11px] text-sky-600">
                        {c.designation}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 flex-1">{c.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= CONTACT + NEWSLETTER ================= */}
      <section
        id="contact"
        className="bg-slate-900 text-white py-12 mt-4 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=1600)",
        }}
      >
        <div className="bg-slate-900/80">
          <div className="max-w-6xl mx-auto px-4 py-10 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                Let&apos;s Talk About Your Project
              </h2>
              <p className="text-sm md:text-base text-slate-200 mb-4">
                This contact form below is the same one stored in your backend
                <code className="ml-1 text-xs bg-slate-800 px-1.5 py-0.5 rounded">
                 
                </code>
                .
              </p>
              <ContactForm />
            </div>

            <div id="newsletter">
              <h3 className="text-xl font-semibold mb-3">
                Stay in the Loop — Subscribe
              </h3>
              <p className="text-sm text-slate-200 mb-4">
                Subscribe to our newsletter. Emails are saved via{" "}
                <code className="text-xs text-black bg-slate-800 px-1.5 py-0.5 rounded">
                  
                </code>
                .
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* Small reusable card for “Why Choose Us?” */
function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-slate-50 rounded-xl border border-slate-100 shadow-sm p-5 text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-lg">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-xs text-slate-600">{text}</p>
    </div>
  );
}

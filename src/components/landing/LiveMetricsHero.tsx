import { TrendingUp, Users, Clock, Zap } from "lucide-react";

export const LiveMetricsHero = () => {
  return (
    <section className="section relative overflow-hidden pt-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ backgroundColor: "var(--bg)" }} />
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: "rgba(0, 212, 170, 0.08)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: "rgba(99, 102, 241, 0.06)" }}
        />
      </div>

      <div className="container-landing">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Headline & Copy */}
          <div className="space-y-6">
            <h1
              className="text-5xl md:text-6xl font-bold leading-tight text-text"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Learn Any Language. Fluently.
            </h1>
            <p className="text-xl text-text-2">
              50,000+ learners are already speaking their target languages fluently. Join them with AI-powered personalised lessons that adapt to your pace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="btn-primary-landing">Get Started Free →</button>
              <button className="btn-ghost-landing">View Pricing</button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div>
                <p className="text-2xl font-bold text-accent" style={{ fontFamily: "var(--font-display)" }}>
                  50K+
                </p>
                <p className="text-sm text-text-3">Active Learners</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent" style={{ fontFamily: "var(--font-display)" }}>
                  40+
                </p>
                <p className="text-sm text-text-3">Languages</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent" style={{ fontFamily: "var(--font-display)" }}>
                  24/7
                </p>
                <p className="text-sm text-text-3">AI Tutor Access</p>
              </div>
            </div>
          </div>

          {/* Right: Live Metrics Dashboard */}
          <div
            className="rounded-2xl p-8 space-y-6"
            style={{
              backgroundColor: "var(--surface-2)",
              border: "1px solid var(--border)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            }}
          >
            <h3 className="text-lg font-bold text-text" style={{ fontFamily: "var(--font-display)" }}>
              Platform Stats — Live
            </h3>

            {/* Metric Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: "rgba(0, 212, 170, 0.05)" }}>
                <div className="flex items-center gap-3">
                  <Users size={20} style={{ color: "var(--accent)" }} />
                  <div>
                    <p className="text-sm text-text-3">Active Learners</p>
                    <p className="text-xl font-bold text-text">50,247</p>
                  </div>
                </div>
                <span className="text-accent text-sm font-bold">+18%</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }}>
                <div className="flex items-center gap-3">
                  <Clock size={20} style={{ color: "var(--success)" }} />
                  <div>
                    <p className="text-sm text-text-3">Hours Learned Today</p>
                    <p className="text-xl font-bold text-text">2,847</p>
                  </div>
                </div>
                <span className="text-success text-sm font-bold">+12%</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: "rgba(245, 158, 11, 0.05)" }}>
                <div className="flex items-center gap-3">
                  <TrendingUp size={20} style={{ color: "var(--warning)" }} />
                  <div>
                    <p className="text-sm text-text-3">Fluency Milestone</p>
                    <p className="text-xl font-bold text-text">2,341 Reached</p>
                  </div>
                </div>
                <span className="text-warning text-sm font-bold">+24%</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: "rgba(99, 102, 241, 0.05)" }}>
                <div className="flex items-center gap-3">
                  <Zap size={20} style={{ color: "#6366F1" }} />
                  <div>
                    <p className="text-sm text-text-3">Lessons Completed</p>
                    <p className="text-xl font-bold text-text">847,392</p>
                  </div>
                </div>
                <span style={{ color: "#6366F1" }} className="text-sm font-bold">+31%</span>
              </div>
            </div>

            <p className="text-xs text-text-3 text-center py-4">
              Updated every 30 seconds · Data as of just now
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

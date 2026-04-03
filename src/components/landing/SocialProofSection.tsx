export const SocialProofSection = () => {
  const companies = ["Google", "Microsoft", "Amazon", "Spotify", "Meta", "Apple"];

  return (
    <section className="section" style={{ backgroundColor: "var(--surface)" }}>
      <div className="container-landing text-center">
        <p className="text-text-2 text-sm mb-8">Used by learners from companies including:</p>

        {/* Logo Strip */}
        <div className="overflow-hidden">
          <div className="flex gap-12 justify-center flex-wrap">
            {companies.map((company) => (
              <div
                key={company}
                className="text-text-3 hover:text-text transition-colors duration-300 text-lg font-semibold opacity-40 hover:opacity-80"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

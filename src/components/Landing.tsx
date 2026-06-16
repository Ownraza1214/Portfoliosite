import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {firstName.toUpperCase()}
              {' '}
              <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
            </h1>
          </div>
          <div className="landing-info">
            <h3>An</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">AI Researcher</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Mech Engineer</div>
            </h2>
          </div>

          {/* Mobile-only full hero */}
          <div className="mobile-hero">
            <div className="mobile-hero-photo">
              <div className="mobile-hero-glow"></div>
              <img src="/images/profile.png" alt="Muhammad Own Raza" loading="eager" fetchPriority="high" />
            </div>
            <div className="mobile-hero-text">
              <p className="mobile-hero-greeting">Hello, I'm</p>
              <h1 className="mobile-hero-name">Muhammad<br />Own Raza</h1>
              <div className="mobile-hero-roles">
                <span className="mobile-role-pill">AI Researcher</span>
                <span className="mobile-role-pill mobile-role-pill--outline">Mech Engineer</span>
              </div>
              <p className="mobile-hero-bio">
                PIEAS University · Computer vision, deep learning & fault detection
              </p>
              <div className="mobile-hero-stats">
                <div className="mobile-stat">
                  <span className="mobile-stat-num">4</span>
                  <span className="mobile-stat-label">Papers</span>
                </div>
                <div className="mobile-stat-divider"></div>
                <div className="mobile-stat">
                  <span className="mobile-stat-num">3+</span>
                  <span className="mobile-stat-label">Years XP</span>
                </div>
                <div className="mobile-stat-divider"></div>
                <div className="mobile-stat">
                  <span className="mobile-stat-num">8</span>
                  <span className="mobile-stat-label">Projects</span>
                </div>
              </div>
              <div className="mobile-hero-cta">
                <a href="#work" className="mobile-cta-btn">View Projects</a>
                <a href={`mailto:${config.contact.email}`} className="mobile-cta-btn mobile-cta-btn--outline">Hire Me</a>
              </div>
            </div>
            <div className="mobile-scroll-hint">
              <div className="mobile-scroll-line"></div>
              <span>scroll</span>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;

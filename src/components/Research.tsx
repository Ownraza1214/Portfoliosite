import "./styles/Research.css";
import { MdArrowOutward } from "react-icons/md";

const papers = [
  {
    year: "2025",
    citations: 1,
    title: "Physics Informed Deep Learning for Real Time Optimization of PEM Fuel Cells in Electric Vehicles",
    authors: "MO Raza, M Hanzla, AR Shinwari",
    topics: ["Deep Learning", "PEM Fuel Cells", "EV Optimization", "PINNs"],
    link: "https://scholar.google.com/citations?user=aZGZaqQAAAAJ&hl=en",
  },
  {
    year: "2025",
    citations: 1,
    title: "Advanced Flood Risk Assessment Using a Novel Hybrid Transformer-SE-ANN Framework",
    authors: "MO Raza, M Hanzla, AR Shinwari",
    topics: ["Transformer", "SE-ANN", "Flood Risk", "Hybrid Model"],
    link: "https://scholar.google.com/citations?user=aZGZaqQAAAAJ&hl=en",
  },
  {
    year: "2026",
    citations: 0,
    title: "Physics-Informed Neural Networks Optimized by the Whale Optimization Algorithm for Cavitation Fault Detection in Centrifugal Pumps",
    authors: "MO Raza",
    topics: ["PINNs", "WOA", "Fault Detection", "Centrifugal Pumps"],
    link: "https://github.com/Ownraza1214/WOA-PINNS-",
  },
  {
    year: "2026",
    citations: 0,
    title: "Balancing Progress and Ethics in AI: A Survey of Opportunities, Risks, and Responsible Innovation",
    authors: "A Khan, N Shaukat, S Jamshed, A Jamal, MO Raza, Z Asghar, et al.",
    topics: ["AI Ethics", "Survey", "Responsible AI"],
    link: "https://scholar.google.com/citations?user=aZGZaqQAAAAJ&hl=en",
  },
];

const Research = () => {
  return (
    <div className="research-section section-container" id="research">
      <div className="research-container">
        <div className="research-header">
          <h2>Published <span>Work.</span></h2>
          <p>Peer-reviewed and pre-print research in AI, mechanical systems, and fault detection.</p>
        </div>

        <div className="research-scholar-card">
          <div className="scholar-info">
            <div className="scholar-avatar">MOR</div>
            <div className="scholar-details">
              <h4>Muhammad Own Raza</h4>
              <p>PIEAS University · Mechanical Engineering</p>
            </div>
          </div>
          <div className="scholar-stats">
            <div className="scholar-stat">
              <span className="stat-num">4</span>
              <span className="stat-label">Papers</span>
            </div>
            <div className="scholar-stat">
              <span className="stat-num">2</span>
              <span className="stat-label">Citations</span>
            </div>
            <div className="scholar-stat">
              <span className="stat-num">1</span>
              <span className="stat-label">h-index</span>
            </div>
          </div>
          <a
            href="https://scholar.google.com/citations?user=aZGZaqQAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="scholar-link"
            data-cursor="disable"
          >
            Google Scholar <MdArrowOutward />
          </a>
        </div>

        <div className="research-papers">
          {papers.map((paper, index) => (
            <a
              key={index}
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="research-paper-card"
              data-cursor="disable"
            >
              <div className="paper-meta">
                <span className="paper-year">{paper.year}</span>
                {paper.citations > 0 && (
                  <span className="paper-citations">{paper.citations} citation{paper.citations > 1 ? "s" : ""}</span>
                )}
                {paper.citations === 0 && <span className="paper-preprint">Pre-print</span>}
              </div>
              <h3 className="paper-title">{paper.title}</h3>
              <p className="paper-authors">{paper.authors}</p>
              <div className="paper-topics">
                {paper.topics.map((topic, i) => (
                  <span key={i} className="paper-tag">{topic}</span>
                ))}
              </div>
              <span className="paper-arrow"><MdArrowOutward /></span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Research;

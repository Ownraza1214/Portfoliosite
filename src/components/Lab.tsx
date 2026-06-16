import "./styles/Lab.css";

const labItems = [
  {
    label: "Short Demo",
    title: "Condition Monitoring Apparatus",
    description:
      "Quick look at the custom-built apparatus — real-time vibration & sensor acquisition from rotating machinery in PIEAS lab. Designed and built from scratch.",
    tags: ["Hardware", "Vibration Sensors", "Real-time DAQ", "PIEAS"],
    videoId: "mSLoh51Qksw",
    isShort: true,
  },
  {
    label: "Full Demo",
    title: "CEP — Condition Monitoring System",
    description:
      "Full walkthrough of the condition monitoring platform — from sensor setup to data pipeline and fault detection output. End-to-end predictive maintenance system.",
    tags: ["Predictive Maintenance", "Fault Detection", "Signal Processing", "Python"],
    videoId: "fhBt45Rq4mk",
    isShort: false,
  },
];

const Lab = () => {
  return (
    <div className="lab-section section-container" id="lab">
      <div className="lab-container">
        <div className="lab-header">
          <h2>In The <span>Lab.</span></h2>
          <p>
            Hands-on hardware — condition monitoring apparatus designed &amp; built
            at PIEAS University.
          </p>
        </div>

        <div className="lab-highlights">
          <div className="lab-highlight-item">
            <span className="highlight-dot"></span>
            Custom-built hardware from scratch
          </div>
          <div className="lab-highlight-item">
            <span className="highlight-dot"></span>
            Real-time multi-sensor data acquisition
          </div>
          <div className="lab-highlight-item">
            <span className="highlight-dot"></span>
            PIEAS CEP Research Project
          </div>
        </div>

        <div className="lab-grid">
          {labItems.map((item, index) => (
            <div className="lab-card" key={index}>
              <div className="lab-video-embed">
                <div className="lab-video-label">{item.label}</div>
                <iframe
                  src={`https://www.youtube.com/embed/${item.videoId}?loading=lazy`}
                  title={item.title}
                  frameBorder="0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="lab-card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="lab-tags">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="lab-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lab;

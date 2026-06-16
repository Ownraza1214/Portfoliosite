import "./styles/Resilience.css";

const stories = [
  {
    icon: "✕",
    type: "Admission Rejected",
    institution: "NUST — National University of Sciences and Technology",
    description:
      "Applied to one of Pakistan's most selective engineering universities. Rejected. At the time it felt like the end; in hindsight it was the first engineering problem to solve: building a career when the preferred door closes.",
    lesson: "The door I wanted closed. I built my own.",
  },
  {
    icon: "📉",
    type: "Academic Failure",
    institution: "Failed First Two Semesters at University",
    description:
      "Year one was brutal — failed both semesters. Could have quit; instead stripped everything back, rebuilt the learning approach, and came back harder. Students who fail and return often understand material more deeply than those who never struggled.",
    lesson: "Failure is just a data point. Retrain the model.",
  },
  {
    icon: "📄",
    type: "Paper Rejected",
    institution: "Journal of Machine Learning — Multiple Submissions",
    description:
      "Submitted research, rejected multiple times. Reviewers cited insufficient novelty, weak baselines, unclear methodology. Each rejection included feedback that sharpened the next version. Eventually published after iterations.",
    lesson: "Peer review is free consulting. Collect the rejections.",
  },
  {
    icon: "📄",
    type: "Paper Rejected",
    institution: "International Journal of Engineering and Applied Sciences",
    description:
      "Another rejection. Another late night rewriting, redoing experiments, questioning everything. The research was sound — the version wasn't ready. It will be.",
    lesson: "The paper isn't rejected. The version is.",
  },
];

const Resilience = () => {
  return (
    <div className="resilience-section section-container" id="resilience">
      <div className="resilience-container">
        <div className="resilience-header">
          <h2>The Falls. <span>The Rises.</span></h2>
          <p className="resilience-subtitle">The real resume. Every rejection, every failure — and what came after.</p>
        </div>

        <blockquote className="resilience-quote">
          "The strongest steel is forged in the hottest fire."
        </blockquote>

        <p className="resilience-intro">
          Most portfolios show only the wins. This one doesn't. Here is where I was forged.
        </p>

        <div className="resilience-stories">
          {stories.map((story, index) => (
            <div className="resilience-card" key={index}>
              <div className="resilience-icon">{story.icon}</div>
              <div className="resilience-content">
                <div className="resilience-meta">
                  <span className="resilience-type">{story.type}</span>
                </div>
                <h3>{story.institution}</h3>
                <p>{story.description}</p>
                <div className="resilience-lesson">
                  <span className="lesson-label">Lesson</span>
                  <span className="lesson-text">"{story.lesson}"</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="resilience-closing">
          This section exists because every engineer you admire has a graveyard of rejections.
          The ones who succeed aren't those who never failed — they're those who kept engineering anyway.
        </p>
      </div>
    </div>
  );
};

export default Resilience;

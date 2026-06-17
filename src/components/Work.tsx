import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "../config";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    ScrollTrigger.refresh();

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {config.projects.slice(0, 7).map((project, index) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p className="work-category">{project.category}</p>
                  </div>
                </div>
                <p className="work-description">{project.description}</p>
                <div className="work-tech-row">
                  {project.technologies.split(", ").slice(0, 4).map((tech, i) => (
                    <span key={i} className="work-tech-tag">{tech}</span>
                  ))}
                </div>
                {(project as any).github && (
                  <a
                    href={(project as any).github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-github-link"
                    data-cursor="disable"
                    onClick={e => e.stopPropagation()}
                  >
                    <FaGithub /> View on GitHub <MdArrowOutward />
                  </a>
                )}
              </div>
              <div className="work-image-placeholder">
                <div className="work-img-icon">
                  {index === 0 && "⚙"}
                  {index === 1 && "🔬"}
                  {index === 2 && "🌊"}
                  {index === 3 && "👁"}
                  {index === 4 && "📡"}
                  {index === 5 && "⚙"}
                  {index === 6 && "🔧"}
                </div>
                <div className="work-img-number">0{index + 1}</div>
              </div>
            </div>
          ))}
          <div className="work-box work-box-cta">
            <div className="see-all-works">
              <h3>Want to see more?</h3>
              <p>Explore all projects and research</p>
              <a
                href="https://github.com/Ownraza1214"
                target="_blank"
                rel="noopener noreferrer"
                className="see-all-btn"
                data-cursor="disable"
              >
                GitHub Profile →
              </a>
              <Link to="/myworks" className="see-all-btn see-all-btn-outline" data-cursor="disable">
                See All Works →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;

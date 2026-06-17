import { PropsWithChildren, useEffect } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStackNew from "./TechStackNew";
import CallToAction from "./CallToAction";
import Research from "./Research";
import Lab from "./Lab";
import Resilience from "./Resilience";
import setSplitText from "./utils/splitText";

const MainContainer = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const resizeHandler = () => { setSplitText(); };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => { window.removeEventListener("resize", resizeHandler); };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {children}
      <div className="container-main">
        <Landing />
        <About />
        <WhatIDo />
        <Career />
        <Work />
        <Lab />
        <Research />
        <TechStackNew />
        <Resilience />
        <CallToAction />
        <Contact />
      </div>
    </div>
  );
};

export default MainContainer;

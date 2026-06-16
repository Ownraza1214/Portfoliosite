export const config = {
    developer: {
        name: "Own Raza",
        fullName: "Muhammad Own Raza",
        title: "Mechanical Engineer & AI Researcher",
        description: "Mechanical engineering student at PIEAS focused on intelligent systems spanning physics, data, and machine learning. Specializes in computer vision, predictive maintenance via deep learning, and fault detection using Vision Transformers and Mamba SSM."
    },
    social: {
        github: "Ownraza1214",
        email: "ownraza1214@gmail.com",
        location: "Pakistan"
    },
    about: {
        title: "About Me",
        description: "I am a Mechanical Engineering student at PIEAS University, Pakistan, working at the intersection of physics, data, and machine learning. My research focuses on computer vision for human tracking, predictive maintenance via deep learning, and fault detection using Vision Transformers and Mamba SSM. I have published 4 research papers, built real-world CV systems at Hylay.ai, and designed custom condition monitoring hardware from scratch. I bridge the gap between mechanical systems and intelligent algorithms — turning sensor data into actionable intelligence."
    },
    experiences: [
        {
            position: "AI Engineer",
            company: "Upwork + Open Contracts",
            period: "2024 - Present",
            location: "Remote",
            description: "Building AI and computer vision systems for clients worldwide. Developing predictive ML models and deploying real-world intelligent systems across various domains.",
            responsibilities: [
                "Developing computer vision pipelines for client projects",
                "Building predictive ML models for industrial applications",
                "Delivering end-to-end AI solutions from research to deployment",
                "Collaborating with international clients on AI-driven products"
            ],
            technologies: ["Python", "PyTorch", "OpenCV", "YOLO", "FastAPI", "AI Systems"]
        },
        {
            position: "Computer Vision Engineer",
            company: "Hylay.ai",
            period: "Summer 2024",
            location: "Remote, Contract",
            description: "Developed computer vision solutions for healthcare AI and supply chain optimization. Built real-time tracking and detection systems using state-of-the-art deep learning models.",
            responsibilities: [
                "Building CV pipelines for healthcare AI applications",
                "Developing supply chain computer vision systems",
                "Optimizing real-time object detection and tracking",
                "Deploying production-grade CV models"
            ],
            technologies: ["Python", "OpenCV", "PyTorch", "YOLO", "Healthcare AI", "Supply Chain"]
        },
        {
            position: "AI/ML Self-Study",
            company: "Career Pivot",
            period: "Mid-2023",
            location: "Pakistan",
            description: "Dedicated 6-month intensive self-taught period transitioning from design to AI engineering. Mastered Python, PyTorch, OpenCV, and ML fundamentals from scratch.",
            responsibilities: [
                "Learning Python, PyTorch, and deep learning fundamentals",
                "Mastering OpenCV and computer vision techniques",
                "Building ML projects to solidify theoretical knowledge",
                "Transitioning into AI engineering career track"
            ],
            technologies: ["Python", "PyTorch", "OpenCV", "ML Fundamentals", "Deep Learning"]
        },
        {
            position: "Freelance Graphic Designer",
            company: "Fiverr",
            period: "2022",
            location: "Remote",
            description: "Provided freelance graphic design services on Fiverr. Created brand identities, book covers for Amazon KDP, and visual content for clients worldwide.",
            responsibilities: [
                "Designing logos and brand identity materials",
                "Creating Amazon KDP book cover designs",
                "Delivering client projects on Canva, Illustrator, and Photoshop",
                "Building strong client communication and delivery skills"
            ],
            technologies: ["Adobe Illustrator", "Canva", "Photoshop", "Amazon KDP", "Visual Design"]
        }
    ],
    projects: [
        {
            id: 1,
            title: "MechAI",
            category: "AI / Predictive Maintenance",
            technologies: "Python, TypeScript, LSTM, Deep Learning, Sensor Fusion",
            image: "/images/project1.png",
            description: "End-to-end platform for remaining useful life (RUL) prediction in turbofan engines. Uses deep learning on N-CMAPSS multi-sensor data for predictive maintenance in aerospace and industrial systems.",
            github: "https://github.com/Ownraza1214/MechAI"
        },
        {
            id: 2,
            title: "MSViTFD Dual-Freq Mamba",
            category: "AI / Fault Detection",
            technologies: "Python, Vision Transformer, Mamba SSM, Signal Processing",
            image: "/images/project2.png",
            description: "Multi-scale Vision Transformer combined with Mamba SSM for rotating machinery fault detection. Processes dual-frequency vibration signals for highly accurate bearing and gear fault classification.",
            github: "https://github.com/Ownraza1214"
        },
        {
            id: 3,
            title: "WOA-PINNs Pump Fault",
            category: "AI / Physics-Informed ML",
            technologies: "Python, TensorFlow, PINNs, Whale Optimization Algorithm",
            image: "/images/project3.png",
            description: "Physics-informed neural networks optimized by the Whale Optimization Algorithm for cavitation fault detection in centrifugal pumps. Combines physical equations with deep learning for superior fault diagnosis.",
            github: "https://github.com/Ownraza1214/WOA-PINNS-"
        },
        {
            id: 4,
            title: "Advanced CV Suite",
            category: "Computer Vision",
            technologies: "Python, OpenCV, MediaPipe, Real-time Processing",
            image: "/images/project4.png",
            description: "Real-time computer vision toolkit featuring face mesh, hand tracking, pose estimation, and air writing. Built with MediaPipe and OpenCV for high-performance human-computer interaction systems.",
            github: "https://github.com/Ownraza1214/Advanced-CV-Projects-MediaPipe"
        },
        {
            id: 5,
            title: "Deep Surveillance Monitor",
            category: "Computer Vision / Security",
            technologies: "Python, Jupyter, OpenCV, Deep Learning, YOLO",
            image: "/images/project5.png",
            description: "Deep learning-based intelligent surveillance system with real-time object detection, human tracking, and anomaly detection. Designed for security and monitoring applications.",
            github: "https://github.com/Ownraza1214/Deep-Surveillance-Monitor"
        },
        {
            id: 6,
            title: "GearOptix",
            category: "Mechanical Engineering",
            technologies: "Gear Theory, Optimization, Transmission Design, MATLAB",
            image: "/images/project6.png",
            description: "Advanced transmission design suite for automated gear train synthesis and optimization. Enables engineers to design optimal drivetrain configurations with multi-objective optimization algorithms.",
            github: "https://github.com/Ownraza1214/GearOptix"
        },
        {
            id: 7,
            title: "mechforge",
            category: "Open Source / Engineering",
            technologies: "Python, Kinematics, Mechanical Engineering, Open Source",
            image: "/images/project7.png",
            description: "Open-source Python package for performing all fundamental mechanical engineering calculations. Covers kinematics, dynamics, thermodynamics, and structural analysis — a toolkit for engineers.",
            github: "https://github.com/Ownraza1214/mechforge"
        },
        {
            id: 8,
            title: "Research Publications",
            category: "Academic Research",
            technologies: "PINNs, Vision Transformers, Flood Risk, AI Ethics",
            image: "/images/project8.png",
            description: "4 published papers including: Physics-Informed Deep Learning for PEM Fuel Cell Optimization, Hybrid Transformer-SE-ANN for Flood Risk Assessment, WOA-PINNs for Pump Fault Detection, and a survey on AI Ethics. 2 citations, h-index 1.",
            github: "https://scholar.google.com/citations?user=aZGZaqQAAAAJ&hl=en"
        }
    ],
    contact: {
        email: "ownraza1214@gmail.com",
        github: "https://github.com/Ownraza1214",
        linkedin: "https://www.linkedin.com/in/muhammad-own-raza-457261252",
        twitter: "https://x.com/ownraza1214",
        facebook: "https://www.facebook.com/ownraza1214",
        instagram: "https://www.instagram.com/m_a_raza1214/",
        scholar: "https://scholar.google.com/citations?user=aZGZaqQAAAAJ&hl=en"
    },
    skills: {
        develop: {
            title: "AI RESEARCHER",
            description: "Computer vision, deep learning & fault detection",
            details: "Researching and building AI systems for mechanical engineering: predictive maintenance, fault detection with Vision Transformers and Mamba SSM, computer vision pipelines, and physics-informed neural networks.",
            tools: ["Python", "PyTorch", "TensorFlow", "Hugging Face", "NumPy", "Pandas", "Scikit-learn", "OpenCV", "YOLO", "MySQL", "PostgreSQL", "C", "C++"]
        },
        design: {
            title: "MECH ENGINEER",
            description: "FEA, vibration analysis & mechanical design",
            details: "Designing and analyzing mechanical systems with a focus on condition monitoring, vibration analysis, and transmission design. Building custom hardware for real-time sensor data acquisition at PIEAS University.",
            tools: ["SolidWorks", "ANSYS", "MATLAB", "Fusion 360", "Onshape", "AutoCAD", "Octave", "Excel", "FEA/FEM", "Signal Processing", "Vibration Analysis"]
        }
    }
};

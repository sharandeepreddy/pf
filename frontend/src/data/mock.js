// Mock data for Sharandeep Reddy's AI Portfolio

export const personalInfo = {
  name: "Sharandeep Reddy Adla",
  title: "AI/ML Engineer & Data Scientist",
  location: "Buffalo, NY, USA",
  phone: "+1 (716) 750-9326",
  email: "sharanreddy.adla@gmail.com",
  universityEmail: "sharande@buffalo.edu",
  linkedin: "https://www.linkedin.com/in/sharandeep-reddy",
  github: "https://github.com/sharan-555/",
  bio: "Passionate AI/ML Engineer with expertise in deep learning, NLP, and predictive modeling. Currently pursuing Master's in Data Science at University at Buffalo with hands-on experience at AWS and Afame Technologies."
};

export const education = [
  {
    id: 1,
    degree: "Master's in Data Science (MPS)",
    institution: "University at Buffalo, NY, USA",
    duration: "Aug 2024 – Present",
    gpa: "3.704",
    status: "current"
  },
  {
    id: 2,
    degree: "B.Tech in Electronics and Computer Engineering",
    institution: "Sreenidhi Institute of Science and Technology, Hyderabad",
    duration: "2020 – 2024",
    gpa: "8.3 CGPA",
    status: "completed"
  }
];

export const experience = [
  {
    id: 1,
    title: "Data Scientist Intern",
    company: "Afame Technologies",
    duration: "Jan 2024 – Mar 2024",
    achievements: [
      "Improved ML model accuracy by 20%",
      "Optimized inference speed by 30%",
      "Applied feature engineering and hyperparameter tuning",
      "Enhanced big data scalability"
    ]
  },
  {
    id: 2,
    title: "AI Engineer Intern",
    company: "Amazon Web Services (AWS)",
    duration: "Dec 2022 – Feb 2023",
    achievements: [
      "Built and fine-tuned NLP models using Hugging Face",
      "Integrated OpenAI API for enhanced functionality",
      "Deployed AI workflows in cloud environment",
      "Collaborated with cross-functional teams"
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "Heart Disease Prediction Using ML & XAI",
    description: "Advanced machine learning model for heart disease prediction with explainable AI components. Published at ICOTET 2024 conference.",
    tech: ["Python", "Scikit-learn", "XAI", "Pandas", "Matplotlib"],
    github: "https://github.com/sharan-555/heart-disease-prediction",
    demo: "https://heart-disease-ml.netlify.app",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    status: "Published"
  },
  {
    id: 2,
    title: "Handwritten Digit & Facial Recognition",
    description: "Comparative study between DNN and CNN architectures. CNN achieved 98% accuracy, outperforming DNN by 12%.",
    tech: ["TensorFlow", "Keras", "OpenCV", "CNN", "DNN"],
    github: "https://github.com/sharan-555/digit-face-recognition",
    demo: "https://digit-recognition-ai.netlify.app",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
    status: "Completed"
  },
  {
    id: 3,
    title: "SQL-Based Swimmer Club Management",
    description: "Comprehensive class and supply chain management system for swimmer club, managing 500+ members and 100+ inventory items.",
    tech: ["SQL", "DBMS", "Python", "Streamlit", "PostgreSQL"],
    github: "https://github.com/sharan-555/swimmer-club-management",
    demo: "https://swimmer-management.herokuapp.com",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop",
    status: "Deployed"
  },
  {
    id: 4,
    title: "AI-Powered Sentiment Analysis",
    description: "Real-time sentiment analysis tool using transformer models and natural language processing techniques.",
    tech: ["Transformers", "Hugging Face", "NLP", "React", "FastAPI"],
    github: "https://github.com/sharan-555/sentiment-analysis-ai",
    demo: "https://sentiment-ai-tool.netlify.app",
    image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=400&h=250&fit=crop",
    status: "In Progress"
  }
];

export const skills = {
  frontend: ["HTML", "CSS", "JavaScript", "React.js", "Streamlit", "Gradio"],
  backend: ["Python", "SQL", "DBMS", "FastAPI", "Node.js"],
  aiml: ["Scikit-learn", "Transformers", "NLP", "Predictive Modeling", "XAI", "TensorFlow", "Keras"],
  visualization: ["Matplotlib", "Seaborn", "Plotly", "D3.js"],
  deployment: ["GitHub", "Netlify", "PythonAnywhere", "Heroku", "Hugging Face"]
};

export const certifications = [
  {
    id: 1,
    name: "Cognizant AI Virtual Experience",
    issuer: "Cognizant",
    date: "2023",
    credential: "CTS-AI-2023"
  },
  {
    id: 2,
    name: "Microsoft AI Skills Challenge",
    issuer: "Microsoft",
    date: "2023",
    credential: "MS-AI-SC-2023"
  },
  {
    id: 3,
    name: "IBM ML with Python Level 1",
    issuer: "IBM",
    date: "2022",
    credential: "IBM-ML-PY-L1"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Senior Data Scientist, Tech Innovations",
    content: "Sharandeep's work on explainable AI is exceptional. His ability to combine technical depth with clear communication makes him a valuable team member.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "AI Research Lead, AWS",
    content: "During his internship, Sharandeep demonstrated remarkable problem-solving skills and delivered high-quality NLP solutions that exceeded expectations.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Prof. Emily Rodriguez",
    title: "Data Science Program Director, UB",
    content: "Sharandeep's academic performance and research contributions in data science showcase his dedication to advancing AI/ML applications.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  }
];

export const chatbotResponses = {
  greeting: "Hi! I'm Sharandeep's AI assistant. I can answer questions about his experience, projects, and skills. What would you like to know?",
  experience: "Sharandeep has worked as a Data Scientist Intern at Afame Technologies and AI Engineer Intern at AWS, with proven track record of improving model performance and deploying scalable solutions.",
  skills: "His expertise spans across Python, Machine Learning, NLP, Deep Learning, and cloud deployment. He's particularly strong in explainable AI and predictive modeling.",
  education: "He's currently pursuing Master's in Data Science at University at Buffalo (GPA: 3.704) and holds a B.Tech in Electronics and Computer Engineering (CGPA: 8.3).",
  projects: "Notable projects include Heart Disease Prediction with XAI (published at ICOTET 2024), CNN vs DNN comparison achieving 98% accuracy, and a comprehensive swimmer club management system.",
  contact: "You can reach Sharandeep at sharanreddy.adla@gmail.com or +1 (716) 750-9326. He's also active on LinkedIn and GitHub."
};
import React from 'react';
import './About.css';
import { Code2, Palette, Rocket, Users } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    {
      icon: <Code2 size={24} />,
      title: 'Full-Stack Development',
      description: 'Building scalable web applications with React, TypeScript, Node.js, and modern frameworks.',
    },
    {
      icon: <Palette size={24} />,
      title: 'UI/UX Design',
      description: 'Creating intuitive and beautiful user interfaces with attention to detail and user experience.',
    },
    {
      icon: <Rocket size={24} />,
      title: 'Cloud & DevOps',
      description: 'Deploying and managing applications on AWS, Azure, and implementing CI/CD pipelines.',
    },
    {
      icon: <Users size={24} />,
      title: 'Team Collaboration',
      description: 'Working effectively with cross-functional teams using Agile methodologies and best practices.',
    },
  ];

  const technologies = [
    'React', 'TypeScript', 'Node.js', 'Python',
    'PostgreSQL', 'MongoDB', 'AWS', 'Docker',
    'Git', 'REST APIs', 'GraphQL', 'Tailwind CSS'
  ];

  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-header">
          <span className="section-label">About Me</span>
          <h2 className="section-title">Building Digital Experiences</h2>
          <p className="section-description">
            I'm a passionate full-stack developer with a focus on creating elegant, 
            performant, and user-friendly web applications. With several years of experience, 
            I bring ideas to life through clean code and thoughtful design.
          </p>
        </div>

        <div className="about-content">
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <div className="skill-icon">{skill.icon}</div>
                <h3 className="skill-title">{skill.title}</h3>
                <p className="skill-description">{skill.description}</p>
              </div>
            ))}
          </div>

          <div className="tech-section">
            <h3 className="tech-title">Technologies I Work With</h3>
            <div className="tech-tags">
              {technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

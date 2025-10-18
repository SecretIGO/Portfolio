import React from 'react';
import './About.css';
import { Code2, Palette, Rocket, Users } from 'lucide-react';
import Container from '../../_ui_library/container/Container';
import Section from '../../_ui_library/section/Section';

const About: React.FC = () => {
  const skills = [
    {
      icon: <Code2 size={24} />,
      title: 'Full-Stack Development',
      description: 'test look',
    },
    {
      icon: <Palette size={24} />,
      title: 'UI/UX Design',
      description: 'designing sht',
    },
    {
      icon: <Rocket size={24} />,
      title: 'Understanding Concepts',
      description: 'concepts sht',
    },
    {
      icon: <Users size={24} />,
      title: 'Team Collaboration',
      description: 'basically doing my best',
    },
  ];

  const technologies = [
    'React', 'TypeScript', 'Node.js', 'Python',
    'PostgreSQL', 'MongoDB', 'Firebase', 'Docker',
    'Git', 'REST APIs', 'Kotlin', 'HTML', 'CSS'
  ];

  return (
    <Section className="about" id="about">
      <Container max="2xl" padding="md">
        <div className="about-header">
          <span className="section-label">About Me</span>
          <h2 className="section-title">Building Digital Experiences</h2>
          <p className="section-description">
            I'm a passionate full-stack developer with a focus on creating elegant, 
            performant, and user-friendly web applications.
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
      </Container>
    </Section>
  );
};

export default About;

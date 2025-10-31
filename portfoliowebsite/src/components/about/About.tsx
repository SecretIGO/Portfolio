import React from 'react';
import { Code2, Palette, Rocket, Users } from 'lucide-react';
import 'devicon/devicon.min.css';

import Container from '../../_ui_library/container/Container';
import Section from '../../_ui_library/section/Section';
import Tag from '../../_ui_library/tag/Tag';

import { techCategories } from '../../data/landingpage/about';
import './About.css';

interface TechItem {
  name: string;
  icon: string;
}

interface TechCategoryProps {
  title: string;
  technologies: TechItem[];
}

const TechCategory: React.FC<TechCategoryProps> = ({ title, technologies }) => {
  return (
    <div className="tech-category">
      <h4 className="tech-category-title">{title}</h4>
      <div className="tech-tags">
        {technologies.map((tech, index) => (
          <Tag
            key={index}
            variant="soft"
            size="md"
            radius="md"
            leftIconName={tech.icon}
            className="tech-tag"
          >
            {tech.name}
          </Tag>
        ))}
      </div>
    </div>
  );
};

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

                        <TechCategory 
                          title="Frontend" 
                          technologies={techCategories.frontend} 
                        />
                        
                        <TechCategory 
                          title="Backend" 
                          technologies={techCategories.backend} 
                        />
                        
                        <TechCategory 
                          title="Frameworks" 
                          technologies={techCategories.frameworks} 
                        />
                        
                        <TechCategory 
                          title="Database" 
                          technologies={techCategories.database} 
                        />
                        
                        <TechCategory 
                          title="Tools & Development" 
                          technologies={techCategories.tools} 
                        />
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default About;

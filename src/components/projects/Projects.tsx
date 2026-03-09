import React from 'react';
import Container from '../../core/components/container/Container';
import Section from '../../core/components/section/Section';
import './Projects.css';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    github?: string;
    demo?: string;
    featured?: boolean;
}

const Projects: React.FC = () => {
    const projects: Project[] = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            description: 'A full-featured e-commerce platform with payment integration, inventory management, and real-time analytics.',
            image: '/images/SecretIGO_ico.png',
            tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
            github: 'https://github.com',
            demo: 'https://demo.com',
            featured: true,
        },
        {
            id: 2,
            title: 'Task Management App',
            description: 'Collaborative task management tool with real-time updates, team collaboration features, and deadline tracking.',
            image: '/images/SecretIGO_ico.png',
            tags: ['TypeScript', 'React', 'Firebase', 'Tailwind'],
            github: 'https://github.com',
            demo: 'https://demo.com',
        },
        {
            id: 3,
            title: 'AI Content Generator',
            description: 'AI-powered content generation tool using OpenAI API to create marketing copy, blog posts, and social media content.',
            image: '/images/SecretIGO_ico.png',
            tags: ['Next.js', 'OpenAI', 'MongoDB', 'Python'],
            github: 'https://github.com',
            demo: 'https://demo.com',
        },
        {
            id: 4,
            title: 'Weather Dashboard',
            description: 'Real-time weather dashboard with forecasts, historical data, and beautiful data visualizations.',
            image: '/images/SecretIGO_ico.png',
            tags: ['React', 'D3.js', 'Weather API', 'CSS'],
            github: 'https://github.com',
            demo: 'https://demo.com',
        },
        {
            id: 5,
            title: 'Social Media Analytics',
            description: 'Analytics platform for tracking social media metrics, engagement rates, and audience insights across platforms.',
            image: '/images/SecretIGO_ico.png',
            tags: ['Vue.js', 'Express', 'Redis', 'Chart.js'],
            github: 'https://github.com',
            demo: 'https://demo.com',
        },
        {
            id: 6,
            title: 'Portfolio CMS',
            description: 'Headless CMS for managing portfolio content with a modern admin panel and API-first approach.',
            image: '/images/SecretIGO_ico.png',
            tags: ['React', 'Strapi', 'GraphQL', 'AWS'],
            github: 'https://github.com',
            demo: 'https://demo.com',
        },
    ];

    return (
        <Section className="projects" id="projects">
            <Container className="projects-container" max="2xl" padding="md">
                <div className="projects-header">
                    <span className="section-label">Portfolio</span>
                    <h2 className="section-title">Featured Projects</h2>
                    <p className="section-description">
                        A selection of projects I've worked on, showcasing different technologies
                        and approaches to solving real-world problems.
                    </p>
                </div>

                {/* <div className="projects-grid">
          {projects.map((project) => (

          ))}
        </div> */}

                <div className="projects-footer">
                    <a href="#contact" className="view-all-btn">
                        Want to see more? Let's talk
                    </a>
                </div>
            </Container>
        </Section>
    );
};

export default Projects;

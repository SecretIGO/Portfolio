import React from 'react';
import { Code2, Palette, Rocket, Users } from 'lucide-react';
import 'devicon/devicon.min.css';

import Container from '../../core/components/container/Container';
import Section from '../../core/components/section/Section';
import Tag from '../../core/components/tag/Tag';

import { techCategories } from '../../data/landingpage/about';
import './About.css';

interface TechItem {
    name: string;
    icon: string;
}

type TechCategoryKey = keyof typeof techCategories;

interface TechCategoryProps {
    title: string;
    technologies: TechItem[];
}

const TechCategory: React.FC<TechCategoryProps> = ({ title, technologies }) => {
    return (
        <div className="tech-category">
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
    const techTabs: { key: TechCategoryKey; label: string }[] = [
        { key: 'frontend', label: 'Frontend' },
        { key: 'backend', label: 'Backend' },
        { key: 'frameworks', label: 'Frameworks' },
        { key: 'database', label: 'Database' },
        { key: 'tools', label: 'Tools & Development' },
    ];

    const [activeTechTab, setActiveTechTab] = React.useState<TechCategoryKey>('frontend');

    const maxLabelLength = React.useMemo(
        () => Math.max(...techTabs.map((tab) => tab.label.length)),
        [techTabs]
    );

    const activeTechLabel = techTabs.find((tab) => tab.key === activeTechTab)?.label ?? 'Technologies';

    const normalizedActiveLabel = React.useMemo(
        () => activeTechLabel.toUpperCase().padEnd(maxLabelLength, ' '),
        [activeTechLabel, maxLabelLength]
    );

    const [scrambleText, setScrambleText] = React.useState(normalizedActiveLabel);

    const randomUppercaseChar = React.useCallback(
        () => String.fromCharCode(65 + Math.floor(Math.random() * 26)),
        []
    );

    const randomCycleCount = React.useCallback(() => Math.floor(Math.random() * 5) + 5, []);

    React.useEffect(() => {
        const target = normalizedActiveLabel;
        const cycles = target.split('').map(() => randomCycleCount());
        const maxCycle = Math.max(...cycles);

        if (maxCycle === 0) {
            setScrambleText(target);
            return;
        }

        let iteration = 0;
        let intervalId: number | undefined;

        const scramble = () => {
            setScrambleText((prev) => {
                const next = target
                    .split('')
                    .map((char, index) => (iteration >= cycles[index] ? char : randomUppercaseChar()))
                    .join('');

                return next;
            });

            iteration += 1;

            if (iteration > maxCycle) {
                setScrambleText(target);
                if (intervalId) {
                    window.clearInterval(intervalId);
                }
            }
        };

        scramble();
        intervalId = window.setInterval(scramble, 70);

        return () => window.clearInterval(intervalId);
    }, [normalizedActiveLabel, randomCycleCount, randomUppercaseChar]);

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
                <header className="about-header">
                    <span className="section-label">About Me</span>
                    <h2 className="section-title">Building Digital Experiences</h2>
                    <p className="section-description">
                        I'm a passionate full-stack developer with a focus on creating elegant,
                        performant, and user-friendly web applications.
                    </p>
                </header>

                <section className="about-content">
                    <div className="skills-grid">
                        {skills.map((skill, index) => (
                            <div key={index} className="skill-card">
                                <div className="skill-icon">{skill.icon}</div>
                                <h3 className="skill-title">{skill.title}</h3>
                                <p className="skill-description">{skill.description}</p>
                            </div>
                        ))}
                    </div>

                    <section className="tech-section">
                        <h3 className="tech-title">Technologies I Work With</h3>
                        <p className="section-description">
                            Explore the various technologies I utilize to create programs.
                        </p>
                        <div className="tech-skills-container">
                            <div className="tech-layout">
                                <div className="tech-sidenav" role="tablist" aria-label="Technology categories">
                                    {techTabs.map((tab) => {
                                        const isActive = activeTechTab === tab.key;
                                        return (
                                            <button
                                                key={tab.key}
                                                className={`tech-sidenav__item ${isActive ? 'is-active' : ''}`}
                                                onClick={() => setActiveTechTab(tab.key)}
                                                role="tab"
                                                aria-selected={isActive}
                                                aria-controls={`tech-panel-${tab.key}`}
                                                id={`tech-tab-${tab.key}`}
                                                type="button"
                                            >
                                                {tab.label}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div
                                    className="tech-panel"
                                    role="tabpanel"
                                    aria-labelledby={`tech-tab-${activeTechTab}`}
                                    id={`tech-panel-${activeTechTab}`}
                                >
                                    <div className="tech-panel__backdrop" aria-hidden="true">
                                        <span>{scrambleText}</span>
                                    </div>
                                    <div className="tech-panel__content">
                                        <TechCategory
                                            title={activeTechLabel}
                                            technologies={techCategories[activeTechTab]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </Container>
        </Section>
    );
};

export default About;

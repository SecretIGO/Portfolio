import React, { useState, useEffect, useRef } from 'react';
import './MegaDropdown.css';
import projects from '../../data/projects';
import { sortLanguagesByCategory } from '../../utils/languageUtils';
import Button from '../../core/components/buttons/button/Button';
import Card from '../../core/components/card/Card';
import Tag from '../../core/components/tag/Tag';

interface MegaDropdownProps {
    isVisible: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const MegaDropdown = ({
    isVisible,
    onMouseEnter,
    onMouseLeave,
}: MegaDropdownProps): React.ReactElement => {

    const lockedY = useRef<number | null>(null);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const yearOptions = [...years, 'Older'];
    const [selectedYear, setSelectedYear] = useState<number | string>(currentYear);
    const [displayYear, setDisplayYear] = useState<number | string>(currentYear);
    const [animDir, setAnimDir] = useState<'up' | 'down' | null>(null);
    const [animPhase, setAnimPhase] = useState<'idle' | 'out' | 'in'>('idle');
    const OUT_MS = 150;
    const IN_MS = 150;

    const handleSelectYear = (year: number | string) => {
        if (year === selectedYear) return;
        const dir: 'up' | 'down' = (typeof year === 'number' && typeof displayYear === 'number' && year > displayYear) ? 'up' : 'down';
        setAnimDir(dir);
        setAnimPhase('out');
        setSelectedYear(year);
        window.setTimeout(() => {
            setDisplayYear(year);
            setAnimPhase('in');
            window.setTimeout(() => setAnimPhase('idle'), IN_MS);
        }, OUT_MS);
    };

    const getProjectsForYear = (year: number | string) => {
        if (year === 'Older') {
            return projects.filter(p => typeof p.year === 'number' && p.year <= currentYear - 5);
        }
        return projects.filter(p => p.year === year);
    };

    useEffect(() => {
        const body = document.body;
        const root = document.documentElement as HTMLElement;

        if (isVisible && lockedY.current === null) {
            lockedY.current = window.scrollY || window.pageYOffset;
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            body.style.position = 'fixed';
            body.style.top = `-${lockedY.current}px`;
            body.style.width = '100%';
            body.style.overflow = 'hidden';
            body.style.paddingRight = `${scrollbarWidth}px`;
        }

        if (!isVisible && lockedY.current !== null) {
            const y = lockedY.current;
            const prev = root.style.scrollBehavior;
            root.style.scrollBehavior = 'auto';
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
            body.style.overflow = '';
            body.style.paddingRight = '';
            window.scrollTo(0, y);
            root.style.scrollBehavior = prev;
            lockedY.current = null;
        }
    }, [isVisible]);

    useEffect(() => {
        return () => {
            if (lockedY.current !== null) {
                const y = lockedY.current;
                const body = document.body;
                const root = document.documentElement as HTMLElement;
                const prev = root.style.scrollBehavior;
                root.style.scrollBehavior = 'auto';
                body.style.position = '';
                body.style.top = '';
                body.style.width = '';
                body.style.overflow = '';
                body.style.paddingRight = '';
                window.scrollTo(0, y);
                root.style.scrollBehavior = prev;
                lockedY.current = null;
            }
        };
    }, []);


    return (
        <div
            className={`megadropdown-container ${isVisible ? 'visible' : ''}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="megadropdown-layout">
                {/* Year Navigation Sidebar */}
                <div className="year-navigation">
                    <h3 className="navigation-title">Projects by Year</h3>
                    <div className="year-list">
                        {yearOptions.map((year) => (
                            <Button
                                key={year}
                                variant={selectedYear === year ? 'primary' : 'ghost'}
                                size="sm"
                                radius="sm"
                                className="year-button"
                                onClick={() => handleSelectYear(year)}
                            >
                                {year}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="content-area">
                    <div className="content-header">
                        <h2 className="content-title">
                            <span className="year-clip">
                                <span className={`year-text ${animPhase === 'out' ? `title-anim-out ${animDir ?? ''}` : ''} ${animPhase === 'in' ? `title-anim-in ${animDir ?? ''}` : ''}`.trim()}>
                                    {displayYear}
                                </span>
                            </span>
                            {' '}Projects
                        </h2>
                        <div className="header-right">
                            <div className="legend">
                                <div className="legend-item">
                                    <span className="legend-dot legend-frontend"></span>
                                    <span className="legend-label">Frontend</span>
                                </div>
                                <div className="legend-item">
                                    <span className="legend-dot legend-backend"></span>
                                    <span className="legend-label">Backend</span>
                                </div>
                                <div className="legend-item">
                                    <span className="legend-dot legend-framework"></span>
                                    <span className="legend-label">Framework</span>
                                </div>
                                <div className="legend-item">
                                    <span className="legend-dot legend-libraries"></span>
                                    <span className="legend-label">Library</span>
                                </div>
                                <div className="legend-item">
                                    <span className="legend-dot legend-database"></span>
                                    <span className="legend-label">Database</span>
                                </div>
                            </div>
                            <Tag size="sm" radius="full" className="project-count">
                                {getProjectsForYear(displayYear).length} projects
                            </Tag>
                        </div>
                    </div>

                    <div className="projects-scroll-container">
                        <div className="projects-list">
                            {getProjectsForYear(displayYear).length > 0
                                ? getProjectsForYear(displayYear).map((project, index) => (
                                    <Card
                                        key={`${(project as any).year}-${(project as any).title}-${index}`}
                                        variant="outline"
                                        radius="lg"
                                        padding="md"
                                        className="project-card"
                                    >
                                        <div className="project-header">
                                            <h4 className="project-title">{project.title}</h4>
                                        </div>
                                        <p className="project-description">{project.description}</p>
                                        <div className="project-languages">
                                            {sortLanguagesByCategory(project.languages).map((lang, i) => (
                                                <Tag
                                                    key={i}
                                                    variant="soft"
                                                    size="sm"
                                                    radius="full"
                                                    className={`language-${lang.category}`}
                                                >
                                                    {lang.name}
                                                </Tag>
                                            ))}
                                        </div>
                                    </Card>
                                ))
                                : (
                                    <div className="no-projects">
                                        <p>No projects found for {String(displayYear)}</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MegaDropdown;

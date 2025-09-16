import React, { useState, useEffect, useRef } from 'react';
import './MegaDropdown.css';
import projects from '../../data/projects';

interface MegaDropdownProps {
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const MegaDropdown: React.FC<MegaDropdownProps> = ({
  isVisible,
  onMouseEnter,
  onMouseLeave
}) => {

  const lockedY = useRef<number | null>(null);
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const yearOptions = [...years, 'Older'];
  const [selectedYear, setSelectedYear] = useState<number | string>(currentYear);
  const [displayYear, setDisplayYear] = useState<number | string>(currentYear);
  const [animDir, setAnimDir] = useState<'up' | 'down' | null>(null);
  const [animPhase, setAnimPhase] = useState<'idle' | 'out' | 'in'>('idle');
  const OUT_MS = 150; // aligns with --animation-duration-fast
  const IN_MS = 150;  // align with token for consistency

  const handleSelectYear = (year: number | string) => {
    if (year === selectedYear) return;
    const dir: 'up' | 'down' = (typeof year === 'number' && typeof displayYear === 'number' && year > displayYear) ? 'up' : 'down';
    setAnimDir(dir);
    setAnimPhase('out');
    setSelectedYear(year);
    // After out animation, swap content then animate in
    window.setTimeout(() => {
      setDisplayYear(year);
      setAnimPhase('in');
      // After in animation, settle to idle
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
      body.style.position = 'fixed';
      body.style.top = `-${lockedY.current}px`;
      body.style.width = '100%';
      body.style.overflow = 'hidden';
    }

    if (!isVisible && lockedY.current !== null) {
      const y = lockedY.current;
      const prev = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.overflow = '';
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
        window.scrollTo(0, y);
        root.style.scrollBehavior = prev;
        lockedY.current = null;
      }
    };
  }, []);
  
  const getLanguageCategory = (language: string): string => {
    const categories = {
      frontend: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'SCSS', 'Sass', 'jQuery', 'Bootstrap', 'Tailwind CSS', 'Material-UI', 'Chakra UI', 'Styled Components', 'Emotion'],
      backend: ['Node.js', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'C++', 'C', 'Kotlin', 'Swift', 'Scala', 'Elixir', 'Clojure', 'Haskell', 'F#', 'Erlang', 'Perl', 'Lua', 'R', 'MATLAB', 'Julia', 'Dart', 'Crystal', 'Nim', 'Zig'],
      framework: ['React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js', 'Gatsby', 'React Native', 'Flutter', 'Ionic', 'Xamarin', 'Swift UI', 'Jetpack Compose', 'Express', 'FastAPI', 'Flask', 'Django', 'Spring Boot', 'Laravel', 'Ruby on Rails', 'ASP.NET', 'Gin', 'Echo', 'Fiber', 'Actix', 'Rocket', 'Warp', 'Electron', 'Tauri', 'Cordova', 'PhoneGap'],
      libraries: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'Three.js', 'D3.js', 'Chart.js', 'Lodash', 'Moment.js', 'Axios', 'Socket.io', 'GraphQL', 'Apollo', 'Prisma', 'Mongoose', 'Sequelize', 'TypeORM', 'Hibernate', 'Entity Framework', 'ActiveRecord', 'Jest', 'Cypress', 'Playwright', 'Selenium'],
      database: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Cassandra', 'DynamoDB', 'Firebase', 'Supabase', 'CouchDB', 'Neo4j', 'InfluxDB', 'TimescaleDB', 'Elasticsearch', 'Solr', 'MariaDB', 'Oracle', 'SQL Server', 'Amazon RDS', 'Google Cloud SQL', 'Azure SQL', 'PlanetScale', 'Neon', 'Turso']
    };

    for (const [category, languages] of Object.entries(categories)) {
      if (languages.includes(language)) {
        return category;
      }
    }
    return 'other';
  };

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
              <button
                key={year}
                className={`year-button ${selectedYear === year ? 'active' : ''}`}
                onClick={() => handleSelectYear(year)}
              >
                <span className="year-label">{year}</span>
              </button>
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
              <span className="project-count">{getProjectsForYear(displayYear).length} projects</span>
            </div>
          </div>
          
          <div className="projects-scroll-container">
            <div className={`projects-list`}>
              {(getProjectsForYear(displayYear).length > 0
                ? getProjectsForYear(displayYear)
                : null
              )?.map((project, index) => (
                <div key={`${(project as any).year}-${(project as any).title}-${index}`} className="project-card">
                  <div className="project-header">
                    <h4 className="project-title">{project.title}</h4>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-languages">
                    {project.languages
                      .map(language => ({
                        name: language,
                        category: getLanguageCategory(language)
                      }))
                      .sort((a, b) => {
                        const categoryOrder = ['frontend', 'backend', 'framework', 'libraries', 'database', 'other'];
                        const aIndex = categoryOrder.indexOf(a.category);
                        const bIndex = categoryOrder.indexOf(b.category);
                        if (aIndex !== bIndex) {
                          return aIndex - bIndex;
                        }
                        return a.name.localeCompare(b.name);
                      })
                      .map((lang, index) => (
                        <span key={index} className={`language-tag language-${lang.category}`}>
                          {lang.name}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
              {getProjectsForYear(displayYear).length === 0 && (
                <div className="no-projects">
                  <p>No projects found for {String(displayYear)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaDropdown;

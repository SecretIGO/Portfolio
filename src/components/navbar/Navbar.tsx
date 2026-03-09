import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Menu, X, ChevronDown, Sun, Moon, Twitter, Facebook, Linkedin, Github } from 'lucide-react';
import { PAGE_NAV, SOCIALS } from '../../core/constants/navigation';
import IconButton from '../../core/components/buttons/icon-button/IconButton';

interface NavbarProps {
    isProjectsHovered: boolean;
    onProjectsMouseEnter: () => void;
    onProjectsMouseLeave: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
    isProjectsHovered,
    onProjectsMouseEnter,
    onProjectsMouseLeave
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window === 'undefined') return 'light';
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    });

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.setAttribute('data-theme', 'light');
        }
    }, [theme]);

    const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

    const socialIconMap: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
        twitter: Twitter,
        facebook: Facebook,
        linkedin: Linkedin,
        github: Github,
    };

    return (
        <header className="navbar">
            <div className="navbar-container">
                {/* Logo/Brand */}
                <a href="#home" className="navbar-brand">
                    <img src="/images/SecretIGO_ico.png" alt="SecretIGO" className="navbar-logo" />
                    <span className="navbar-brand-name">SecretIGO</span>
                </a>

                {/* Desktop Navigation */}
                <nav className="navbar-nav">
                    {PAGE_NAV.map(item => {
                        const isProjects = item.id === 'projects';
                        if (isProjects) {
                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    className="nav-link nav-link-dropdown"
                                    onMouseEnter={onProjectsMouseEnter}
                                    onMouseLeave={onProjectsMouseLeave}
                                    aria-haspopup="menu"
                                    aria-expanded={isProjectsHovered}
                                >
                                    {item.label}
                                    <ChevronDown size={16} className="dropdown-icon" />
                                </a>
                            );
                        }
                        return (
                            <a key={item.id} href={item.href} className="nav-link">{item.label}</a>
                        );
                    })}
                </nav>

                {/* Theme Toggle and Socials */}
                <div className="navbar-actions">
                    <IconButton
                        icon={theme === 'dark' ? Sun : Moon}
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        variant='secondary'
                        radius='sm'
                        size='md'
                    />
                    <span className="navbar-actions-sep" aria-hidden="true" />
                    <div className="navbar-socials" aria-label="Social links">
                        {SOCIALS.map(s => {
                            const Icon = socialIconMap[s.name] || Github;
                            const label = s.name.charAt(0).toUpperCase() + s.name.slice(1);
                            return (
                                <IconButton
                                    key={s.name}
                                    href={s.href}
                                    variant='ghost'
                                    radius='sm'
                                    icon={Icon}
                                    size='sm'
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    animation='hover-lift'
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-menu-toggle"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mobile-menu">
                    {PAGE_NAV.map(item => (
                        <a key={item.id} href={item.href} className="mobile-nav-link" onClick={toggleMobileMenu}>
                            {item.label}
                        </a>
                    ))}
                    <button className="mobile-theme-toggle" onClick={() => { toggleTheme(); toggleMobileMenu(); }}>
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <div className="mobile-separator" aria-hidden="true" />
                    <div className="mobile-socials" aria-label="Social links">
                        {SOCIALS.map(s => {
                            const Icon = socialIconMap[s.name] || Github;
                            const label = s.name.charAt(0).toUpperCase() + s.name.slice(1);
                            return (
                                <a
                                    key={s.name}
                                    href={s.href}
                                    className="mobile-social-link"
                                    onClick={toggleMobileMenu}
                                    aria-label={label}
                                >
                                    <Icon size={18} />
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;

import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Menu, X, ChevronDown, Sun, Moon, Twitter, Facebook, Linkedin, Github } from 'lucide-react';
import { PAGE_NAV, SOCIALS } from '../../core/constants/navigation';
import Container from '../../core/components/container/Container';
import Button from '../../core/components/buttons/button/Button';
import IconButton from '../../core/components/buttons/icon-button/IconButton';
import NavLink from '../../core/components/nav-link/NavLink';

interface NavbarProps {
    isProjectsHovered: boolean;
    onProjectsMouseEnter: () => void;
    onProjectsMouseLeave: () => void;
}

const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

const socialIconMap: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
    twitter: Twitter,
    facebook: Facebook,
    linkedin: Linkedin,
    github: Github,
};

const Navbar = ({
    isProjectsHovered,
    onProjectsMouseEnter,
    onProjectsMouseLeave
}: NavbarProps): React.ReactElement => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window === 'undefined') return 'light';
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    });

    const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

    return (
        <header className="navbar">
            <Container
                max="2xl"
                display="flex"
                justify="between"
                align="center"
                padding="responsive"
                className="navbar-container"
            >
                {/* Logo/Brand */}
                <a href="#home" className="navbar-brand">
                    <img src="/images/SecretIGO_ico.png" alt="SecretIGO" className="navbar-logo" />
                    <span className="navbar-brand-name">SecretIGO</span>
                </a>

                {/* Desktop Navigation */}
                <nav className="navbar-nav">
                    {PAGE_NAV.map(item => {
                        const isProjects = item.id === 'projects';
                        return (
                            <NavLink
                                key={item.id}
                                href={item.href}
                                size="sm"
                                {...(isProjects ? {
                                    rightIcon: ChevronDown,
                                    onMouseEnter: onProjectsMouseEnter,
                                    onMouseLeave: onProjectsMouseLeave,
                                    'aria-haspopup': 'menu' as const,
                                    'aria-expanded': isProjectsHovered,
                                } : {})}
                            >
                                {item.label}
                            </NavLink>
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
                            const label = capitalize(s.name);
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
                <IconButton
                    icon={mobileMenuOpen ? X : Menu}
                    onClick={toggleMobileMenu}
                    ariaLabel="Toggle menu"
                    aria-expanded={mobileMenuOpen}
                    variant='ghost'
                    size='lg'
                    radius='sm'
                    iconSize={24}
                    className="mobile-menu-toggle"
                />
            </Container>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mobile-menu">
                    {PAGE_NAV.map(item => (
                        <NavLink key={item.id} href={item.href} size="md" onClick={toggleMobileMenu}>
                            {item.label}
                        </NavLink>
                    ))}
                    <Button
                        variant='ghost'
                        size='md'
                        radius='sm'
                        leftIcon={theme === 'dark' ? Sun : Moon}
                        onClick={() => { toggleTheme(); toggleMobileMenu(); }}
                        className="mobile-theme-toggle"
                    >
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </Button>
                    <div className="mobile-separator" aria-hidden="true" />
                    <div className="mobile-socials" aria-label="Social links">
                        {SOCIALS.map(s => {
                            const Icon = socialIconMap[s.name] || Github;
                            const label = capitalize(s.name);
                            return (
                                <IconButton
                                    key={s.name}
                                    href={s.href}
                                    icon={Icon}
                                    onClick={toggleMobileMenu}
                                    ariaLabel={label}
                                    variant='ghost'
                                    size='md'
                                    radius='sm'
                                    className="mobile-social-link"
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;

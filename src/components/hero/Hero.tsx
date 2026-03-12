import React, { useEffect, useState } from 'react';
import './Hero.css';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import Button from '../../core/components/buttons/button/Button';
import IconButton from '../../core/components/buttons/icon-button/IconButton';
import { SOCIALS } from '../../core/constants/navigation';
import Section from '../../core/components/section/Section';
import Container from '../../core/components/container/Container';

const Hero: React.FC = () => {
    const roles = ['Software Engineer', 'Developer', 'Problem Solver', 'Creative Designer'];
    const [currentRole, setCurrentRole] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [roles.length]);

    return (
        <Section className="hero" id="home">
            <div className="hero-background">
                <div className="gradient-accent"></div>
            </div>

            <Container
                className="hero-container"
                max="2xl"
                padding="responsive"
                display="flex"
                direction="row"
                justify="between"
                align="center"
                gap="xl"
            >
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        <span>Open to opportunities</span>
                        <div className="badge-shine"></div>
                    </div>

                    <h1 className="hero-title">
                        <span className="hero-name">Johanz David Tolentino</span>
                        <span key={currentRole} className="flickering-role">
                            {roles[currentRole]}
                        </span>
                    </h1>

                    <p className="hero-description">
                        I craft elegant digital experiences through clean code and thoughtful design.
                        Specializing in modern web technologies, cloud architecture, and scalable solutions.
                    </p>

                    <div className="hero-actions">
                        <Button
                            href="#contact"
                            variant="primary"
                            size="lg"
                            radius="lg"
                            rightIcon={ArrowRight}
                            animation="hover-lift"
                            className="hero-cta"
                            aria-label="Let's Talk"
                        >
                            Let's Talk
                        </Button>

                        <Button
                            href="#projects"
                            variant="secondary"
                            size="lg"
                            radius="lg"
                            className="hero-cta"
                            aria-label="View Work"
                        >
                            View Work
                        </Button>
                    </div>

                    <div className="hero-social">
                        <IconButton
                            variant='secondary'
                            icon={Github}
                            href={SOCIALS.find((social) => social.name === 'github')?.href}
                            target="_blank"
                            size='xl'
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            animation='hover-lift' />
                        <IconButton
                            variant='secondary'
                            icon={Linkedin}
                            href={SOCIALS.find((social) => social.name === 'linkedin')?.href}
                            target="_blank"
                            size='xl'
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            animation='hover-lift' />
                        <IconButton
                            variant='secondary'
                            icon={Mail}
                            href="mailto:johanzdavidtolentino@gmail.com"
                            target="_blank"
                            size='xl'
                            aria-label="Email"
                            animation='hover-lift' />
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="hero-image-wrapper">
                        <div className="image-backdrop"></div>
                        <picture>
                            <source srcSet="/images/SecretIGO_ico.webp" type="image/webp" />
                            <img
                                src="/images/SecretIGO_ico.png"
                                alt="Johanz David Tolentino"
                                className="hero-image"
                                width={500}
                                height={500}
                            />
                        </picture>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default Hero;

import React, { useState } from "react";

import { Chip, Divider } from "@mui/material";
import NavigationBar from '../components/NavigationBar';
import { theme } from '../general/colors';
import { font } from '../general/font';
import './css/CSSProfileScreen.css';

const ProfileScreen = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const themeColor = theme(isDarkMode);

    return (
        <div className="mainContainer">
            <NavigationBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <div className="container">
                <main className="content">
                    <section className="hero">
                        <article className="introduction">
                            <p
                                className="introductoryText"
                                style={{
                                    fontFamily: font.family.opensans,
                                    fontSize: font.size.h3body,
                                    fontWeight: font.weight.regular,
                                    color: themeColor.body
                                }}
                            >
                                Software Engineer Intern
                            </p>
                            <h1
                                className="heading"
                                style={{
                                    fontFamily: font.family.monsterrat,
                                    fontWeight: font.weight.lighter,
                                    color: themeColor.header
                                }}
                            >
                                JOHANZ <span className="letter" id="D">D</span>A<span className="letter" id="V">V</span>ID TOL<span className="letter" id="E">E</span>NTINO
                            </h1>
                            <p
                                className="body"
                                style={{
                                    fontFamily: font.family.opensans,
                                    fontSize: font.size.h1body,
                                    fontWeight: font.weight.regular,
                                    color: themeColor.body
                                }}
                            >
                                Welcome to my Knowledge Center!
                            </p>
                        </article>
                    </section>
                    <h3 style={{ alignSelf: "center" }}>  Skills</h3>
                    <Divider
                        sx={{
                            mb: "7.5px"
                        }}
                    >
                        <Chip label="Technical Skills"></Chip>
                    </Divider>
                    <section className="technicalSkills">

                        <section className="languages">
                            <article className="language">

                            </article>
                            <article className="language">

                            </article>
                            <article className="language">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" />
                                <Chip 
                                    label="C++"
                                    sx={{
                                        fontFamily: font.family.monsterrat,
                                        fontSize: font.size.h4body,
                                        fontWeight: font.weight.regular,
                                        mt: "5px",
                                        backgroundColor: `rgb(255, 202, 202)`
                                    }}
                                />
                            </article>
                            <article className="language">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg" />
                                <Chip 
                                    label="Kotlin"
                                    sx={{
                                        fontFamily: font.family.monsterrat,
                                        fontSize: font.size.h4body,
                                        fontWeight: font.weight.regular,
                                        mt: "5px",
                                        backgroundColor: `rgb(255, 202, 202)`
                                    }}
                                />
                            </article>
                            <article className="language">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
                                <Chip 
                                    label="ReactJS"
                                    sx={{
                                        fontFamily: font.family.monsterrat,
                                        fontSize: font.size.h4body,
                                        fontWeight: font.weight.regular,
                                        mt: "5px",
                                        backgroundColor: `rgb(255, 202, 202)`
                                    }}
                                />
                            </article>
                            <article className="language">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" />
                                <Chip 
                                    label="Java"
                                    sx={{
                                        fontFamily: font.family.monsterrat,
                                        fontSize: font.size.h4body,
                                        fontWeight: font.weight.regular,
                                        mt: "5px",
                                        backgroundColor: `rgb(255, 202, 202)`
                                    }}
                                />
                            </article>
                        </section>
                    </section>
                    <section className="works">
                        <article>
                            <h1
                                className="heading"
                                style={{
                                    fontFamily: font.family.monsterrat,
                                    fontSize: font.size.heading3,
                                    fontWeight: font.weight.bold,
                                    color: themeColor.header
                                }}
                            >
                                WORKS
                            </h1>
                        </article>
                    </section>
                    <section className="timeline">
                        Explore my journey!
                    </section>
                </main>
                <footer className="contact">
                    footer
                </footer>
            </div>
        </div>
    )
}

export default ProfileScreen;
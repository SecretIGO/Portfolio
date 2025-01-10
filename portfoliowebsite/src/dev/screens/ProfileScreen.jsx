import React, { useState } from "react";

import { Chip, Divider } from "@mui/material";
import NavigationBar from '../components/NavigationBar';
import ProgressBar from '../components/ProgressBar';
import { theme } from '../general/colors';
import { font } from '../general/font';
import './css/CSSProfileScreen.css';

const chipStyle = {
    fontFamily: font.family.monsterrat,
    fontSize: font.size.h4body,
    fontWeight: font.weight.regular,
    mt: "5px",
    backgroundColor: `rgb(255, 202, 202)`
}

const Skill = ({ theme, className, img, label, value }) => {
    return (
        <article className={className}>
            <img src={img} />
            <Chip
                label={label}
                sx={chipStyle}
            />
            <div style={{ marginTop: "10px", width: "70%" }}>
                <ProgressBar theme={theme} value={value} />
            </div>
        </article>
    )
}

const Languages = ({ theme }) => {
    return (
        <>
            <Skill
                theme={theme}
                className={"language"}
                img={"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"}
                label={"C++"}
                value={75}
            />
            <Skill
                theme={theme}
                className={"language"}
                img={"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg"}
                label={"C#"}
                value={70}
            />
            <Skill
                theme={theme}
                className={"language"}
                img={"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"}
                label={"Python"}
                value={85}
            />
            <Skill
                theme={theme}
                className={"language"}
                img={"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"}
                label={"JavaScript"}
                value={80}
            />
            <Skill
                theme={theme}
                className={"language"}
                img={"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"}
                label={"TypeScript"}
                value={85}
            />
            <Skill
                theme={theme}
                className={"language"}
                img={"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"}
                label={"Java"}
                value={90}
            />
            <Skill
                theme={theme}
                className={"language"}
                img={"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg"}
                label={"Kotlin"}
                value={85}
            />
        </>
    )
}

const Libraries = ({ theme }) => {
    return (
        <>
            <Skill
                theme={theme}
                className={"language"}
                img={"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"}
                label={"React"}
                value={80}
            />
            <Skill
                theme={theme}
                className={"language"}
                img={"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg"}
                label={"Flask"}
                value={80}
            />
            <Skill
                theme={theme}
                className={"language"}
                img={"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/antdesign/antdesign-original.svg"}
                label={"AntD"}
                value={85}
            />
            <Skill
                theme={theme}
                className={"language"}
                img={"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg"}
                label={"Material UI"}
                value={80}
            />
        </>
    )
}

const ProfileScreen = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const themeColor = theme(isDarkMode);

    return (
        <div className="mainContainer">
            <NavigationBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <div className="container">
                <main className="content">
                    {/* Hero */}
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

                    {/* Skills */}
                    <Divider sx={{ mb: "12px" }}>
                        <Chip label="Technical Skills"></Chip>
                    </Divider>
                    <section className="skillsContainer">
                        <Languages />
                    </section>

                    <Divider sx={{ mb: "12px", mt: "24px" }}>
                        <Chip label="Libraries / Frameworks"></Chip>
                    </Divider>
                    <section className="skillsContainer">
                        <Libraries />
                    </section>

                    <Divider sx={{ mb: "12px", mt: "24px" }}></Divider>

                    {/* works */}
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
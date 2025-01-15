import React, { useMemo, useState } from "react";

// local js imports
import { font } from '../_general/theme/font';

// local css imports
import '../_general/config/HTMLTagConfig.css';
import '../_general/theme/Themes.css';
import './css/CSS_ProfileScreen.css';

// custom components
import HorizontalRule from '../components/HorizontalRule';
import NavigationBar from '../components/NavigationBar';
import ProgressBar from '../components/ProgressBar';

// mui
import { Chip } from "@mui/material";

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
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [theme, setTheme] = useState(systemTheme);

    useMemo(() => {
        setTheme(prev => !prev);
    }, [theme]);

    return (
        <div className="mainContainer">
            <NavigationBar isDarkMode={theme} setIsDarkMode={setTheme} />
            <div className="container">
                <main className="content">
                    {/* Hero */}
                    <section className="hero">
                        <article className="introduction">
                            <p
                                className="intro"
                                style={{
                                    fontFamily: font.family.opensans,
                                    fontSize: font.size.h3body,
                                    fontWeight: font.weight.regular
                                }}
                            >
                                Software Engineer Intern {systemTheme}
                            </p>
                            <h1
                                className="heading unselectable"
                                style={{
                                    fontFamily: font.family.monsterrat,
                                    fontWeight: font.weight.regular
                                }}
                            >
                                JOHANZ <span className="letter" id="D">D</span>A<span className="letter" id="V">V</span>ID TOL<span className="letter" id="E">E</span>NTINO
                            </h1>
                            <p
                                className="body"
                                style={{
                                    fontFamily: font.family.opensans,
                                    fontWeight: font.weight.regular
                                }}
                            >
                                Welcome to my Knowledge Center!
                            </p>
                        </article>
                    </section>

                    {/* Skills */}
                    <section>
                        <article className="skillsContainer">
                            <HorizontalRule title="Programming Languages" />
                            <section className="skills">
                                <Languages />
                            </section>
                        </article>

                        <article className="skillsContainer">
                            <HorizontalRule title="Libraries / Frameworks" />
                            <section className="skills">
                                <Libraries />
                            </section>
                        </article>

                        <article className="skillsContainer">
                            <HorizontalRule title="Libraries / Frameworks" />
                            <section className="skills" style={{marginBottom: "50px"}}>
                                <Libraries />
                            </section>
                            <HorizontalRule />
                        </article>

                    </section>

                    {/* works */}
                    <section className="works">
                        <article>
                            <h1
                                className="heading"
                                style={{
                                    fontFamily: font.family.monsterrat,
                                    fontSize: font.size.heading3,
                                    fontWeight: font.weight.bold
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
// light theme palette
const lightTheme = {
    primary: "#000",
    secondary: "#0A8B37",
    background: "#242424",

    header: "rgb(36, 36, 36)",
    body: "rgb(36, 36, 36)"
}

// dark theme palette
const darkTheme = {
    primary: "#FFF",
    secondary: "#0A8B37",
    background: "#242424",

    header: "rgb(36, 36, 36)",
    body: "rgb(255, 255, 255)"
}

export const theme = (isDark) => {
    return isDark ? darkTheme : lightTheme
}

export default theme;
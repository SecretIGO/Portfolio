// light theme palette
const lightTheme = {
    primary: "#000",
    secondary: "#0A8B37",
    background: "rgb(255, 255, 255)",

    header: "rgb(36, 36, 36)",
    body: "rgb(36, 36, 36)"
}

// dark theme palette
const darkTheme = {
    primary: "#FFF",
    secondary: "#0A8B37",
    background: "rgb(36, 36, 36)",

    header: "rgb(54, 216, 81)",
    body: "rgb(255, 255, 255)"
};

export const theme = (isDark) => {
    return isDark ? darkTheme : lightTheme;
};

export default theme;
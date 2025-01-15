import DarkModeIcon from '@mui/icons-material/DarkMode';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import LightModeIcon from '@mui/icons-material/LightMode';
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";

import React from "react";

import './css/CSS_NavigationBar.css';

const NavigationBar = ({ isDarkMode, setIsDarkMode }) => {
	const handleModeToggle = () => {
		setIsDarkMode(prevMode => !prevMode);
	};

	return (
		<nav className="navigation">
			<Button
				sx={{
					borderRadius: "20px",
					position: "fixed",
					left: "0%",
					transform: "translate(20%, 20%)",
					width: 37.5,
				}}
				variant="soft"
				color="neutral"
				onClick={() => handleModeToggle()}
			>
				{isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
			</Button>

			<ButtonGroup
				sx={{
					borderRadius: "15px",
					overflow: "hidden",
					position: "fixed",
					bottom: "0%",
					left: "50%",
					transform: "translate(-50%, -20%)",
				}}
				variant="soft"
			>
				<Button onClick={() => console.log("Profile")}>Profile</Button>
				<Button onClick={() => console.log("Works")}>Works</Button>
				<Button onClick={() => console.log("Timeline")}>Timeline</Button>
				<Button onClick={() => console.log("Contact")}>Contact</Button>
			</ButtonGroup>

			<ButtonGroup
				sx={{
					borderRadius: "20px",
					overflow: "hidden",
					position: "fixed",
					bottom: "0%",
					right: "0%",
					transform: "translate(-20%, -20%)",
				}}
				spacing="0.5rem"
				variant="soft"
			>
				<Button><GoogleIcon /></Button>
				<Button><FacebookIcon /></Button>
				<Button><GitHubIcon /></Button>
			</ButtonGroup>
		</nav>
	);
};


export default NavigationBar;
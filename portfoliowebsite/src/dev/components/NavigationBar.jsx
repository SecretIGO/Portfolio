import DarkModeIcon from '@mui/icons-material/DarkMode';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import LightModeIcon from '@mui/icons-material/LightMode';
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";

import React from "react";

import './css/CSSNavigationBar.css';

const NavigationBar = ({ isDarkMode, setIsDarkMode }) => {
	const handleModeToggle = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<>
			<Button
				className="nav-button"
				sx={{
					borderRadius: "20px",
					position: "fixed",
					left: "0%",
					transform: "translate(20%, 20%)",
					width: 37.5,
				}}
				variant="outlined"
				color="neutral"
				onClick={handleModeToggle}
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
				<Button className="nav-button" onClick={() => console.log("Profile")}>Profile</Button>
				<Button className="nav-button" onClick={() => console.log("Works")}>Works</Button>
				<Button className="nav-button" onClick={() => console.log("Timeline")}>Timeline</Button>
				<Button className="nav-button" onClick={() => console.log("Contact")}>Contact</Button>
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
				<Button className="social-button"><GoogleIcon /></Button>
				<Button className="social-button"><FacebookIcon /></Button>
				<Button className="social-button"><GitHubIcon /></Button>
			</ButtonGroup>
		</>
	);
};


export default NavigationBar;
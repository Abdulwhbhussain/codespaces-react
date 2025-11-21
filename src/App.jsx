import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import "./App.css";

const initialProfiles = [
	{
		id: 1,
		name: "Ada Lovelace",
		bio: "First computer programmer. Loves math & poetry.",
		avatar: "https://randomuser.me/api/portraits/women/44.jpg",
		isFollowed: false,
	},
	{
		id: 2,
		name: "Alan Turing",
		bio: "Father of computer science. Codebreaker.",
		avatar: "https://randomuser.me/api/portraits/men/46.jpg",
		isFollowed: false,
	},
	{
		id: 3,
		name: "Grace Hopper",
		bio: "Invented the first compiler. Navy rear admiral.",
		avatar: "https://randomuser.me/api/portraits/women/65.jpg",
		isFollowed: false,
	},
];

function App() {
	const [profiles, setProfiles] = useState(initialProfiles);
	const [theme, setTheme] = useState("light");
	const [search, setSearch] = useState("");

	useEffect(() => {
		// Log follow/unfollow changes
		console.log(
			"Profiles follow status:",
			profiles.map((p) => `${p.name}: ${p.isFollowed ? "Followed" : "Unfollowed"}`)
		);
	}, [profiles]);

	const handleFollowToggle = (id) => {
		setProfiles((prev) =>
			prev.map((profile) =>
				profile.id === id ? { ...profile, isFollowed: !profile.isFollowed } : profile
			)
		);
	};

	const handleThemeToggle = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	const filteredProfiles = profiles.filter((profile) =>
		profile.name.toLowerCase().includes(search.toLowerCase())
	);

	// Theme CSS variables
	React.useEffect(() => {
		if (theme === "dark") {
			document.body.style.setProperty("--card-bg", "#222");
			document.body.style.setProperty("--card-text", "#fff");
			document.body.style.background = "#181818";
		} else {
			document.body.style.setProperty("--card-bg", "#fff");
			document.body.style.setProperty("--card-text", "#222");
			document.body.style.background = "#f5f5f5";
		}
	}, [theme]);

	return (
		<div className={`App ${theme}`}>
			<header className="App-header">
				<h1>Dynamic Profile Cards</h1>
				<button className="theme-toggle" onClick={handleThemeToggle}>
					{theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
				</button>
				<input
					className="search-bar"
					type="text"
					placeholder="Search users..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</header>
			<div className="profile-list">
				{filteredProfiles.length === 0 ? (
					<p>No users found.</p>
				) : (
					filteredProfiles.map((profile) => (
						<ProfileCard
							key={profile.id}
							name={profile.name}
							bio={profile.bio}
							avatar={profile.avatar}
							isFollowed={profile.isFollowed}
							onFollowToggle={() => handleFollowToggle(profile.id)}
						/>
					))
				)}
			</div>
		</div>
	);
}

export default App;

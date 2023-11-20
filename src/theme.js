// color design tokens export
export const tokensDark = {
	grey: {
		0: "#ffffff", // manually adjusted
		10: "#f6f6f6", // manually adjusted
		50: "#f0f0f0", // manually adjusted
		100: "#e0e0e0",
		200: "#c2c2c2",
		300: "#a3a3a3",
		400: "#858585",
		500: "#666666",
		600: "#525252",
		700: "#3d3d3d",
		800: "#292929",
		900: "#141414",
		1000: "#000000", // manually adjusted
	},
	primary: {
		100: "#d5d4d4",
		200: "#aba9a8",
		300: "#817f7d",
		400: "#575451",
		500: "#2d2926",
		600: "#24211e",
		700: "#1b1917",
		800: "#12100f",
		900: "#090808",
	},
	secondary: {
		50: "#f0f0f0",
		100: "#fbdbd8",
		200: "#f6b7b1",
		300: "#f2938a",
		400: "#ed6f63",
		500: "#e94b3c",
		600: "#ba3c30",
		700: "#8c2d24",
		800: "#5d1e18",
		900: "#2f0f0c",
	},
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
	const reversedTokens = {};
	Object.entries(tokensDark).forEach(([key, val]) => {
		const keys = Object.keys(val);
		const values = Object.values(val);
		const length = keys.length;
		const reversedObj = {};
		for (let i = 0; i < length; i++) {
			reversedObj[keys[i]] = values[length - i - 1];
		}
		reversedTokens[key] = reversedObj;
	});
	return reversedTokens;
}

export const tokensLight = reverseTokens(tokensDark);

const font = ["Inter", "sans-serif"];

export const themeSettings = (mode) => {
	return {
		palette: {
			mode: mode,
			...(mode === "dark"
				? {
						// palette values for dark mode
						primary: {
							...tokensDark.primary,
							main: tokensDark.primary[400],
							light: tokensDark.primary[400],
						},
						secondary: {
							...tokensDark.secondary,
							main: tokensDark.secondary[300],
						},
						neutral: {
							...tokensDark.grey,
							main: tokensDark.grey[500],
						},
						background: {
							default: tokensDark.primary[600],
							alt: tokensDark.primary[500],
						},
				  }
				: {
						// palette values for light mode
						primary: {
							...tokensLight.primary,
							main: tokensDark.grey[50],
							light: tokensDark.grey[100],
						},
						secondary: {
							...tokensLight.secondary,
							main: tokensDark.secondary[600],
							light: tokensDark.secondary[700],
						},
						neutral: {
							...tokensLight.grey,
							main: tokensDark.grey[500],
						},
						background: {
							default: tokensDark.grey[0],
							alt: tokensDark.grey[50],
						},
				  }),
		},
		typography: {
			fontFamily: font.join(","),
			fontSize: 12,
			h1: {
				fontFamily: font.join(","),
				fontSize: 40,
			},
			h2: {
				fontFamily: font.join(","),
				fontSize: 32,
			},
			h3: {
				fontFamily: font.join(","),
				fontSize: 24,
			},
			h4: {
				fontFamily: font.join(","),
				fontSize: 20,
			},
			h5: {
				fontFamily: font.join(","),
				fontSize: 16,
			},
			h6: {
				fontFamily: font.join(","),
				fontSize: 14,
			},
		},
	};
};

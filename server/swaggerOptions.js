module.exports = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Beifong API",
			version: "0.0.2",
			description: "REST API for Beifong Project, clinic management with focus on accesibility. Made with Express.js and MongoDB.",
			license: {
				name: "MIT License",
				url: "https://github.com/LTSpark/beifong-back/blob/main/LICENSE",
			},
			contact: {
				name: "Leonardo Torres",
				url: "https://github.com/LTSpark",
			},
		},
		servers: [
			{
				url: "http://localhost:3000/api",
				description: "Development",
			},
			{
				url: "https://beifong-back.herokuapp.com/api",
				description: "Production",
			}
		],
	},
	apis: ["./routes/*.js"],
};
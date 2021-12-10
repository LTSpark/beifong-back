module.exports = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Beifong API",
			version: "0.0.2",
			description: "REST API for Beifong Project, clinic management with focus on accesibility. Made with Express.js and MongoDB",
		},
		servers: [
			{
				url: "http://localhost:3000/api",
                description: "Development"
			},
		],
	},
	apis: ["./routes/*.js"],
};
module.exports = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Beifong API",
			version: "0.0.1",
			description: "REST API Documentation for Beifong Backend",
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
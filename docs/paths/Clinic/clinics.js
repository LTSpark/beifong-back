module.exports = {
    "/clinics": {
        post: {
            summary: "Creates a new clinic",
            tags: [
                "Clinic"
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/PostClinic"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Creates a new clinic and sends verification email",
                    content: {
                        "application/json": {
                            $ref: "#/components/schemas/PostClinicResponse"
                        }
                    }
                },
                400: {
                    description: "Name already exists, email already exists, invalid password, etc"
                },
                500: {
                    description: "Internal server error - Failed database connection"
                }
            }
        },
        get: {
            summary: "Gets a set of clinics",
            tags: [
                "Clinic"
            ],
            parameters: [
                {
                in: "query",
                name: "name",
                schema: {
                  type: "string"
                },
                required: false,
                description: "clinic name which is going to be searched"
              },
              {
                in: "query",
                name: "limit",
                schema: {
                  type: "int"
                },
                required: false,
                description: "integer number that limits the results"
              },
              {
                in: "query",
                name: "from",
                schema: {
                  type: "string"
                },
                required: false,
                description: "integer number that indicates the results start"
              },
              {
                in: "query",
                name: "sort",
                schema: {
                  type: "string"
                },
                required: false,
                description: "string that indicates the order 'asc' ord 'desc' allowed"
              },
              {
                in: "query",
                name: "order",
                schema: {
                  type: "string"
                },
                required: false,
                description: "indicates which field is going to be the index 'name' or '_id' allowed"
              }
            ],
            responses: {
                201: {
                    description: "",
                    content: {
                        "application/json": {
                            $ref: "#/components/schemas/GetClinicsResponse"
                        }
                    }
                },
                400: {
                    description: "incorrect sent query data"
                },
                500: {
                    description: "Internal server error - Failed database connection"
                }
            }
        }
    }
};
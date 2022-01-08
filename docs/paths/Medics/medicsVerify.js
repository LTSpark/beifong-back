module.exports = {
    "/medics/verify": {
      put: {
        summary: "Token-based verification for clinic accounts",
        tags: [
          "Medic"
        ],
        parameters: [
          {
            in: "query",
            name: "token",
            schema: {
              type: "string"
            },
            required: true,
            description: "verification token"
          }
        ],
        responses: {
          201: {
            description: "clinic account verified",
            content: {
              "application/json": {
                $ref: "#/components/schemas/TokenMedicResponse"
              }
            }
          },
          400: {
            description: "token does not exist or is not a jwt"
          },
          500: {
            description: "internal server error - invalid verification"
          }
        }
      }
    }
  };
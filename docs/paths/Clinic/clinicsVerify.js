module.exports = {
    "/clinics/verify": {
      put: {
        summary: "Token-based verification for clinic accounts",
        tags: [
          "Clinic"
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
                $ref: "#/components/schemas/TokenClinicResponse"
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
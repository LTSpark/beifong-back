module.exports = {
    "/patients/verify": {
        put: {
          summary: "Token-based verification for patients accounts",
          tags: [
            "Patient"
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
              description: "patient account verified",
              content: {
                "application/json": {
                  $ref: "#/components/schemas/TokenPatientResponse"
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
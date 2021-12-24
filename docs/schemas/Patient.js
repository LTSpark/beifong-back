module.exports = {
    PostPatient: {
        type: "Object",
        required: [
            "name",
            "email",
            "password"
        ],
        properties: {
            name: {
                type: "string",
                description: "patient name"
            },
            email: {
                type: "string",
                description: "patient email"
            },
            password: {
                type: "string",
                description: "password to access beifong"
            }
        },
        example: {
            name: "paciente",
            email: "paciente@test.com",
            password: "Contraseña123",
        }
    },

    PostPatientResponse:{
        type: "Object",
        properties: {
            ok: {
                type: "boolean",
                description: "indicates if operation was done correctly"
            },
            patientId: {
                type: "string",
                description: "database id of created patient"
            },
            msg: {
                type: "string",
                description: "information about operation perfomed"
            }
        },
        example: {
            ok: true,
            patientId: "61b2b2df969e14057e3837dc",
            msg: "patient creation done! Please check your email" 
        }
    },

    TokenPatientResponse: {
        type: "Object",
        properties: {
            ok: {
                type: "boolean",
                description: "indicates if operation was done correctly"
            },
            msg: {
                type: "string",
                description: "information about operation perfomed"
            },
            token: {
                type: "string"
            }
        },
        example: {
            ok: true,
            msg: "Response message",
            token: "token"
        }
    },
};
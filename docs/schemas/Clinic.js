module.exports = {
    PostClinic: {
        type: "Object",
        required: [
            "name",
            "email",
            "password",
            "direction",
            "telephone"
        ],
        properties: {
            name: {
                type: "string",
                description: "clinic name"
            },
            email: {
                type: "string",
                description: "clinic email"
            },
            password: {
                type: "string",
                description: "password to access beifong"
            },
            direction: {
                type: "string",
                description: "clinic direction"
            },
            telephone: {
                type: "string",
                description: "clinic telephone"
            }
        },
        example: {
            name: "clinica",
            email: "clinica@test.com",
            password: "Contraseña123",
            direction: "Av. Las Palmeras 196 Los Olivos",
            telephone: 999999999
        }
    },

    PostClinicResponse: {
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
            clinicId: {
                type: "string",
                description: "database id of created clinic"
            }
        },
        example: {
            ok: true,
            msg: "Clinic creation done! Please check your email",
            clinicId: "61b2b2df969e14057e3837dc"
        }
    },

    ResendEmailClinic: {
        type: "Object",
        required: [
            "clinicId"
        ],
        properties: {
            clinicId: {
                type: "string",
                description: "clinic id"
            }
        },
        example: {
            clinicId: "61b2b2df969e14057e3837dc"
        }
    },

    ResendEmailClinicResponse: {
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
            clinicId: {
                type: "string",
                description: "database id of created clinic"
            }
        },
        example: {
            ok: true,
            msg: "Clinic creation message resend! Please check your email",
            clinicId: "61b2b2df969e14057e3837dc"
        }
    },

    TokenClinicResponse: {
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

    LoginClinic: {
        type: "Object",
        properties: {
            email: {
                type: "string",
                description: "clinic email"
            },
            password: {
                type: "string",
                description: "clinic password"
            }
        },
        example: {
            email: "test@email.com",
            password: "12345"
        }
    }

};
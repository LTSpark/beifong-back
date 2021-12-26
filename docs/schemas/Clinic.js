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
                type: "string",
                description: "Token of the Clinic session"
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
    },

    GetClinicsResponse: {
        type: "Object",
        properties: {
            totalUsers: {
                type: "number",
                description: "total of clinics found"
            },
            clinics: {
                type: "Object",
                description: "clinics data"
            }
        },
        example: {
            totalUsers: 0,
            clinics: {}
        }
    },

    GetClinicIdResponse:{
        type: "Object",
        properties:{
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
                description: "hashed clinic password"
            },
            telephone: {
                type: "string",
                description: "clinic telephone"
            },
            direction: {
                type: "string",
                description: "clinic direction"
            },
            startAttentionTime: {
                type: "date",
                description: "start of the attention time"
            },
            endAttentionTime: {
                type: "date",
                description: "end of the attention time"
            },
            attentionDays: {
                type: "[string]",
                description: "the attendance days of the week"
            },
            verified: {
                type: "boolean",
                description: "indicates if the clinic is verified or not"
            },
            subscriptionPaymentExpires: {
                type: "date",
                description: "subscription payment expiring date"
            },
            payments: {
                type: "[object]",
                description: "clinic payments objects"
            },
            logoImg: {
                type: "string",
                description: "clinic image"
            },
            slogan: {
                type: "string",
                description: "clinic slogan"
            },
            subSlogan: {
                type: "string",
                description: "clinic subslogan"
            },
            sections: {
                type: "[object]",
                description:"clinic section objects"
            },
            medics: {
                type:"medic objects",
                description: "medics of the clinic"
            },
            clinicalAppointments: {
                type:"clinicalAppointments objects",
                description: "clinical appointments of the clinic"
            },
            accesibilityConfig: {
                type:"accesibilityConfig objects",
                description: "accesibility configuration of the clinic"
            }
        },
    },

    ClinicSuscription:{
        type: "Object",
        required: [
            "mount",
            "suscriptionType"
        ],
        properties: {
            mount: {
                type: "float",
                description: "mount is going to be payed"
            },
            suscriptionType: {
                type: "string",
                description: "suscription type: 'annual', 'semi-annual', 'monthly'"
            }
        },
        example: {
            mount: "61b2b2df969e14057e3837dc",
            suscriptionType: "monthly"
        }        
    }
};
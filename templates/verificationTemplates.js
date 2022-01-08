const { generateJWT } = require('../utils/utils');

const clinicVerificationTemplate = async ( id, name ) => {

    const token = await generateJWT({ id }, process.env.VERIFY_KEY, '1h');
    const year = new Date().getFullYear();

    return `
        <h1>Hola, ${name}</h1><hr/>
        <p>
            Gracias por elegir Beifong para manejar tus citas,
            sabemos que el servicio va a resultar satisfactorio tanto
            para su organización como para sus pacientes. En Beifong
            nos preocupamos porque el software sea accesible para todos.
        </p>
        <p>
            Ahora, para empezar a utilizar Beifong usted debe autenticar
            este correo electrónico usando el enlace que se encuentra aquí.
        </p>
        <h2>Enlace de verificación</h2>
        <p>https://beifong-front.vercel.app/clinica/confirmation?token=${token}</p>
        <small>Enlace válido por una hora</small><br/>
        <small>BEIFONG &copy;${year}</small>
    `;

}

const patientVerificationTemplate = async ( id, name ) => {

    const token = await generateJWT({ id }, process.env.VERIFY_KEY, '1h');
    const year = new Date().getFullYear();

    return `
        <h1>Hola, ${name}</h1><hr/>
        <p>
            Para usar Beifong y acceder a todos los servicios que
            ofrecen las clínicas que se encuentran en nuestra aplicación,
            usted debe confirmar su correo electrónico. Haga click en el enlace
            para verificar su cuenta.
        </p>
        <h2>Enlace de verificación</h2>
        <p>https://beifong-front.vercel.app/paciente/confirmation?token=${token}</p>
        <small>Enlace válido por una hora</small><br/>
        <small>BEIFONG &copy;${year}</small>
    `;

}

const medicVerificationTemplate = async ( id, name, clinicName ) => {

    const token = await generateJWT({ id }, process.env.VERIFY_KEY, '1h');
    const year = new Date().getFullYear();

    return `
        <h1>Hola, ${name}</h1><hr/>
        <p>
            La ${clinicName} te invita a ser parte de su plantel. Pero antes
            debes verificar tu correo electrónico. Usa el link debajo para 
            acceder a Beifong:
        </p>
        <h2>Enlace de verificación</h2>
        <p>https://beifong-front.vercel.app/medico/confirmation?token=${token}</p>
        <small>Enlace válido por una hora</small><br/>
        <small>BEIFONG &copy;${year}</small>
    `;

}

module.exports={
    clinicVerificationTemplate,
    patientVerificationTemplate,
    medicVerificationTemplate
};
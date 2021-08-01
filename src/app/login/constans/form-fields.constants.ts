import {I18n} from 'aws-amplify';

const dict = {
  'en': {
    'USERNAME': "Username",
    'HAVE_ACCOUNT': "Do you have account",
    'CREATE': "Create",
    'EMAIL': "Email",
    'PASSWORD': "Password",
    'PHONE': "Phone"
  },
  'es': {
    'USERNAME': "Usuario",
    'HAVE_ACCOUNT': "Tiene una cuenta",
    'CREATE': "Crear",
    'EMAIL': "Correo electrónico",
    'PASSWORD': "Contraseña",
    'PHONE': "Teléfono"
  }
};

I18n.setLanguage('es');
I18n.putVocabularies(dict);

const text = {
  AMPLIFY_AUTHENTICATOR: 'Iniciar sesión',
  SIGN_UP: 'Crear nueva cuenta',
  START: 'Iniciar',
  FORGOT_PASSWORD: 'Recuperar contraseña',
  SEND: 'Enviar',
  HAVE_ACCOUNT: I18n.get('HAVE_ACCOUNT'),
  CREATE: I18n.get('CREATE'),
}

const formFields = {

  amplifyAuthenticator: [
    {
      type: "username",
      label: I18n.get('USERNAME'),
      placeholder: I18n.get('USERNAME'),
      inputProps: {
        required: true,
        autocomplete: "username",
        MinLength: 4,
        MaxLength: 50
      },
      attributeDataType: "String",

    },
    {
      type: "password",
      label: I18n.get('PASSWORD'),
      placeholder: I18n.get('PASSWORD'),
      createAccountText: 'Olvido su contraseña?co',
      inputProps: {
        required: true,
        autocomplete: "password"
      },
      pattern: "[a-z]{1,15}",
      handleInputChange: (event, cb) => {
        console.log('Password change example');
        cb(event);
      }
    }
  ],

  signUp: [
    {
      type: "email",
      label: I18n.get('EMAIL'),
      placeholder: I18n.get('EMAIL'),
      inputProps: {
        required: true,
        autocomplete: "username"
      },
    },
    {
      type: "password",
      label: I18n.get('PASSWORD'),
      placeholder: I18n.get('PASSWORD'),
      inputProps: {
        required: true,
        autocomplete: "new-password"
      },
    },
    {
      type: "phone_number",
      label: I18n.get('PHONE'),
      placeholder: I18n.get('PHONE'),
    },
  ],

  forgotPassword: [
    {
      type: "email",
      label: I18n.get('EMAIL'),
      placeholder: I18n.get('EMAIL'),
      inputProps: {
        required: true,
        autocomplete: "email"
      },
    }
  ]
}

export {
  formFields,
  text
}

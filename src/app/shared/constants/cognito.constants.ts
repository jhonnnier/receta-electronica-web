const errorType = {
  UserNotFoundException: 'UserNotFoundException',
  NotAuthorizedException: 'NotAuthorizedException',
  LimitExceededException: 'LimitExceededException',
  CodeMismatchException: 'CodeMismatchException',
  InvalidPasswordException:'InvalidPasswordException',
  ExpiredCodeException:'ExpiredCodeException'
};

const challengeName = {
  SMS_MFA: 'SMS_MFA',
  SOFTWARE_TOKEN_MFA: 'SOFTWARE_TOKEN_MFA',
  NEW_PASSWORD_REQUIRED: 'NEW_PASSWORD_REQUIRED',
  MFA_SETUP: 'MFA_SETUP'
};

const userGroups = {
  MEDICO: 'MEDICO',
  AUDITOR: 'AUDITOR'
}

export {
  errorType,
  challengeName,
  userGroups
};

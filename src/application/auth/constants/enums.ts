export enum AuthModuleErrorCode {
  LoginFailed = 'AUTH_LOGIN_FAILED',
  NotInvited = 'AUTH_NOT_INVITED',
  InvalidInvitation = 'AUTH_INVALID_INVITAION',
  InvalidToken = 'AUTH_INVALID_TOKEN',
  AlreadyExist = 'AUTH_ALREADY_EXIST',
  PasswordsMispatch = 'AUTH_PASSWORDS_MISMATCH',
  WrongPassword = 'AUTH_WRONG_PASSWORD',
  SamePassword = 'AUTH_SAME_PASSWORD',
  Blocked = 'AUTH_BLOCKED',
}

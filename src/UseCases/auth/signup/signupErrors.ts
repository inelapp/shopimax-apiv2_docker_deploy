class SignupBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class SignupUserEmailAlreadyExistsError extends Error {
  constructor() {
    super('User email already exists.');
  }
}

class SignupUserUsernameAlreadyExistsError extends Error {
  constructor() {
    super('User username already exists.');
  }
}

export { SignupBadRequestError, SignupUserEmailAlreadyExistsError, SignupUserUsernameAlreadyExistsError };
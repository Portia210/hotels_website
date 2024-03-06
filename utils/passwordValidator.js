export function validatePassword(password) {
  if (password.length < 8) return false;

  const numberRegex = /\d/;
  const letterRegex = /[a-zA-Z]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (
    !numberRegex.test(password) ||
    !letterRegex.test(password) ||
    !specialCharRegex.test(password)
  ) {
    return false;
  }

  return true;
}

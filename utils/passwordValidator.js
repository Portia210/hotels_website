export function validatePassword(password) {
  if (!password || password.length < 8) return false;

  const numberRegex = /\d/;
  const letterRegex = /[a-zA-Z]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  console.log('numberRegex.test(password)', numberRegex.test(password));
  console.log('letterRegex.test(password)', letterRegex.test(password));
  console.log(
    'specialCharRegex.test(password)',
    specialCharRegex.test(password),
  );

  if (
    !numberRegex.test(password) ||
    !letterRegex.test(password) ||
    !specialCharRegex.test(password)
  ) {
    return false;
  }

  // If all conditions are met, the password is valid
  return true;
}

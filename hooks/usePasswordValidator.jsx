import { validatePassword } from '@/utils/passwordValidator';
import useTrans from './useTrans';

const usePasswordValidator = () => {
  const { t } = useTrans();

  const validate = password => {
    const isValid = validatePassword(password);
    const message = isValid ? '' : t('Dashboard.SetPassword.invalid');
    return { isValid, message };
  };

  return {
    validate,
  };
};

export default usePasswordValidator;

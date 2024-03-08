import useTrans from '@/hooks/useTrans';

export default function PasswordInstruct() {
  const { t, isReverse } = useTrans();
  return (
    
    <div className="col-auto" dir={`${isReverse && 'rtl'}`}>
      <p>
        {t('Dashboard.SetPassword.instruct1')} <br />
        {t('Dashboard.SetPassword.instruct2')}
      </p>
    </div>
  );
}

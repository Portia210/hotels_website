const usePaymentTestKit = (email) => {

  const setNextMonthPlan = planId => {
    console.log('email', email)
    console.log('planId', planId)
  };

  const setNextChargeDate = date => {};

  const setLastChargeDate = date => {};

  const setNextChargeAmount = amount => {};

  const setBillingCycle = cycle => {};

  const chargeNow = () => {
    console.log('chargeNow');
  };

  return {
    setNextMonthPlan,
    setNextChargeDate,
    setLastChargeDate,
    setNextChargeAmount,
    setBillingCycle,
    chargeNow
  };
};
export default usePaymentTestKit;

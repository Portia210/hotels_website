'use client';

import usePaymentTestKit from '@/hooks/usePaymentTestKit';
import { useState } from 'react';
import UserPlansDropdown from '../../db-user-management/components/UsersTable/UserPlansDropdown';

const PaymentTestKit = () => {
  const [email, setEmail] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState();
  const {
    setNextMonthPlan,
    setNextChargeDate,
    setLastChargeDate,
    chargeNow,
  } = usePaymentTestKit(email);

  const resetForm = () => {
    setEmail(null);
    setSelectedPlan(null);
    document.getElementById('lastChargeDate').value = '';
    document.getElementById('nextChargeAmount').value = '';
  };

  return (
    <div className="row y-gap-20">
      <div className="border col-4">
        <label htmlFor="emailInput">User Email</label>
        <input
          id="emailInput"
          name="emailInput"
          type="email"
          required
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="border col-4">
        <label htmlFor="nextMonthPlan">Next Month Plan</label>
        <UserPlansDropdown
          value={selectedPlan}
          onChange={value => setSelectedPlan(value)}
        />
        <button
          onClick={() => setNextMonthPlan(selectedPlan)}
          type="btn"
          className="btn btn-primary"
        >
          Save
        </button>
      </div>
      <div className="border col-4">
        <label htmlFor="nextChargeDate">Next Charge Date</label>
        <input id="nextChargeDate" name="nextChargeDate" type="date" />
        <button
          onClick={() =>
            setNextChargeDate(document.getElementById('nextChargeDate').value)
          }
          type="btn"
          className="btn btn-primary"
        >
          Save
        </button>
      </div>
      <div className="border col-auto">
        <label htmlFor="lastChargeDate">Last Charge Date</label>
        <input id="lastChargeDate" name="lastChargeDate" type="date" />
        <button
          onClick={() =>
            setLastChargeDate(document.getElementById('lastChargeDate').value)
          }
          type="btn"
          className="btn btn-primary"
        >
          Save
        </button>
      </div>
      <div className="col-8">
        <button
          onClick={() => chargeNow()}
          type="btn"
          className="btn btn-primary"
        >
          Charge Now
        </button>
      </div>
      <div className="col-auto">
        <button
          onClick={() => resetForm()}
          type="btn"
          className="btn btn-secondary"
        >
          Reset Form
        </button>
      </div>
    </div>
  );
};

export default PaymentTestKit;

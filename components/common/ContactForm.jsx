'use client';

import useTrans from '@/hooks/useTrans';
import React from 'react';

const ContactForm = () => {
  const { t } = useTrans();

  const handleSubmit = event => {
    event.preventDefault();
    // handle form submission logic here
  };

  return (
    <form className="row y-gap-20 pt-20" onSubmit={handleSubmit}>
      <div className="col-12">
        <div className="form-input">
          <input type="text" id="name" required />
          <label htmlFor="name" className="lh-1 text-16 text-light-1">
            {t('ContactForm.fullName')}
          </label>
        </div>
      </div>
      <div className="col-12">
        <div className="form-input">
          <input type="email" id="email" required />
          <label htmlFor="email" className="lh-1 text-16 text-light-1">
            {t('ContactForm.email')}
          </label>
        </div>
      </div>
      <div className="col-12">
        <div className="form-input">
          <input type="text" id="subject" required />
          <label htmlFor="subject" className="lh-1 text-16 text-light-1">
            {t('ContactForm.messageSubject')}
          </label>
        </div>
      </div>
      <div className="col-12">
        <div className="form-input">
          <textarea id="message" required rows="4"></textarea>
          <label htmlFor="message" className="lh-1 text-16 text-light-1">
            {t('ContactForm.messageDescription')}
          </label>
        </div>
      </div>
      <div className="col-auto" dir="ltr">
        <button
          type="submit"
          className="button px-24 h-50 -dark-1 bg-blue-1 text-white"
        >
          {t('ContactForm.sendMessageBtn')}
          <div className="icon-arrow-top-right ml-15"></div>
        </button>
      </div>
    </form>
  );
};

export default ContactForm;

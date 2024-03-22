export default function Features() {
  return (
    <section className="features demo-wrap">
      <div className="container px-4 pt-5">
        <h2 className="pb-2 border-bottom ">פיצ'רים באתר</h2>
        <div className="row g-4 pt-5 row-cols-1 row-cols-lg-3">
          <div className="feature col-12 col-sm-6 col-lg-4 mb-5">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
              <i className="bi bi-search text-white bg-primary rounded p-2 bi-lg"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">השוואת מחירים</h3>
            <p>השווה מחירים בין Booking ל-Travelor, בכל מקום, בכל זמן.</p>
          </div>
          <div className="feature col-12 col-sm-6 col-lg-4 mb-5">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
              <i className="bi bi-clipboard text-white bg-primary rounded p-2 bi-lg"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">העתק פרטי מלון</h3>
            <p>
              העתק את פרטי המלון הרצוי בלחיצה אחת ושתף אותם ברשתות החברתיות.
            </p>
          </div>
          <div className="feature col-12 col-sm-6 col-lg-4 mb-5">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
              <i className="bi bi-link-45deg text-white bg-primary rounded p-2 bi-lg"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">קיצור קישורי מלונות</h3>
            <p>
              קצר את הקישור בלחיצה אחת באמצעות המערכת המובנית שלנו והעתק אותו
              יחד עם פרטי המלון.
              <br />
            </p>
          </div>

          <div className="feature col-12 col-sm-6 col-lg-4 mb-5">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
              <i className="bi bi-geo text-white bg-primary rounded p-2 bi-lg"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">מצא אטרקציות</h3>
            <p>מצא את אתרי התיירות הפופולריים ביותר בערים בלחיצה אחת.</p>
          </div>
          <div className="feature col-12 col-sm-6 col-lg-4 mb-5">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
              <i className="bi bi-sign-turn-right text-white bg-primary rounded p-2 bi-lg"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">חיפוש מרוחק</h3>
            <p>חפש מלונות דרך מיקומים שונים בעולם והוריד את המחיר עוד יותר.</p>
          </div>
          <div className="feature col-12 col-sm-6 col-lg-4 mb-5">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
              <i className="bi bi-braces-asterisk text-white bg-primary rounded p-2 bi-lg"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">הורדת מחיר בסשן חדש</h3>
            <p>
              הוריד את המחיר באתר Travlor באמצעות הכלי שלנו לפתיחת Travelor בסשן
              חדש.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

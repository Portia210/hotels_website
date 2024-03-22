export default function FiveMins() {
  return (
    <section id="5-minutes" className="px-2 px-sm-4 pt-5">
      <div className="container col-xxl-8 ">
        <h2 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 text-center mb-3 pb-2 border-bottom">
          5 דקות ביום
        </h2>
        <div className="row flex-lg-row-reverse align-items-center g-5">
          <div className="col-12 col-lg-6 mb-3 d-flex justify-content-center">
            <img
              src="/img/landing/5-min.jpg"
              className="d-block mx-lg-auto img-fluid rounded"
              alt="Bootstrap Themes"
              width="500"
              height="350"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <p className="lead">
              אנו מבינים שהזמן שלך יקר ערך, ולכן האתר שלנו תוכנן לעזור לך להשיג
              יותר בפחות זמן.
            </p>
            <h4 className="display-6 mb-3">
              זה מה שהאתר יאפשר לך לעשות ב5 דקות עבודה ביום:
            </h4>
            <ul className="list-group mb-2 list-inline p-0">
              <li className="list-group-item " aria-disabled="true">
                1. בחירת יעד
              </li>
              <li className="list-group-item bg-light">
                2. מציאת אטרקציות תיירותית באותו איזור
              </li>
              <li className="list-group-item">
                3. חיפוש מלונות זולים באותו איזור
              </li>
              <li className="list-group-item bg-light">
                4. מציאת המלונות עם ייתרון המחיר הגדול ביותר לטרוולאור
              </li>
              <li className="list-group-item">
                5. קיצור קישור מותאם אישית למספר הסוכן שלכם
              </li>
              <li className="list-group-item bg-light">
                6. העתקת פרטי המלון והקיצור המקושר בקליק אחד
              </li>
              <li className="list-group-item">
                7. שיתוף 10 מלונות עם המחירים הטובים ביותר ברשתות החברתיות
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

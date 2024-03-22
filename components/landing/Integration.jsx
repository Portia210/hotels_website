export default function Intergration() {
  return (
    <section id="integration" className="demo-wrap">
      <img
        className="demo-bg"
        src="/img/landing/bg/bg-2.png"
        alt=""
        style={{ opacity: 0.2 }}
      />
      <div className="demo-content">
        <div className="px-4 py-5 text-center">
          <div className="d-flex justify-content-center mb-4">
            <div className="bg-light rounded-circle p-2 border border-info">
              <img
                className="rounded-circle"
                src="/img/landing/integration.png"
                alt=""
                width="250"
                height="250"
              />
            </div>
          </div>
          <div className="col-md-9 col-lg-8 mx-auto">
            <h1 className="display-5 fw-bold">אינטגרציה מלאה</h1>
            <p className="lead mb-4">
              כל הפיצ'רים באתר עובדות ביחד בשילוב מלא כדי לאפשר לכל סוכן להיות
              יעיל ככל האפשר.
              <br /> אין לך יותר צורך להשתמש בשירותים חיצוניים כדי לקצר את
              הקישורים שלך או להעתיק את פרטי המלון אחד אחד באופן ידני.
              <br /> האתר יכול לטפל בכל הדברים הללו עבורך
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

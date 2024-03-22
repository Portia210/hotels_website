export default function CreateAccount() {
  return (
    <section id="create-account" className="demo-wrap">
      <img
        className="demo-bg"
        src="/img/landing/bg/bg-3.png"
        alt=""
        style={{ opacity: 0.1 }}
      />
      <div className="px-2 py-5 my-5 text-center">
        <h2 className="display-5 fw-bold text-body-emphasis">יצירת חשבון</h2>
        <div className="col-lg-9 mx-auto">
          <p className="lead mb-4">
            צור חשבון בחינם והתחל להרוויח בעזרת כל הפי'צרים המיוחדים שלנו
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" className="btn btn-primary btn-lg  ml-3 mb-3">
              צור חשבון בחינם
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-lg ml-3 mb-3"
            >
              קרא את המדריך
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-lg mb-3"
            >
              ראה את המחירים
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

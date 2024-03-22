import Image from 'next/image';

export default function Hero() {
  return (
    <section
      className="w-100 h-100 header demo-wrap"
      style={{ backgroundColor: '#051036' }}
    >
      <div className="container">
        <Image
          className="demo-bg"
          width={450}
          height={400}
          src="/img/landing/bg/bg-2.png"
          alt=""
        />
        <div className="demo-content">
          <div className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-4">
              <div className="col-12 col-sm-12 col-lg-6 d-flex justify-content-center align-items-center pb-4 pb-lg-0">
                <Image
                  src="/img/landing/rocket-0.png"
                  alt=""
                  width={400}
                  height={400}
                  style={{ maxHeight: '400px', maxWidth: '100%' }}
                />
              </div>
              <div className="col-lg-6">
                <h2 className="display-5 fw-bold text-light lh-1 mb-3 fs-3 fs-sm-2">
                  הכירו את Agent-Space
                </h2>

                <p className="lead text-light">
                  הפלטפורמה מאפשרת השוואת מחירים בין טרוולאור לבין בוקינג בלחיצת
                  כפתור, בכל מקום ובכל זמן
                </p>
                <p className="lead text-light">
                  הרוויחו בדרכים חדשות בעזרת הכלים שלנו
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg px-4 ml-3 mb-3"
                  >
                    צור חשבון
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-light btn-lg px-4 mb-3"
                  >
                    קרא את המדריך לאתר
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

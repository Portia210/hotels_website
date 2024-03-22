import Image from 'next/image';

export default function WhoWeAre() {
  return (
    <section id="about" className="demo-wrap">
      <img
        className="demo-bg"
        src="/img/landing/bg/bg-1.png"
        alt=""
        style={{ opacity: 0.09 }}
      />
      <div className="demo-content">
        <div className="container col-xxl-8 px-4 py-5">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
                מי אנחנו?
              </h1>
              <p className="lead">
                Agent Space הוא יוזמה שנועדה לסייע לסוכני טרוולאור להגדיל את
                ההכנסות שלהם באמצעות כלים חדשניים.
              </p>
              <p className="lead">
                כלים אלה מאפשרים לסוכנים לאתר בקלות מלונות המציעים את המחירים
                הטובים ביותר לתיירים ולשווק אותם ביעילות ללקוחות.
              </p>
              <p className="lead">
                פיצ'רים נוספים עוזרים לסוכנים להוריד עוד יותר את המחירים ולקדם
                במהירות את הקישורים האישיים שלהם.
                <br />
              </p>
            </div>
            <div className="col-lg-6 d-flex justify-content-center">
              <Image
                src="/img/landing/about.png"
                className="d-block mx-lg-auto img-fluid"
                alt="Bootstrap Themes"
                width="500"
                height="355"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

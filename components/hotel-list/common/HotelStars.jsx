export default function HotelStars({ stars }) {
  return (
    <div>
      {!stars || stars === 0 ? (
        <i className="bi bi-hand-thumbs-up"></i>
      ) : (
        Array.from(Array(stars).keys()).map((_, index) => (
          <i className="icon-star text-16 text-warning" key={index} />
        ))
      )}
    </div>
  );
}

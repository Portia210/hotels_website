export default function PlanCard() {
  const item = {
    title: "Your Plan",
    amount: "Standard",
    description: "20 searches per day",
    icon: <i className="bi bi-box"></i>,
  };
  return (
    <div className="py-30 px-30 rounded-4 bg-white shadow-3">
      <div className="row y-gap-20 justify-between items-center">
        <div className="col-auto text-nowrap">
          <div className="fw-500 lh-14 text-primary">{item.title}</div>
          <div className="text-20 lh-16 fw-600 mt-5">{item.amount}</div>
          <div className="text-15 lh-14 text-light-1 mt-5">
            {item.description}
          </div>
        </div>
        <div className="col-auto text-primary lh-sm text-25">{item.icon}</div>
      </div>
    </div>
  );
}

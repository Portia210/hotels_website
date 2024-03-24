export default function AddPlanForm() {
  return (
    <div className="row">
      <div>
        <label htmlFor="planName" className="form-label">
          Plan Name
        </label>
        <input
          type="text"
          className="form-control border"
          id="planName"
          placeholder="Enter Plan Name"
        />
      </div>
      <div>
        <label htmlFor="price" className="form-label">
          Plan Price
        </label>
        <input
          type="text"
          className="form-control border"
          id="price"
          placeholder="Enter Price"
        />
      </div>
      <div>
        <label htmlFor="duration" className="form-label">
          Duration
        </label>
        <input
          type="text"
          className="form-control border"
          id="price"
          placeholder="Enter Plan Duration"
        />
      </div>
      <div>
        <label htmlFor="position" className="form-label">
          Position
        </label>
        <input
          type="text"
          className="form-control border"
          id="position"
          placeholder="Enter Plan Position"
        />
      </div>
      <div className="row py-20">
        <div className="col-auto form-check d-flex align-items-center x-gap-20">
          <label htmlFor="isPromo">Promo Plan</label>
          <input type="checkbox" className="border w-auto" id="isPromo" />
        </div>
        <div className="col-auto form-check d-flex align-items-center x-gap-20">
          <label htmlFor="isCustomOffer">Custom Offer</label>
          <input type="checkbox" className="border w-auto" id="isCustomOffer" />
        </div>
        <div className="col-auto form-check d-flex align-items-center x-gap-20">
          <label htmlFor="isDefault">Default</label>
          <input type="checkbox" className="border w-auto" id="isDefault" />
        </div>
      </div>
    </div>
  );
}

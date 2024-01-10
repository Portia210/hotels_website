export default function ChildAgeDropDown({ value, onSelect, index }) {
  const ageOptions = Array.from({ length: 17 }, (_, index) => index + 1);

  return (
    <div className="form-group w-full">
      <label htmlFor="childAge">Child {index + 1}</label>
      <select
        className="form-control"
        id="childAge"
        value={value}
        onChange={(e) => onSelect(e.target.value)}
      >
        {ageOptions.map((age) => (
          <option key={age} value={age}>
            {age}
          </option>
        ))}
      </select>
    </div>
  );
}

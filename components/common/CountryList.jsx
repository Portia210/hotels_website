export default function CountryList({
  countries,
  onCountrySelected,
  selectedItem,
}) {
  const handleSelectCountry = (value) => {
    const country = countries.find((item) => item.value === value);
    onCountrySelected(country);
  };

  return (
    <select
      className="mt-2"
      style={{ appearance: "none" }}
      onChange={(e) => handleSelectCountry(e.target.value)}
      value={selectedItem?.value || ""}
      required
    >
      <option value="" disabled>
        Select Country
      </option>
      {countries?.map((item) => (
        <option key={item.value} name={item.label} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

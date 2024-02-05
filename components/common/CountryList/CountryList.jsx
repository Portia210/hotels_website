import { SUPPORTED_COUNTRIES } from "./countries";

const countries = Array.from(SUPPORTED_COUNTRIES, ([value, label]) => ({ value, label }));

export default function CountryList({
  onCountrySelected,
  selectedItem,
}) {
  const handleSelectCountry = (value) => {
    const country = countries.find((item) => item.value === value);
    onCountrySelected(country);
  };

  return (
    <select
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

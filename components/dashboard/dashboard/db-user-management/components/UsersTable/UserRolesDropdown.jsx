import { UserRoles } from '@/utils/roleCheck';

export default function UserRolesDropdown({ value, onChange }) {
  return (
    <select
      className="form-select"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="" disabled>
        Roles
      </option>
      {Object.keys(UserRoles)?.map(key => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>
  );
}

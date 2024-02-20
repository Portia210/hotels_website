import { UserStatus } from '@/utils/roleCheck';

export default function UserStatusDropdown({ value, onChange }) {
  return (
    <select
      className="form-select"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="" disabled>
        Status
      </option>
      {Object.keys(UserStatus).map(status => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}

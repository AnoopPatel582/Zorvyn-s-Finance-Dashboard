import { useApp } from "../context/AppContext";

const RoleSwitcher = () => {
  const { role, setRole } = useApp();

  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="text-sm text-gray-500">Role:</span>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-1 rounded-md text-sm cursor-pointer"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

export default RoleSwitcher;
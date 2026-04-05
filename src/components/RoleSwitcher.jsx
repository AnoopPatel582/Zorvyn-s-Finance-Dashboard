import { useApp } from "../context/AppContext";

const RoleSwitcher = () => {
  const { role, setRole } = useApp();

  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="text-sm text-gray-500 dark:text-gray-400">Role:</span>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border dark:border-gray-600 p-1 rounded-md text-sm cursor-pointer bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

export default RoleSwitcher;
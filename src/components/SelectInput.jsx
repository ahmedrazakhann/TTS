const SelectInput = ({ label, icon: Icon, value, onChange, options }) => {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
        {label}
      </label>
      <div className={Icon ? "relative" : ""}>
        {Icon ? (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        ) : null}
        {options === null ? (
          <div
            className={`px-4 py-3 bg-gray-100 text-gray-500 rounded-xl text-sm ${
              Icon ? "pl-9" : ""
            } `}
          >
            Loading...
          </div>
        ) : options.length === 0 ? (
          <div className="px-4 py-3 bg-gray-100 text-gray-500 rounded-xl text-sm">
            No records
          </div>
        ) : (
          <select
            value={value}
            onChange={onChange}
            className={`w-full ${
              Icon ? "pl-10" : "px-4"
            } pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all`}
          >
            {options.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default SelectInput;

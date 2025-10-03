const SliderInput = ({ label, value, min, max, step, onChange, marks }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
          {label}
        </label>
        <span className="text-sm font-bold text-gray-700">
          {value.toFixed(1)}x
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-800"
      />
      {marks && (
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          {marks.map((mark, idx) => (
            <span key={idx}>{mark}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SliderInput;

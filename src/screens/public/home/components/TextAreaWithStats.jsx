import TextEditorHeader from "./TextEditorHeader";

const TextAreaWithStats = ({
  text,
  onChange,
  charCount,
  wordCount,
  clearText,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <TextEditorHeader />
      <div className="p-6">
        <textarea
          value={text}
          onChange={onChange}
          placeholder="Enter or paste your text here... You can type up to 100,000 characters for conversion to speech."
          className="w-full h-64 p-4 text-base text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent resize-none transition-all leading-relaxed"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        />

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">
                {charCount.toLocaleString()}
              </span>{" "}
              / 100,000 characters
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">
                {wordCount.toLocaleString()}
              </span>{" "}
              words
            </span>
          </div>

          <button
            onClick={clearText}
            className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextAreaWithStats;

import { FileText } from "lucide-react";

const TextEditorHeader = () => {
  return (
    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-700" />
          <h3 className="font-semibold text-gray-900">Text Editor</h3>
        </div>
      </div>
    </div>
  );
};

export default TextEditorHeader;

import { memo } from "react";
const ErrorBoundaryDialog = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex flex-col items-center text-center">
          <p className="text-gray-800 text-lg">
            An error has occurred while rendering. Please reload the page.
          </p>
        </div>
        <div className="mt-6">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
            Reload
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ErrorBoundaryDialog);

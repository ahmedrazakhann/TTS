const Header = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-100 to-gray-100  border-b border-gray-200 sticky top-0 z-50 ">
      <div className="max-w-[1400px] mx-auto px-6 ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Logo</h1>
                <p className="text-xs text-gray-500">
                  Professional TTS Platform
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Pricing
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Documentation
            </button>
            <button className="px-5 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-gray-900 transition-all shadow-md hover:shadow-lg">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

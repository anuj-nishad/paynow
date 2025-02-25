export function Button({ buttonText, loading }) {
  return (
    <button
      type="submit"
      className="bg-blue-700 text-white w-full py-3 rounded-md my-5 hover:bg-blue-800 flex justify-center items-center gap-2 disabled:opacity-50"
      disabled={loading}
    >
      {loading && (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      )}
      {buttonText}
    </button>
  );
}

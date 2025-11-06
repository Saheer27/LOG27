import Link from "next/link";

export default function NewLogBtn() {
  return (
    <>
      <div className="flex justify-center my-6">
        <Link
          href="/newLogs"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-blue-700 active:scale-95 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Log
        </Link>
      </div>
    </>
  );
}

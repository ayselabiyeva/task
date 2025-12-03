import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const generatePageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <Link
        href={currentPage === 1 ? "/" : `/?page=${currentPage - 1}`}
        className={`px-4 py-2 rounded-lg border ${
          currentPage === 1
            ? "border-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
            : "border-gray-300 text-gray-700 hover:bg-gray-100"
        }`}
      >
        Previous
      </Link>

      {pages.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
              ...
            </span>
          );
        }

        return (
          <Link
            key={page}
            href={`/?page=${page}`}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === page
                ? "bg-amber-600 text-white border-amber-600"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        );
      })}

      <Link
        href={currentPage === totalPages ? "/" : `/?page=${currentPage + 1}`}
        className={`px-4 py-2 rounded-lg border ${
          currentPage === totalPages
            ? "border-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
            : "border-gray-300 text-gray-700 hover:bg-gray-100"
        }`}
      >
        Next
      </Link>
    </div>
  );
}
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "./ui/button";

interface PaginationProps {
  pagination: {
    page: number;
    total: number;
    pages: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export const Pagination = ({ pagination, onPageChange, loading }: PaginationProps) => {
  const { page, pages , total } = pagination;
  const hasPrev = pagination.hasPrev ?? page > 1;
  const hasNext = pagination.hasNext ?? page < pages;

  // Generar números de páginas para mostrar
  const getPageNumbers = () => {
    const pagesArray = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pages, startPage + maxVisiblePages - 1);

    // Ajustar startPage si endPage es menor que maxVisiblePages
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesArray.push(i);
    }

    return pagesArray;
  };

  if (pages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
      <div className="text-sm text-gray-700">
        Página <span className="font-semibold">{page}</span> de{' '}
        <span className="font-semibold">{pages}</span>
        {' '}({total} en total)
      </div>

      <div className="flex items-center space-x-1">
        {/* Primera página */}
        {page > 1 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={loading}
            className="size-8 cursor-pointer px-0"
          >
            <ChevronsLeft />
          </Button>
        )}

        {/* Página anterior */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrev || loading}
          className="size-8 cursor-pointer px-0"
        >
          <ChevronLeft />
        </Button>

        {/* Números de página */}
        <div className="flex space-x-1">
          {pageNumbers.map((pageNum) => (
            <Button
              variant={pageNum === page ? "default" : "outline"}
              size="sm"
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              disabled={loading}
              className="size-8 cursor-pointer px-0"
            >
              {pageNum}
            </Button>
          ))}
        </div>

        {/* Página siguiente */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNext || loading}
          className="size-8 cursor-pointer px-0"
        >
          <ChevronRight />
        </Button>

        {/* Última página */}
        {page < pages && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pages)}
            disabled={loading}
            className="size-8 cursor-pointer px-0"
          >
            <ChevronsRight />
          </Button>
        )}
      </div>
    </div>
  );
}

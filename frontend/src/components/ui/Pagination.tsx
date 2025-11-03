import React from 'react';
import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    const halfVisible = Math.floor(maxVisible / 2);

    let start = Math.max(1, currentPage - halfVisible);
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <Button
        variant="ghost"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      {pageNumbers[0] > 1 && (
        <>
          <Button variant="ghost" onClick={() => onPageChange(1)}>
            1
          </Button>
          {pageNumbers[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'primary' : 'ghost'}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span className="px-2">...</span>}
          <Button variant="ghost" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="ghost"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
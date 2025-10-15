import * as React from 'react';

import LeftArrowIcon from '@/assets/svgs/admin/dashboard/arrow-left-icon.svg';
import RightArrowIcon from '@/assets/svgs/admin/dashboard/arrow-right-icon.svg';
import { cn } from '@/lib/utils';

interface TablePaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationButton: React.FC<
  React.ComponentProps<'button'> & { isActive?: boolean }
> = ({ children, isActive = false, className, ...props }) => (
  <button
    className={cn(
      'w-8 h-8 flex items-center justify-center rounded-[10px] text-sm transition-colors',
      'font-medium border border-transparent text-primaryBlue',
      isActive
        ? 'bg-primaryOrange/80' // Active style
        : 'bg-primaryBlue/10 hover:bg-primaryBlue/20', // Default style
      className
    )}
    {...props}
  >
    {children}
  </button>
);

const TablePagination: React.FC<TablePaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const getPages = () => {
    // Logic to show a limited number of pages (e.g., 1, 2, 3, 4, >)
    const pages: (number | '...')[] = [];
    const maxVisiblePages = 4;

    for (let i = 1; i <= Math.min(totalPages, maxVisiblePages); i++) {
      pages.push(i);
    }

    // Add ellipsis if more pages exist
    if (totalPages > maxVisiblePages) {
      pages.push('...');
    }

    return pages;
  };

  const handlePageClick = (page: number | '...') => {
    if (typeof page === 'number') {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 p-2">
      {/* Previous Button */}
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 text-primaryOrange hover:bg-primaryBlue/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <LeftArrowIcon />
      </PaginationButton>

      {/* Page Numbers */}
      {getPages().map((page, index) => (
        <React.Fragment key={index}>
          {typeof page === 'number' ? (
            <PaginationButton
              isActive={page === currentPage}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </PaginationButton>
          ) : (
            <span className="text-primaryBlue/70 px-2 py-1">...</span>
          )}
        </React.Fragment>
      ))}

      {/* Next Button */}
      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 text-primaryOrange hover:bg-primaryBlue/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RightArrowIcon />
      </PaginationButton>
    </div>
  );
};

export default TablePagination;

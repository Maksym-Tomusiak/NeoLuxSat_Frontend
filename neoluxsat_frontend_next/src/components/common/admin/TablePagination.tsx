import * as React from "react";

import LeftArrowIcon from "@/assets/svgs/admin/dashboard/arrow-left-icon.svg?component";
import RightArrowIcon from "@/assets/svgs/admin/dashboard/arrow-right-icon.svg?component";
import { cn } from "@/lib/utils";

interface TablePaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationButton: React.FC<
  React.ComponentProps<"button"> & { isActive?: boolean }
> = ({ children, isActive = false, className, ...props }) => (
  <button
    className={cn(
      "w-8 h-8 flex items-center justify-center rounded-[10px] text-sm transition-colors",
      "font-medium border border-transparent text-primaryBlue",
      isActive
        ? "bg-primaryOrange/80" // Active style
        : "bg-primaryBlue/10 hover:bg-primaryBlue/20", // Default style
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
  // 💡 --- UPDATED PAGINATION LOGIC --- 💡
  const getPages = () => {
    const pages: (number | "...")[] = [];
    const siblingCount = 2; // Show 2 pages on each side of current (for a 5-page range)

    // --- 1. Handle simple case (fewer pages than our complex display) ---
    // Max items to show: 1 + ... + (current + 2 siblings) + ... + last
    // (1) + (1) + (siblingCount * 2 + 1) + (1) + (1) = 9
    const maxPagesToShow = 1 + 1 + (siblingCount * 2 + 1) + 1 + 1;
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // --- 2. Calculate "sliding window" range ---
    let rangeStart = Math.max(2, currentPage - siblingCount);
    let rangeEnd = Math.min(totalPages - 1, currentPage + siblingCount);

    // Adjust range if it's near the start
    if (currentPage - siblingCount < 2) {
      rangeEnd = Math.min(totalPages - 1, rangeStart + siblingCount * 2);
    }

    // Adjust range if it's near the end
    if (currentPage + siblingCount > totalPages - 1) {
      rangeStart = Math.max(2, rangeEnd - siblingCount * 2);
    }

    // --- 3. Build the pages array ---

    // Always add page 1
    pages.push(1);

    // Add left ellipsis if gap exists
    if (rangeStart > 2) {
      pages.push("...");
    }

    // Add the page range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Add right ellipsis if gap exists
    if (rangeEnd < totalPages - 1) {
      pages.push("...");
    }

    // Always add last page (if it's not 1)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };
  // 💡 --- END OF UPDATED LOGIC --- 💡

  const handlePageClick = (page: number | "...") => {
    if (typeof page === "number") {
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
          {typeof page === "number" ? (
            <PaginationButton
              isActive={page === currentPage}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </PaginationButton>
          ) : (
            <span className="text-primaryBlue/70 px-2 py-1 flex items-center justify-center w-8 h-8">
              ...
            </span>
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

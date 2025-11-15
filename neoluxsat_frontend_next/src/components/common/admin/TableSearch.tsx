import * as React from "react";

// You will need to replace SearchIcon with your actual SVG component
import SearchIcon from "@/assets/svgs/admin/dashboard/search-icon.svg?component";

interface TableSearchProps extends React.ComponentProps<"input"> {
  // Add any specific search props here, like onSearchSubmit
}

const TableSearch: React.FC<TableSearchProps> = ({ className, ...props }) => {
  return (
    <div className="relative flex items-center w-full max-w-[250px]">
      <input
        type="text"
        className="w-full h-10 py-2 pl-4 pr-10 text-sm font-normal text-primaryBlue bg-primaryBlue/10 rounded-full focus:outline-none focus:ring-2 focus:ring-primaryOrange focus:z-10 transition-colors placeholder:text-primaryBlue/70"
        placeholder="Пошук"
        {...props}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <SearchIcon />
      </div>
    </div>
  );
};

export default TableSearch;

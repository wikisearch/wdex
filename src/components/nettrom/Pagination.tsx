import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export default function Pagination(props: ReactPaginateProps) {
  if (!props.pageCount || props.pageCount <= 1) return null;
  const linkClass =
    "flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#311B56]/10 text-sm font-bold text-[#311B56]/60 transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-[#311B56] hover:text-[#311B56] hover:shadow-brutal-sm active:translate-x-0 active:translate-y-0 active:shadow-none";
  return (
    <div className="flex w-full items-center justify-center">
      <ReactPaginate
        breakLabel={
          <span className="flex h-9 w-9 items-center justify-center text-[#311B56]/30">
            <MoreHorizontal className="h-4 w-4" />
          </span>
        }
        nextLabel={<ChevronRight className="h-4 w-4" />}
        previousLabel={<ChevronLeft className="h-4 w-4" />}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        renderOnZeroPageCount={null}
        containerClassName="flex items-center justify-center gap-1.5 p-2"
        pageLinkClassName={linkClass}
        activeLinkClassName="!border-[#311B56] !bg-[#311B56] !text-[#FAF8F5] !font-black !shadow-brutal-sm"
        previousLinkClassName={linkClass}
        nextLinkClassName={linkClass}
        disabledClassName="opacity-30 cursor-not-allowed pointer-events-none"
        breakLinkClassName="flex items-center justify-center"
        {...props}
      />
    </div>
  );
}

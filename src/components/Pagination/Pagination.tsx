
import css from "./Pagination.module.css"
import ReactPaginate from 'react-paginate';

interface PaginationProps{
    pages: number,
    currentPage: number
    onPageChange: (selectedPage: number) => void;
}

export default function Pagination({ pages, currentPage, onPageChange }: PaginationProps) {
    
    const handlePageClick = (event: { selected: number }) => {
        onPageChange(event.selected + 1);
    }

    return (
        <ReactPaginate
            pageCount={pages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={handlePageClick}
            forcePage={currentPage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
        />
    )
}

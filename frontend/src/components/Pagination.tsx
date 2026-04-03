interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;

}

const Pagination = ({currentPage, totalPages, onPageChange}: PaginationProps) => {
    return (
        <>
            {totalPages > 0 && (
                <nav className="mt-4" aria-label="Book list pages">
                    <ul className="pagination justify-content-center flex-wrap mb-0">
                        <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                            <button type="button" className="page-link" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>Previous</button>
                        </li>
                        {[...Array(totalPages)].map((_, i) => (
                        <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button type="button" className="page-link" onClick={() => onPageChange(i + 1)} aria-current={currentPage === i + 1 ? 'page' : undefined}>
                                {i + 1}
                            </button>
                        </li>
                        ))}
                        <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
                            <button type="button" className="page-link" disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</button>
                        </li>
                    </ul>
                </nav>
                )}

        </>
        
    );
}

export default Pagination;
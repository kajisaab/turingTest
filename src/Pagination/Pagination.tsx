/* eslint-disable @typescript-eslint/no-explicit-any */
import classnames from 'classnames';
import { DOTS, usePagination } from '../hooks/usePagination';
import './Pagination.css';

interface paginationPropsInterface {
    totalCount: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (pageNumber: any) => void;
    className: string;
}

function Pagination(props: paginationPropsInterface) {
    const { totalCount, currentPage, pageSize, onPageChange, className } =
        props;
    const siblingsCount = 1;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingsCount,
        pageSize,
    });

    if (currentPage === 0 || paginationRange?.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    const lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul
            className={classnames('pagination-container', {
                [className]: className,
            })}
        >
            {/* Left navigation arrow */}
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === 1,
                })}
                onClick={onPrevious}
            >
                <div className='arrow left' />
            </li>
            {paginationRange.map((pageNumber, ind: number) => {
                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                    return <li className='pagination-item dots'>&#8230;</li>;
                }

                // Render our Page Pills
                return (
                    <li
                        className={classnames('pagination-item', {
                            selected: pageNumber === currentPage,
                        })}
                        key={ind}
                        onClick={() => onPageChange(pageNumber as string)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            {/*  Right Navigation arrow */}
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === lastPage,
                })}
                onClick={onNext}
            >
                <div className='arrow right' />
            </li>
        </ul>
    );
}

export default Pagination;

import { useMemo } from 'react';

interface paginationPropsInterface {
    currentPage: number;
    totalCount: number;
    pageSize: number;
    siblingsCount?: number;
}
const range = (start: number, end: number) => {
    const length = end - start + 1;

    return Array.from({ length }, (_, ind) => ind + start);
};

const DOTS = '...';

function usePagination(props: paginationPropsInterface) {
    const { totalCount, pageSize, siblingsCount = 1, currentPage } = props;

    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);

        const totalPageSize = siblingsCount + 5;

        if (totalPageSize >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftInitialIndex = Math.max(currentPage - siblingsCount, 1);
        const rightInitialIndex = Math.min(
            currentPage + siblingsCount,
            totalPageCount
        );

        const shouldShowLeftDots = leftInitialIndex > 2;
        const shouldShowRightDots = totalPageCount - 2 > rightInitialIndex;

        const frontInitialIndex = 1;
        const lastEndIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItem = 3 + 2 * siblingsCount;
            const leftRange = range(1, leftItem);
            return [...leftRange, DOTS, totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItem = 3 + 2 * siblingsCount;
            const rightRange = range(
                totalPageCount - rightItem,
                totalPageCount
            );
            return [frontInitialIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftInitialIndex, rightInitialIndex);
            return [
                frontInitialIndex,
                DOTS,
                ...middleRange,
                DOTS,
                lastEndIndex,
            ];
        }

        return [];
    }, [currentPage, totalCount, siblingsCount, pageSize]);

    return paginationRange;
}

export { usePagination, DOTS };

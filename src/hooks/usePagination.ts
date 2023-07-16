import { useMemo } from 'react';
export const DOTS = '...';

const range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, index) => index + start);
};
type PaginationProps = {
    total: number;
    buttonConst: number;
    siblingCount: number;
    currentPage: number;
};

export const usePagination = ({ total, buttonConst, siblingCount, currentPage }: PaginationProps) => {
    const paginationRange = useMemo(() => {
        const totalPageNumbers = buttonConst + 2 * siblingCount;

        if (totalPageNumbers >= total) {
            return range(1, total);
        }
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, total);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex <= total - 2;

        const firstPageIndex = 1;
        const lastPageIndex = total;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, total];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(total - rightItemCount + 1, total);

            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
    }, [total, siblingCount, currentPage, buttonConst]);

    return paginationRange;
};

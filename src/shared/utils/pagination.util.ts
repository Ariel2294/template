export const paginateResult = async (
  count: number,
  results: any[],
  limit: number,
  page: number,
) => {
  const totalPages = Math.ceil(count / limit);
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  const previousPage = hasPreviousPage ? currentPage - 1 : null;
  const nextPage = hasNextPage ? currentPage + 1 : null;
  const hasEllipsisBefore = currentPage > 4;
  const hasEllipsisAfter = currentPage < totalPages - 3;

  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 2 && i <= currentPage + 2)
    ) {
      pageLinks.push(i);
    }
  }
  return {
    results,
    totalRecords: count,
    totalPages,
    currentPage,
    hasPreviousPage,
    hasNextPage,
    previousPage,
    nextPage,
    hasEllipsisBefore,
    hasEllipsisAfter,
    pageLinks,
  };
};

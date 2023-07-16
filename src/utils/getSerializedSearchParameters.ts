type SearchParamsType = { page: number; limit: number; query: string; sort: string; order: string };

export const getSerializedSearchParameters = (searchParameters: SearchParamsType) => {
    const sortedSearchParameters = Object.fromEntries(
        Object.entries(searchParameters).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    );
    return JSON.stringify(sortedSearchParameters);
};

/**
 * Synchronizes the given state with the url-search-params
 * @param initial Initial state
 */
export declare function useUrlSynchedState<T extends Record<string, string | number | Array<string | number>>>(initial: T): [T, <K extends keyof T>(key: K, newVal: string) => void]
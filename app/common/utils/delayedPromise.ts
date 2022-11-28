export const delayedPromise = <T>(thunk: () => T) => new Promise<T>((resolve) => setTimeout(() => resolve(thunk()), 0));

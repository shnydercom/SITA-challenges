const MAX_CONCURRENCY: number = 14;

/**
 * the response url is the resolved URL on the server.
 * Code that requests this function would most likely want to match the result
 * to a request
 */
type FulfilledRequest = {
  requestedURL: URL,
  response: Response
}

export async function fetchURLsConcurrently(
  requestedURLs: URL[],
  maxConcurrentRequest: number = MAX_CONCURRENCY
): Promise<FulfilledRequest[]> {
  let nextURLidx: number = 0;
  const internalRequestCount =
    requestedURLs.length < maxConcurrentRequest
      ? requestedURLs.length
      : maxConcurrentRequest;
  const appendingNextRequestsWrapperFn = (): Promise<FulfilledRequest[]> => {
    const wrapperResult = new Promise<FulfilledRequest[]>(async (resolve, reject) => {
      const executorResult: FulfilledRequest[] = []
      let nextUrl: URL | null = requestedURLs[nextURLidx];
      do {
        const [response, _nextUrlAfterResponse] = await executeRequestFn(nextUrl);
        executorResult.push({
          requestedURL: nextUrl,
          response: response});
        nextUrl = _nextUrlAfterResponse
      } while (!!nextUrl);
      resolve(executorResult);
    });
    return wrapperResult;
  };
  const executeRequestFn = (url: URL): Promise<[Response, URL | null]> => {
    return fetch(url).then((response) => {
      const nextUrl =
        nextURLidx <= internalRequestCount ? requestedURLs[nextURLidx] : null;
      nextURLidx++;
      return [response, nextUrl];
    });
  };

  const concurrentPromises: Promise<FulfilledRequest[]>[] = [];
  for (let i = 0; i < internalRequestCount; i++) {
    concurrentPromises.push(appendingNextRequestsWrapperFn());
    nextURLidx++;
  }
  const result: FulfilledRequest[] = await Promise.all(concurrentPromises).then(
    (allResolvedRequests) => {
      //joins the Result arrays
      return allResolvedRequests.flat();
    }
  );
  return result;
}

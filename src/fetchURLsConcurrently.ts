const MAX_CONCURRENCY: number = 14;

export async function fetchURLsConcurrently(
  requestedURLs: URL[],
  maxConcurrentRequest: number = MAX_CONCURRENCY
): Promise<Response[]> {
  let nextURLidx: number = 0;
  const internalRequestCount =
    requestedURLs.length < maxConcurrentRequest
      ? requestedURLs.length
      : maxConcurrentRequest;
  const appendingNextRequestsWrapperFn = (): Promise<Response[]> => {
    const wrapperResult = new Promise<Response[]>(async (resolve, reject) => {
      const executorResult: Response[] = []
      let nextUrl: URL | null = requestedURLs[nextURLidx];
      do {
        const [response, _respNextUrl] = await executeRequestFn(nextUrl);
        executorResult.push(response);
        nextUrl = _respNextUrl
      } while (!!nextUrl);
      resolve(executorResult);
    });
    return wrapperResult;
  };
  const executeRequestFn = (url: URL): Promise<[Response, URL | null]> => {
    return fetch(url).then((response) => {
      const nextUrl =
        nextURLidx < internalRequestCount ? requestedURLs[nextURLidx] : null;
      nextURLidx++;
      return [response, nextUrl];
    });
  };

  const concurrentPromises: Promise<Response[]>[] = [];
  for (let i = 0; i < internalRequestCount; i++) {
    concurrentPromises.push(appendingNextRequestsWrapperFn());
    nextURLidx++;
  }
  const result: Response[] = await Promise.all(concurrentPromises).then(
    (allResolvedRequests) => {
      //joins the Result arrays
      return allResolvedRequests.flat();
    }
  );
  return result;
}

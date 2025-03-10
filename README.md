# SITA-challenges, notes

# challenge 1, Concurrency Exercise
- graceful error handling has been mostly ignored, since it wasn't specified
- the url of the Response object often doesn't match the one of the response, especially after redirects, so the output includes the url of the request

# challenge 2, The License Plate Problem
- I first tried to solve the problem on my own, when I had a working solution I searched and found the challenge online
- test data from the (slightly different) challenge showed that the code was working, with an adjustment for license plate length
- however, the code fails with a `RangeError: Maximum call stack size exceeded` under default settings. I've included the `npm run largestacktest` option to show a working option, but I think this state of the code is a good entrypoint for discussion
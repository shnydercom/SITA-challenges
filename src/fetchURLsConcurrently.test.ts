import { fetchURLsConcurrently } from "./fetchURLsConcurrently";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ thisIsAMockProperty: "on a mock Response object" }),
  }),
) as jest.Mock;

test("Should fetch smaller number of URLs from server", async () => {
  const input = [
    "http://schema.org/Thing",
    "http://schema.org/Person",
    "http://schema.org/Product",
  ].map((val) => new URL(val));
  //this one
  const actual = await fetchURLsConcurrently(input);
  expect(actual.length).toBe(input.length);
});

test("Should fetch larger number of URLs from server", async () => {
  const input = [
    "http://schema.org/Thing",
    "http://schema.org/Person",
    "http://schema.org/Product",
		"http://schema.org/Action",
    "http://schema.org/Event",
    "http://schema.org/Intangible",
		"http://schema.org/MedicalEntity",
    "http://schema.org/Organization",
    "http://schema.org/Place",
		"http://schema.org/Taxon",
    "http://schema.org/CreativeWork",
    "http://schema.org/Blog",
		"http://schema.org/Conversation",
    "http://schema.org/Episode",
    "http://schema.org/Movie",
  ].map((val) => new URL(val));
  //this one
  const actual = await fetchURLsConcurrently(input);
	//console.log(actual)
  expect(actual.length).toBe(input.length);
});

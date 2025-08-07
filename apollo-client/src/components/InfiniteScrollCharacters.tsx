import { useQuery } from "@apollo/client";
import { useEffect, useRef, useCallback } from "react";
import { GET_CHARACTERS_INFINITE_SCROLL } from "../graphql_quries/queries";

export default function InfiniteScrollCharacters() {
  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS_INFINITE_SCROLL, {
    // It's cursor-based in behavior, but UI-wise, it's usually a button or infinite scroll to append data instead of replacing it.
    variables: { page: 1 },
    notifyOnNetworkStatusChange: true,
  });

  const loader = useRef(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && data?.characters?.info?.next) {
        fetchMore({
          variables: {
            page: data.characters.info.next,
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prevResult;
            return {
              characters: {
                ...fetchMoreResult.characters,
                results: [
                  ...prevResult.characters.results,
                  ...fetchMoreResult.characters.results,
                ],
              },
            };
          },
        });
      }
    },
    [data, fetchMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  if (loading && !data) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {data.characters.results.map((char: any) => (
        <div key={char.id} className="border p-2 rounded shadow">
          <img src={char.image} alt={char.name} className="w-full" />
          <p>{char.name}</p>
        </div>
      ))}
      <div ref={loader} />
    </div>
  );
}

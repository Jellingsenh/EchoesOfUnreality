import { useEffect } from "react";
import { baseApiUrl } from "../../../../../resources/constants";

export default function getInitialLocationsFromAPI(
    searchStr: string | null,
    typeFilter: string | null,
    breathableFilter: string | null,
    sortBy: string,
    descending: boolean,
    setOffset: React.Dispatch<React.SetStateAction<number>>,
    doRefresh: boolean,
    setLoadingLocations: React.Dispatch<React.SetStateAction<boolean | null>>,
    setNoLocationsExist: React.Dispatch<React.SetStateAction<boolean | null>>,
    setMaxInfiniteItemWidth: (itemList: { name: string; type: string; }[]) => void,
    setAllCompressedLocations: React.Dispatch<React.SetStateAction<{name: string, type: string}[]>>,
    setEndOfList: React.Dispatch<React.SetStateAction<boolean>>,
    noFilters: boolean,
) {
  // Debouncer timer (unused)
  // Create a ref to track the timeout
  // const debounceTimer = useRef(null);

  // // Cleanup the timer when the component unmounts
  // useEffect(() => {
  //   return () => {
  //     if (debounceTimer.current) {
  //       clearTimeout(debounceTimer.current);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    if (searchStr && searchStr.length == 1) return
    // console.log('filters:\n  ' 
    //   + searchStr + '\n  '
    //   + typeFilter + '\n  '
    //   + breathableFilter + '\n  '
    //   + sortBy + '\n  '
    //   + descending + '\n  '
    //   + doRefresh + '.')

    const controller = new AbortController(); // stop call from happenig 2x
    const { signal } = controller;

    async function getCompressedLocations()  {
      setLoadingLocations(true); // Start loading state
      setOffset(0) // reset offset every time a new initial search happens (ex: on filter change)
      try {
        const res = await fetch(baseApiUrl + '/getCompressedLocations/0/20', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "name": searchStr,
            "type": typeFilter, 
            "breathable": breathableFilter,
            // "parent": parentFilter,
            "sortBy": sortBy,
            "descending": descending.toString()
          }),
          signal, // Attach the signal to the fetch request
        },);
        console.log('Getting locations...')
        const result = await res.json();
        // console.log('Got locations: ' + JSON.stringify(result))
        setNoLocationsExist(noFilters && (result.length == 0));
        setMaxInfiniteItemWidth(result ?? [])
        setAllCompressedLocations(result ?? []);
        if (result.length < 20) {
          setEndOfList(true)
        }
      } catch (error: any) {
        if (error.name === 'AbortError') {
          // console.log('Request was canceled intentionally.');
          return; // Gracefully exit
        }
        console.error('Error posting data:', error);
      } finally {
        setLoadingLocations(false); // End loading state regardless of success or failure
        // clearTimeout(timeoutId);
      }
    }

    // // Clear the previous timer if the button is clicked again
    // if (debounceTimer.current) {
    //   clearTimeout(debounceTimer.current);
    // }

    // // Set a 500ms delay before actually fetching/refreshing
    // debounceTimer.current = setTimeout(() => {
    //   // Perform your actual refresh or fetch logic here
    // }, 500); 

    getCompressedLocations()
    setEndOfList(false)
    
    return () => {
      // clearTimeout(timeoutId);
      controller.abort(); // stop call from happenig 2x
    };
  }, [searchStr, typeFilter, breathableFilter, sortBy, descending, doRefresh])
}

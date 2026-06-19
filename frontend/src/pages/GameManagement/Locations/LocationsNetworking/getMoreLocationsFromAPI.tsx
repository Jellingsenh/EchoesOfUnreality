import { useEffect, useState } from "react";
import { baseApiUrl } from "../../../../../resources/constants";

export default function getMoreLocationsFromAPI(
    offset: number,
    setOffset: React.Dispatch<React.SetStateAction<number>>,
    searchStr: string | null,
    typeFilter: string | null,
    breathableFilter: string | null,
    sortBy: string,
    descending: boolean,
    loadMoreInView: boolean,
    loadingLocations: boolean | null,
    setAllCompressedLocations: React.Dispatch<React.SetStateAction<{name: string, type: string}[]>>,
    setMaxInfiniteItemWidth: (itemList: { name: string; type: string; }[]) => void,
    setEndOfList: React.Dispatch<React.SetStateAction<boolean>>,
) {
    const [loadingMore, setLoadingMore] = useState(false) // loading state

    useEffect(() => {
        const controller2 = new AbortController(); // stop call from happenig 2x
        const { signal } = controller2;
    
        async function getMoreCompressedLocations()  {
          setLoadingMore(true)
          try {
            const res = await fetch(baseApiUrl + '/getCompressedLocations/' + (offset+20) + '/20', { // '/' + limit
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
            });
            console.log('Getting more locations...') // (newOffset = ' + (offset+20) + ')')
            const result = await res.json();
            setAllCompressedLocations(prevItems => {
              const newItems = [...prevItems, ...result]
              // console.log('items added: ',newItems.length-prevItems.length)
              if (newItems.length-prevItems.length < 20) { // getting 20 at a time. If < 20, list is over
                // console.log('end of list')
                setEndOfList(true)
              }
              setMaxInfiniteItemWidth(newItems ?? [])
              return newItems;
            });
            setOffset(prev => prev + 20)
          } catch (error: any) {
            if (error.name === 'AbortError') {
              // console.log('Request was canceled intentionally.');
              return; // Gracefully exit
            }
            console.error('Error posting data:', error);
          } finally {
            setLoadingMore(false)
          }
        }
    
        // console.log('loadMoreInView:', loadMoreInView)
        if (loadMoreInView && !loadingLocations && !loadingMore) {
          getMoreCompressedLocations();
        }
    
        return () => {
          controller2.abort(); // stop call from happenig 2x
        };
      }, [loadMoreInView])
}

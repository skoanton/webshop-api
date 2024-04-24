import { ItemsContext } from "@/contexts/ItemContext/ItemsContext";
import { ITEM_ACTION } from "@/contexts/ItemContext/ItemsReducer";
import { useFetch } from "@/hooks/useFetch";
import { Item } from "@/types/itemsType";
import { useContext, useEffect } from "react";

 export const fetchDataFromApi = () => {
    const BASE_URL = "https://api.escuelajs.co/api/v1/products";
    const fetchedData: Item[] | null = useFetch<Item[]>({
        url: BASE_URL,
      });
    const {itemsDispatch} = useContext(ItemsContext);
    useEffect(() => {
        console.log("Fetchin data from api");
        if (fetchedData) {
          //Weird image links in api response
         /*  const cleanedData = fetchedData.map((item) => {
            const cleanedImages = item.images.map((imageString) =>
              imageString.replace(/"/g, "").replace("[", "").replace("]", "")
            );
            return { ...item, images: cleanedImages };
          }); */
    
          itemsDispatch({
            type: ITEM_ACTION.ADD,
            payload:
              fetchedData /*BYT UT OM DET INTE FUNGERAR cleanedData | fetchedData*/,
          });
        }
      }, [fetchedData]);
 }

 export const fetchDataLoader  = async() : Promise<Item[]> => {
    console.log("Fetchin data from api");
    const URL = "https://fakestoreapi.com/products";

    try {
        const response = await fetch(URL);

        if(!response.ok){
            throw new Error("Something went wrong,");
        }

        const fetchedData : Item[] = await response.json();
        console.log(fetchedData);
        return fetchedData;
        
    } catch (error) {
        console.error("Failed to fetch data", error);
        return [] as Item[]
    }


 }
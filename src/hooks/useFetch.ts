import { useEffect,useState } from "react";

type useFetchProps<T> = {
    url: string,
}

export const useFetch =<T extends object> ({url}: useFetchProps<T>): T | null => {

    const [data,setData] = useState<T | null>(null);
    const [isLoading,setLoading] = useState(true);
    useEffect (() => {
        const fetchApi = async () => {
            try{
                const response = await fetch(url);
                const data = await response.json();

            if(!ignore){
                setData(data);
                setLoading(false);
            }
            }
            catch(error){
                console.log("error", error);
            }
        }
        let ignore = false;
        fetchApi();

        return () => {
            ignore = true;
            
        }
    },[url])
    return data;

}
import { useCallback } from "react";


export const useHttp = () => {

    const sendRequest = useCallback( async ( url, info, applyData, errorHandler ) => {
        try {
            const response = await fetch( url, info
            );
            
            if (!response.ok) {
                errorHandler();
                throw new Error('Request failerd!');
            };
            const data = await response.json();
            if (data !== null) {
                applyData(data)
            } else {
                errorHandler()
            };
            
        } catch(err) {
            return;
        };
    }, []);
    return {
        sendRequest
    };
};
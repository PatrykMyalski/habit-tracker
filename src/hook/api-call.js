import { useCallback } from "react";


export const useHttp = () => {

    const sendRequest = useCallback(async (url, info, applyData = null, errorHandler = null) => {
        try {
            const response = await fetch(url, info);
            if (!response.ok) {
                if (errorHandler !== null) {
                    errorHandler();
                }
                throw new Error('Request failerd!');
            };
            const data = await response.json();
            if (data !== null & applyData !== null) {
                applyData(data);
            };
        } catch (err) {
            return;
        };
    }, []);
    return sendRequest;
};
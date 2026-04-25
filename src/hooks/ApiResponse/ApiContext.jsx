import { createContext, useContext, useState } from "react";

export const ApiContext = createContext();

export function ApiProvider({ children }) {
    const [apiResponse, setApiResponse] = useState("");
    const [apiResponseColor, setApiResponseColor] = useState("");

    return <ApiContext.Provider value={{ apiResponse, setApiResponse, apiResponseColor, setApiResponseColor }}>
        {children}
    </ApiContext.Provider>;
}

export const useApiResponse = () => useContext(ApiContext);
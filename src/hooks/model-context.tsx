/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext } from "react";
import { ModelContextType } from "@/types/model-context-types";

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export const useModel = (): ModelContextType => {
    const context = useContext(ModelContext);
    if (context === undefined) {
        throw new Error("useModel must be used within a ModelProvider");
    }
    return context;
};

export default ModelContext;

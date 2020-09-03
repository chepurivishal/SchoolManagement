import React,{createContext} from "react";

const roleContext = createContext({
    role :"",
    updateRole : () => {}
});
export const roleContextProvider = roleContext.Provider;
export default roleContext;
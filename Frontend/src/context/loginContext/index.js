    import React, { createContext } from 'react';

    const LoginContext = createContext({
        isLoggedIn : false,
        toggleLogIn: () => {}
    });

    export const LoginContextProvider = LoginContext.Provider;
    export default LoginContext;
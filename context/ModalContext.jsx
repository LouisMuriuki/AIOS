import { createContext, useState } from "react";

export const ModalContext = createContext({});
export const ModalContextProvider = ({ children }) => {
  const [mainModal,setMainModal] = useState(false);



  return (
    <ModalContext.Provider
      value={{
        mainModal,
        setMainModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
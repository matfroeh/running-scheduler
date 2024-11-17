import { createContext, useContext } from "react";

const ModalContext = createContext();

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};

export { ModalContext, useModal };
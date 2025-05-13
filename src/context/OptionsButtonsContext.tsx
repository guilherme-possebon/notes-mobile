import React, { createContext, useContext, useState, ReactNode } from "react";

interface OptionsButtonsContextType {
  setOptionsButton: React.Dispatch<React.SetStateAction<IOptionButtons>>;
  optionsButton: IOptionButtons;
}

interface IOptionButtons {
  edit: boolean;
  delete: boolean;
}

const OptionsButtonsContext = createContext<
  OptionsButtonsContextType | undefined
>(undefined);

export const OptionsButtonsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [optionsButton, setOptionsButton] = useState<IOptionButtons>({
    edit: false,
    delete: false,
  } as IOptionButtons);

  return (
    <OptionsButtonsContext.Provider
      value={{
        setOptionsButton,
        optionsButton,
      }}
    >
      {children}
    </OptionsButtonsContext.Provider>
  );
};

export const useOptionsButtons = () => {
  const context = useContext(OptionsButtonsContext);
  if (!context) {
    throw new Error(
      "useOptionsButtons must be used within a OptionsButtonsProvider"
    );
  }
  return context;
};

export default OptionsButtonsProvider;

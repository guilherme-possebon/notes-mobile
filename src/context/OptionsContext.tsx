import React, { createContext, useContext, useState, ReactNode } from "react";
import { INote } from "../../types/note";

interface OptionsContextType {
  optionsInfo: ({
    id,
    title,
    note,
    created_at,
    updated_at,
    pathname,
  }: IOptions) => void;
  options: IOptions;
}

interface IOptions extends INote {
  pathname: string;
}

const OptionsContext = createContext<OptionsContextType | undefined>(undefined);

export const OptionsProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<IOptions>({} as IOptions);

  function optionsInfo({
    id,
    title,
    note,
    created_at,
    updated_at,
    pathname,
  }: IOptions) {
    setOptions(() => ({
      id: id,
      title: title,
      note: note,
      created_at: created_at,
      updated_at: updated_at,
      pathname: pathname,
    }));
  }

  return (
    <OptionsContext.Provider
      value={{
        optionsInfo,
        options,
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};

export const useOptions = () => {
  const context = useContext(OptionsContext);
  if (!context) {
    throw new Error("useOptions must be used within a OptionsProvider");
  }
  return context;
};

export default OptionsProvider;

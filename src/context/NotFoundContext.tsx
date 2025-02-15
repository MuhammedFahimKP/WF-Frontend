import {
  type ReactNode,
  useState,
  createContext,
  type ComponentType,
} from "react";

const NotFoundContext = createContext<{
  notFoundItem: boolean;
  emitError: () => void;
  removeError: () => void;
} | null>(null);

interface ProviderProps {
  children: ReactNode;
}

const NotFoundProvider = ({ children }: ProviderProps) => {
  const [error, setError] = useState(false);

  const raiseErorr = () => error === false && setError(true);
  const removeError = () => error === true && setError(true);

  return (
    <NotFoundContext.Provider
      value={{ notFoundItem: error, emitError: raiseErorr, removeError }}
    >
      {children}
    </NotFoundContext.Provider>
  );
};

const NotFoundWrapper = <T extends Object>(
  ChildComponent: ComponentType<T>
) => {
  return (props: T) => (
    <NotFoundProvider>
      <ChildComponent {...props} />
    </NotFoundProvider>
  );
};

export default NotFoundWrapper;
export { NotFoundContext, NotFoundProvider };

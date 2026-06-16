import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

const isMobileDevice = () => window.innerWidth <= 768;

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(() => !isMobileDevice());
  const [loading, setLoading] = useState(0);

  const value = { isLoading, setIsLoading, setLoading };

  useEffect(() => {
    if (!isMobileDevice()) return;
    // On mobile: no 3D model, run animations immediately
    import("../components/utils/initialFX").then((module) => {
      if (module.initialFX) module.initialFX();
    });
  }, []);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used within a LoadingProvider");
  return context;
};

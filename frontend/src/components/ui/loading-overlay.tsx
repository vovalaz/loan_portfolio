import ReactLoadingOverlay from "react-loading-overlay-ts";
import { useLoadingStore } from "~/stores/loadingStore";

export default function LoadingOverlay({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, loadingText } = useLoadingStore();
  return (
    <ReactLoadingOverlay active={isLoading} spinner text={loadingText}>
      {children}
    </ReactLoadingOverlay>
  );
}

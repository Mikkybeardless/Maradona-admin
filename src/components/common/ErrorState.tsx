interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}
export const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <div className="text-center py-20">
    <p className="text-red-500 font-semibold mb-4">{message}</p>
    <button
      className="rounded-lg px-3 py-1 md:px-5 md:py-3  text-white text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
      onClick={onRetry}
    >
      Retry
    </button>
  </div>
);

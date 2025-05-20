export const Spinner = ({
  borderColor = "border-white",
  size = "w-6 h-6",
}: {
  borderColor?: string;
  size?: string;
}) => {
  return (
    <div
      className={`${size} border-4 flex items-center justify-center border-t-transparent ${borderColor} rounded-full animate-spin`}
    ></div>
  );
};

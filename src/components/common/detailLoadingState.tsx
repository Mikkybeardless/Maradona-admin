import { Spinner } from "./spinner";

export const DetailLoadingState = ({ message = "Loading details..." }) => {
  return (
    <div className="flex flex-col gap-3 justify-center my-[250px] items-center">
      <Spinner
        size="w-10 h-10 md:w-20 md:h-20"
        borderColor="border-orange-500"
      />
      <span className="text-sm text-gray-500">{message}</span>
    </div>
  );
};

import { colors } from "@libs/client/utils";

export const ParkingLotHeader = () => {
  return (
    <div className={`w-full bg-gray-50 p-3`}>
      <p className="text-md text-center font-bold">
        <span
          className={`mr-1 px-1 bg-${colors.primaryColor} text-md text-white`}
        >
          P
        </span>
        타임스퀘어[영등포점]
      </p>
    </div>
  );
};

import { useSelector } from "react-redux";

export const useMyStore = () => {
  return useSelector((state) => state);
};

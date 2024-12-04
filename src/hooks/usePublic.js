import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectFormData,
  selectLoading,
  selectResult,
  selectProducts,
  selectProduct,
} from "../redux/public/selectorsPublic";

export const usePublic = () => {
  const dispatch = useDispatch(); // Add dispatch for triggering actions
  const formData = useSelector(selectFormData);
  const isLoading = useSelector(selectLoading);
  const errorPublic = useSelector(selectError);
  const result = useSelector(selectResult);
  const products = useSelector(selectProducts);
  const product = useSelector(selectProduct);

  return {
    formData,
    isLoading,
    errorPublic,
    result,
    products,
    product,
    dispatch, // Include dispatch in the returned object
  };
};

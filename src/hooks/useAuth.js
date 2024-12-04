import { useSelector } from "react-redux";
import {
  selectAuthToken,
  selectIsLoggedIn,
  selectUser,
  selectError,
  selectIsRefreshing,
  selectIsLoading,
  selectIsisRegistered,
  selectIsemailResendStatus,
  selectIsLoggedOut,
} from "../redux/auth/selectorsAuth";

export const useAuth = () => {
  const tokenAuth = useSelector(selectAuthToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const errorAuth = useSelector(selectError);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoadingAuth = useSelector(selectIsLoading);
  const isRegistered = useSelector(selectIsisRegistered);
  const emailResendStatus = useSelector(selectIsemailResendStatus);
  const isLoggedOut = useSelector(selectIsLoggedOut);

  return {
    tokenAuth,
    isLoggedIn,
    user,
    errorAuth,
    isRefreshing,
    isLoadingAuth,
    isRegistered,
    emailResendStatus,
    isLoggedOut,
  };
};

import { useDispatch, useSelector } from "react-redux";
import {
    selectPrivateFormData,
    selectUser,
    selectConsumedProducts,
    selectPrivateStatus,
    selectPrivateError,
    selectPrivateMessage,
    selectRemainingCalories,
    selectTotalCaloriesConsumed,
    selectPercentageCaloriesConsumed,
    selectDailyCalorieSummary,
    selectRecommendedDailyCaloriesIntake,
} from "../redux/private/selectorsPrivate";

export const usePrivate = () => {
    const privateDispatch = useDispatch(); // Add dispatch for triggering actions
    const privateFormData = useSelector(selectPrivateFormData) || [];
    const recommendedDailyCaloriesIntake = useSelector(selectRecommendedDailyCaloriesIntake)
    const user = useSelector(selectUser) || null;
    const consumedProducts = useSelector(selectConsumedProducts) || [];
    const privateLoading = useSelector(selectPrivateStatus);
    const error = useSelector(selectPrivateError) || null;
    const message = useSelector(selectPrivateMessage);
    const remainingCalories = useSelector(selectRemainingCalories);
    const totalCaloriesConsumed = useSelector(selectTotalCaloriesConsumed);
    const percentageCaloriesConsumed = useSelector(selectPercentageCaloriesConsumed);
    const dailyCalorieSummary = useSelector(selectDailyCalorieSummary);

    return {
        privateDispatch,
        privateFormData,
        recommendedDailyCaloriesIntake,
        user,
        consumedProducts,
        privateLoading,
        error,
        message,
        remainingCalories,
        totalCaloriesConsumed,
        percentageCaloriesConsumed,
        dailyCalorieSummary,
    };
};

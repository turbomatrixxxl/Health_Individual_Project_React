import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Input from "../commonComponents/Input/Input";
import Button from "../commonComponents/Button";

import { setFormData } from "../../redux/public/publicCalculatorSlice";
import { usePublic } from "../../hooks/usePublic";

import { setPrivateFormData } from "../../redux/private/privateSlice";
import { usePrivate } from "../../hooks/usePrivate";

import { useAuth } from "../../hooks/useAuth";

import styles from "./WeightLossForm.module.css";

const bloodTypeOptions = [
  { value: "1", label: "A" },
  { value: "2", label: "B" },
  { value: "3", label: "AB" },
  { value: "4", label: "O" },
];

export default function WeightLossForm({ onSubmit, handleClick }) {
  const { formData = {}, isLoading, dispatch } = usePublic();

  const { isLoggedIn, user } = useAuth();

  const userHeight = user?.height;
  const userAge = user?.age;
  const userWeight = user?.weight;
  const userDesiredWeightt = user?.desiredWeight;
  const userBloodType = user?.bloodType;
  // console.log(userBloodType);

  const {
    privateFormData = {},
    privateLoading,
    privateDispatch,
  } = usePrivate();
  // console.log(isLoggedIn);
  // console.log(privateLoading);
  // console.log(privateFormData);

  // Initialize form state with default values
  useEffect(() => {
    const defaultValues = {
      height: isLoggedIn ? userHeight : "",
      age: isLoggedIn ? userAge : "",
      currentWeight: isLoggedIn ? userWeight : "",
      desiredWeight: isLoggedIn ? userDesiredWeightt : "",
      bloodGroupIndex: isLoggedIn ? userBloodType : "",
    };

    const setter = isLoggedIn ? privateDispatch : dispatch;
    const setAction = isLoggedIn ? setPrivateFormData : setFormData;

    Object.entries(defaultValues).forEach(([key, value]) => {
      if (!isLoggedIn && !formData[key]) {
        setter(setAction({ name: key, value }));
      }
      if (isLoggedIn && !privateFormData[key]) {
        setter(setAction({ name: key, value }));
      }
    });
  }, [
    dispatch,
    privateDispatch,
    formData,
    privateFormData,
    isLoggedIn,
    userHeight,
    userAge,
    userWeight,
    userDesiredWeightt,
    userBloodType,
  ]);

  // console.log(formData);

  // Check if all form fields are valid
  const isValid = Object.values(isLoggedIn ? privateFormData : formData).every(
    (field) => field?.toString().trim() !== ""
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    !isLoggedIn
      ? dispatch(setFormData({ name, value }))
      : privateDispatch(setPrivateFormData({ name, value }));
  };

  const handleRadioChange = (value) => {
    !isLoggedIn
      ? dispatch(setFormData({ name: "bloodGroupIndex", value }))
      : privateDispatch(setPrivateFormData({ name: "bloodGroupIndex", value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = isLoggedIn ? privateFormData : formData;
    if (isValid) {
      onSubmit(dataToSubmit);
    }
  };

  const height = !isLoggedIn ? formData.height : privateFormData.height;
  const age = !isLoggedIn ? formData.age : privateFormData.age;
  const currentWeight = !isLoggedIn
    ? formData.currentWeight
    : privateFormData.currentWeight;
  const desiredWeight = !isLoggedIn
    ? formData.desiredWeight
    : privateFormData.desiredWeight;
  const bloodGroupIndex = !isLoggedIn
    ? formData?.bloodGroupIndex
    : privateFormData?.bloodGroupIndex;
  const loading = !isLoggedIn ? isLoading : privateLoading;

  // console.log(
  //   "privateFormData?.bloodGroupIndex",
  //   privateFormData?.bloodGroupIndex
  // );
  // console.log("bloodGroupIndex", bloodGroupIndex);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formMainCont}>
        {/* Left Section */}
        <div className={styles.formLeftCont}>
          <Input
            type="number"
            placeholder="Height*"
            name="height"
            value={height || ""}
            handleChange={handleChange}
            required
          />

          <Input
            type="number"
            placeholder="Age*"
            name="age"
            value={age || ""}
            handleChange={handleChange}
            required
          />

          <Input
            type="number"
            placeholder="Current weight*"
            name="currentWeight"
            value={currentWeight || ""}
            handleChange={handleChange}
            required
          />
        </div>

        {/* Right Section */}
        <div className={styles.formRightCont}>
          <Input
            type="number"
            placeholder="Desired weight*"
            name="desiredWeight"
            value={desiredWeight || ""}
            handleChange={handleChange}
            required
          />

          <div className={styles.bloodTypeContainer}>
            <label className={styles.label}></label>

            {/* Read-Only Input */}
            <Input
              type="text"
              placeholder="Blood type*"
              name="bloodType"
              value={
                bloodTypeOptions.find(
                  (opt) => opt.value === String(bloodGroupIndex)
                )?.label || ""
              }
              handleChange={handleChange}
              required
              readOnly
            />

            {/* Radio Buttons */}
            <div className={styles.radioGroup}>
              {bloodTypeOptions.map((option) => (
                <React.Fragment key={option.value}>
                  <input
                    type="radio"
                    id={`bloodType-${option.value}`}
                    name="bloodType"
                    value={option.value}
                    checked={String(bloodGroupIndex) === option.value}
                    onChange={() => handleRadioChange(option.value)}
                    className={styles.radioInput}
                  />
                  <label
                    htmlFor={`bloodType-${option.value}`}
                    className={styles.radioLabel}
                  >
                    {option.label}
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Button
        handleClick={handleClick}
        type="submit"
        variant="colored"
        disabled={!isValid || loading}
      >
        {loading ? "Loading..." : "Start losing weight"}
      </Button>
    </form>
  );
}

WeightLossForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleClick: PropTypes.func,
};

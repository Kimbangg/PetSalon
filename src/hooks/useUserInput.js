/* eslint-disable consistent-return */
import { useState, useEffect } from 'react';
import { getUsersInfo } from '@/apis/auth';
import { VALIDATION_ALERT_MSG } from '@/utils/validation';

const useInput = ({ history, initialState, onSubmit, validate }) => {
  const [errors, setErrors] = useState({});

  const [emailState, setEmailState] = useState({
    isSameEmail: false,
    isAuth: false,
  });
  const [userInputs, setUserInputs] = useState(initialState);

  useEffect(() => {
    const newError = validate(userInputs);
    setErrors(newError);
  }, [userInputs]);

  useEffect(() => {
    setEmailState(emailState);
  }, [emailState]);

  const handleChange = e => {
    const { id, value } = e.target;

    setUserInputs(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (emailState.isAuth === false) {
      alert(VALIDATION_ALERT_MSG.NEED_EMAIL_AUTH);
      return;
    }

    const result = await onSubmit(userInputs);

    if (!result.user) {
      alert(VALIDATION_ALERT_MSG.FAIL_SIGN_UP);
      return;
    }

    history.push('./signin');
  };

  const handleEmail = async userEmail => {
    const response = await getUsersInfo();
    const result = response.filter(each => each.email === userEmail);

    const isCompleted = Object.keys(result).length === 0;

    if (!isCompleted) {
      setEmailState({ isSameEmail: true, isAuth: false });
      alert(VALIDATION_ALERT_MSG.DUPLICATED_EMAIL);
    } else {
      setEmailState({ isSameEmail: false, isAuth: true });
      alert(VALIDATION_ALERT_MSG.WELL_FORMED_EMAIL);
    }
  };

  return {
    errors,
    setErrors,
    emailState,
    userInputs,
    setUserInputs,
    handleEmail,
    handleChange,
    handleSubmit,
  };
};

export default useInput;

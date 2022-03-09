/* eslint-disable consistent-return */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setId, setJwt } from '@/apis/token';
import { VALIDATION_ALERT_MSG } from '@/utils/validation';

const useLoginInput = ({ initialState, onSubmit, validate }) => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [userInputs, setUserInputs] = useState(initialState);

  const handleChange = e => {
    const { id, value } = e.target;

    setUserInputs(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    const newErrors = validate(userInputs);
    const res = await onSubmit(userInputs);
    const { location } = window;
    const { state: intendedLocation } = history.location;

    if (res.token) {
      const { token } = res;
      const { _id } = res.user;
      setId(_id);
      setJwt(token);

      if (!intendedLocation) {
        location.replace('/');
        return;
      }

      location.replace(intendedLocation.from);
    } else {
      alert(VALIDATION_ALERT_MSG.FAIL_SIGN_IN);
    }

    setErrors(newErrors);
  };

  return {
    errors,
    setErrors,
    userInputs,
    setUserInputs,
    handleChange,
    handleSubmit,
  };
};

export default useLoginInput;

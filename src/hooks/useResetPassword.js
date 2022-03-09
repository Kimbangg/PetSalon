/* eslint-disable consistent-return */
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useLoginInput = ({ initialState, onSubmit, validate }) => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [userInputs, setUserInputs] = useState(initialState);

  useEffect(() => {
    const newErrors = validate(userInputs);
    setErrors(newErrors);
  }, [userInputs]);

  const handleChange = e => {
    const { id, value } = e.target;

    setUserInputs(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    const newErrors = validate(userInputs);
    const { password } = userInputs;

    if (Object.keys(newErrors).length === 0) {
      const result = await onSubmit({ password });

      if (result.status < 400) {
        alert('비밀번호 변경에 성공 하였습니다.');
        history.push('/signin');
      } else {
        alert(result.message);
      }
    } else {
      setErrors(newErrors);
    }
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

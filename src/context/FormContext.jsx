import React, {
  useState, useContext, useEffect, useMemo,
} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { BASE_URL } from '../utils';

const initialState = {
  colors: [],
  form: {
    name: {
      value: '',
      hasError: false,
    },
    email: {
      value: '',
      hasError: false,
    },
    password: {
      value: '',
      isHashed: true,
      hasError: false,
    },
    color: {
      value: '',
      hasError: false,
    },
    terms: {
      value: false,
      hasError: false,
    },
  },
};

const FormContext = React.createContext(initialState);

function FormContextProvider({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [form, setForm] = useState(initialState.form);

  const submitForm = async () => {
    try {
      setLoading(true);
      const data = Object.keys(form).reduce((acc, red) => {
        acc[red] = form[red].value;
        return acc;
      }, {});

      await axios.post(`${BASE_URL}api/submit`, data);
      navigate('/success');
    } catch (error) {
      // console.trace(error);
      navigate('/error');
    }
    setLoading(false);
  };
  const resetForm = () => {
    setForm(initialState.form);
    navigate('/');
  };

  const setFormValue = ({
    target: {
      name, type, checked, value,
    },
  }) => {
    let formattedValue = value;

    if (type === 'checkbox') {
      formattedValue = checked;
    }

    setForm({
      ...form,
      [name]: {
        ...form[name],
        value: formattedValue,
      },
    });
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${BASE_URL}api/colors`)
      .then(({ data }) => {
        setLoading(false);
        setColors(data);
      });
  }, []);

  const values = useMemo(() => ({
    colors,
    form,
    loading,
    setFormValue,
    resetForm,
    submitForm,
  }), [colors, form, loading]);

  return (
    <FormContext.Provider value={values}>
      {children}
    </FormContext.Provider>
  );
}

FormContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useFormContext = () => useContext(FormContext);

export default FormContextProvider;

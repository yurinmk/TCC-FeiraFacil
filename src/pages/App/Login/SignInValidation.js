import * as yup from "yup";

const formValidation = yup.object().shape({
  email: yup.string().email("E-mail inválido!").required("Campo obrigatório"),

  password: yup.string().required("Campo obrigatório"),
});

export default formValidation;

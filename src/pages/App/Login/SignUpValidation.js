import * as yup from "yup";

const formValidation = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  surname: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido!").required("Campo obrigatório"),

  password: yup
    .string()
    .required("Campo obrigatório")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/,
      "A senha deve conter ao menos 6 caracteres, uma letra minúscula, uma letra maiúscula e um número para ser aceita pelo sistema.",
    ),

  confirm_password: yup
    .string()
    .required("Campo obrigatório")
    .oneOf([yup.ref("password"), null], "As senhas devem corresponder."),
});

export default formValidation;

import * as yup from "yup";

const formValidation = yup.object({
  name: yup.string().required(),
  quantity: yup.string().required(),
  price: yup.string().required(),
});

export default formValidation;

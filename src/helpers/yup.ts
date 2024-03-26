import * as yup from 'yup';

const schema = yup.object({
  model: yup.string().required(),
  releaseYear: yup.date().required(),
  category: yup.string().required(),
  price: yup.number().typeError('recommended price must be a number').required(),
  description: yup.string().notRequired(),
  visiable: yup.boolean(),
  image: yup.string().notRequired()
});

export default schema;
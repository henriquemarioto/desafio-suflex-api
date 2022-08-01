import * as yup from "yup";

const validUuidParamsSchema = {
  schema: {
    params: {
      yupSchema: yup.object().shape({
        id: yup
          .string()
          .required("Id is Required")
          .matches(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
          , "Invalid"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
};
export default validUuidParamsSchema;

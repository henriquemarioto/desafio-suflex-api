import * as yup from "yup";

class SessionValition {
  static loginSchema = {
    schema: {
      body: {
        yupSchema: yup.object().shape({
          name: yup.string().required("Name required"),
          password: yup.string().required("Password required"),
        }),
        validateOptions: {
          abortEarly: false,
        },
      },
    },
  };
}

export default SessionValition;

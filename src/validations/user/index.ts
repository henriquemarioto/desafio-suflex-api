import * as yup from "yup";
import FavoriteCharacterValition from "../favoriteCharacter";

class UserValidations {
  static creteUserSchema = {
    schema: {
      body: {
        yupSchema: yup.object().shape({
          name: yup
            .string()
            .min(3, "Name must be at least 3 characters long")
            .required("Name is Required"),
          password: yup
            .string()
            .required("Password is Required")
            .min(8, "Password must be between 8 and 32 characters")
            .max(32, "Password must be between 8 and 32 characters"),
        }),
        validateOptions: {
          abortEarly: false,
        },
      },
    },
  };

  static updateUserSchema = {
    schema: {
      body: {
        yupSchema: yup.object().shape({
          name: yup.string().min(3, "Name must be at least 3 characters long"),
          password: yup
            .string()
            .min(8, "Password must be between 8 and 32 characters")
            .max(32, "Password must be between 8 and 32 characters"),
          favoriteCharactes: yup
            .array()
            .of(FavoriteCharacterValition.createSchema.schema.body.yupSchema)
            .min(1),
        }),
        validateOptions: {
          abortEarly: false,
        },
      },
    },
  };
}

export default UserValidations;

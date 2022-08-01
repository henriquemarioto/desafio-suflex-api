import * as yup from "yup";

class FavoriteCharacterValition {
  static createSchema = {
    schema: {
      body: {
        yupSchema: yup.object().shape({
          id: yup.number().required(),
          name: yup.string().required(),
          status: yup.string().required(),
          species: yup.string().required(),
          type: yup.string(),
          gender: yup.string().required(),
          origin: yup
            .object({
              name: yup.string().required(),
              url: yup.string().defined(),
            })
            .required(),
          location: yup
            .object({
              name: yup.string().required(),
              url: yup.string().required(),
            })
            .required(),
          image: yup.string().url().required(),
          episode: yup.array().of(yup.string().url()).min(1).required(),
          url: yup.string().url().required(),
          created: yup.string().required(),
        }),
        validateOptions: {
          abortEarly: false,
        },
      },
    },
  };

  static updateSchema = {
    schema: {
      body: {
        yupSchema: yup.object().shape({
          id: yup.number(),
          name: yup.string(),
          status: yup.string(),
          species: yup.string(),
          type: yup.string(),
          gender: yup.string(),
          origin: yup
            .object({
              name: yup.string(),
              url: yup.string(),
            })
            ,
          location: yup
            .object({
              name: yup.string(),
              url: yup.string(),
            })
            ,
          image: yup.string().url(),
          episode: yup.array().of(yup.string().url()),
          url: yup.string().url(),
          created: yup.string(),
        }),
        validateOptions: {
          abortEarly: false,
        },
      },
    },
  };
}

export default FavoriteCharacterValition;

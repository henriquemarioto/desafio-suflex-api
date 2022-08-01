const formatUser = (data: any) => {
  return { ...data, password: undefined };
};

export default formatUser;

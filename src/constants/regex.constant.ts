export const regexConstant = {
  EMAIL:
    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
  PHONE: /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

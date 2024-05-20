import { v4 as uuidv4 } from "uuid";

const _uuid = () => {
  return uuidv4();
};

const iban = () => {
  return "";
};

export { _uuid, iban };

import { createTransform } from "redux-persist";
import CryptoInstance from "@/utils/crypto";

const encrypt = (data: any) => {
  const instance = CryptoInstance();
  return instance.encrypt(JSON.stringify(data));
};

const decrypt = (data: any) => {
  const instance = CryptoInstance();
  const decrypted = instance.decrypt(data);

  return JSON.parse(decrypted);
};

const encryptTransform = createTransform(
  (inBoundState) => encrypt(inBoundState),
  (outBoundState) => decrypt(outBoundState),
  {
    whitelist: ["auth"],
  }
);

export default encryptTransform;

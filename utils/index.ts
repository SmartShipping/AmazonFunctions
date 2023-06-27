import { AES, enc } from "crypto-js";

export const decryptData = (data: string) => {
  try {
    const decodedStr = decodeURIComponent(data);
    return AES.decrypt(decodedStr, process.env.NEXT_PUBLIC_API_ENCRYPTER!).toString(enc.Utf8);
  } catch (error) {
    console.log("🚀 ~ file: index.ts:11 ~ decryptData ~ error:", error);
    return "";
  }
};

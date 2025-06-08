import SimpleCrypto from "simple-crypto-js";

const key = process.env.NEXT_PUBLIC_SECRET_KEY;
const simpleCrypto = new SimpleCrypto(key);

export function encrypt(text: string) {
  return simpleCrypto.encrypt(text);
}

export function decrypt(cipher: string) {
  return simpleCrypto.decrypt(cipher);
}

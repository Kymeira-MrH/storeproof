import crypto from "node:crypto";

// Encrypts the Shopify Admin API token at rest. When TOKEN_ENCRYPTION_KEY is
// unset we pass values through untouched so the app keeps working with existing
// plaintext tokens; set the key in Vercel to turn encryption on.

const PREFIX = "enc:v1:";
const ALGORITHM = "aes-256-gcm";
const IV_BYTES = 12;

function deriveKey(secret: string): Buffer {
  return crypto.createHash("sha256").update(secret).digest();
}

export function encryptToken(plain: string): string {
  const secret = process.env.TOKEN_ENCRYPTION_KEY;
  if (!secret) return plain;

  const iv = crypto.randomBytes(IV_BYTES);
  const cipher = crypto.createCipheriv(ALGORITHM, deriveKey(secret), iv);
  const ciphertext = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return `${PREFIX}${iv.toString("base64")}:${authTag.toString("base64")}:${ciphertext.toString("base64")}`;
}

export function decryptToken(stored: string): string {
  if (!stored.startsWith("enc:")) return stored;
  if (!stored.startsWith(PREFIX))
    throw new Error("Unsupported encrypted token format.");

  const secret = process.env.TOKEN_ENCRYPTION_KEY;
  if (!secret)
    throw new Error("TOKEN_ENCRYPTION_KEY is not set but a token is encrypted.");

  const [ivB64, authTagB64, ciphertextB64] = stored.slice(PREFIX.length).split(":");
  if (!ivB64 || !authTagB64 || !ciphertextB64)
    throw new Error("Malformed encrypted token.");

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    deriveKey(secret),
    Buffer.from(ivB64, "base64"),
  );
  decipher.setAuthTag(Buffer.from(authTagB64, "base64"));
  const plain = Buffer.concat([
    decipher.update(Buffer.from(ciphertextB64, "base64")),
    decipher.final(),
  ]);
  return plain.toString("utf8");
}

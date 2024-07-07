import crypto from "crypto";

/**
 * Encryption Util class used for encrypting and decrypting data to store in DB using Node's built in crypto library
 */
class EncryptionUtil {
    private encryption_method: crypto.CipherGCMTypes;
    private key: crypto.CipherKey;
    private encryptionIV: Buffer;

    /**
     * constructor
     */
    constructor() {
        this.encryption_method = process.env.ENCRYPTION_METHOD as crypto.CipherGCMTypes;
        this.key = crypto
            .createHash("sha512")
            .update(process.env.SECRET_KEY as string)
            .digest("hex")
            .substring(0, 32);
        this.encryptionIV = crypto.randomBytes(32);
    }

    /**
     * Encryption method which takes in a string and encrypts the data we want to store
     * @param {string} data
     * @return {string} encrypted data
     */
    public EncryptData(data: string): string {
        const cipher = crypto.createCipheriv(
            this.encryption_method,
            this.key,
            this.encryptionIV
        );
        let encryptedData = cipher.update(data, "utf8", "hex");
        encryptedData += cipher.final("hex");

        const tag = cipher.getAuthTag().toString("hex");
        const iv = this.encryptionIV;

        return encryptedData + "$$" + tag + "$$" + iv.toString("hex");
    }

    /**
     * Decryption method which takes in an encrypted string and decrypts it for us to read
     * @param {string} encryptedData
     * @return {string} decrypted data for us to be able to read
     */
    public DecryptData(encryptedData: string): string {
        const cipherSplit: string[] = encryptedData.split("$$");
        const data = cipherSplit[0];
        const tag = Buffer.from(cipherSplit[1], "hex");
        const iv = Buffer.from(cipherSplit[2], "hex");
        const decipher = crypto.createDecipheriv(
            this.encryption_method,
            this.key,
            iv
        );

        decipher.setAuthTag(tag);

        let decryptedData = decipher.update(data, "hex", "utf8");
        const plainTextData = decryptedData += decipher.final("utf8");
        return plainTextData;
    }
}

export {EncryptionUtil};

import crypto from "crypto";

class EncryptionUtil {
    private encryption_method: crypto.CipherGCMTypes;
    private key: crypto.CipherKey;
    private encryptionIV: Buffer;

    constructor() {
        this.encryption_method = process.env.ENCRYPTION_METHOD as crypto.CipherGCMTypes;
        this.key = crypto
            .createHash("sha512")
            .update(process.env.SECRET_KEY as string)
            .digest("hex")
            .substring(0, 32);
        this.encryptionIV = crypto.randomBytes(32);
    }

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

    public DecryptData(encryptedData: string): string {
        const cipherSplit: string[] = encryptedData.split("$$");
        console.log(cipherSplit);
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

import crypto from 'crypto';

class EncryptionUtil {
    private encryption_method: crypto.CipherGCMTypes;
    private key: crypto.CipherKey;
    private encryptionIV: crypto.BinaryLike;

    constructor() {
        this.encryption_method = process.env.ENCRYPTION_METHOD as crypto.CipherGCMTypes;
        this.key = crypto
        .createHash('sha512')
        .update(process.env.SECRET_KEY as string)
        .digest('hex')
        .substring(0, 32);
        this.encryptionIV = crypto
        .createHash('sha512')
        .update(process.env.SECRET_IV as string)
        .digest('hex')
        .substring(0, 16)
    }

    public EncryptData(data: string): string {
        const cipher = crypto.createCipheriv(this.encryption_method, this.key, this.encryptionIV)
        return Buffer.from(
            cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
        ).toString('base64');
    };

    public DecryptData(encryptedData: string): string {
        const buff = Buffer.from(encryptedData, 'base64')
        const decipher = crypto.createDecipheriv(this.encryption_method, this.key, this.encryptionIV)
        return (
          decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
          decipher.final('utf8')
        )
    };
};

export {EncryptionUtil};
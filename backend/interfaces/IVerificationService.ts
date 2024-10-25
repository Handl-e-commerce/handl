interface IVerificationService {
    VerifyCaptcha: (token: string) => Promise<boolean>;
    VerifyUser: (selector: string | undefined, validator: string | undefined, userId: string) => Promise<boolean>;
    VerifyToken: (userId: string, token: string, isPasswordReset: boolean) => Promise<{
        result: boolean,
        message: string
    }>;
    SendNewVerificationToken: (userId: string) => Promise<void>;
    GenerateToken: (n: number) => string;
}

export {IVerificationService};

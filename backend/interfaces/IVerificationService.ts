interface IVerificationService {
    VerifyCaptcha: (token: string) => Promise<boolean>;
    VerifyUser: (selector: string | undefined, validator: string | undefined, userId: string) => Promise<boolean>;
    VerifyRegistrationToken: (userId: string, token: string, isPasswordReset: boolean) => Promise<{
        result: boolean,
        message: string
    }>;
    SendNewVerificationToken: (userId: string) => Promise<void>;
    GenerateToken: (n: number) => string;
    GenerateAccessToken: (userId: string) => string;
    GenerateRefreshToken: (userId: string) => string;
}

export {IVerificationService};

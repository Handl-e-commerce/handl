interface IVerificationService {
    VerifyCaptcha: (token: string) => Promise<boolean>;
}

export {IVerificationService};

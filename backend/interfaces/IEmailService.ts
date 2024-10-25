interface IEmailService {
    GenerateVerificationEmail: (name: string, userId: string, token: string, email: string) => void;
    GeneratePasswordResetConfirmationEmail: (name: string, email: string) => void;
    GeneratePasswordResetEmail: (name: string, email: string, userId: string, token: string) => void;
    GenerateDeletionConfirmationEmail: (name: string, email: string) => void;
    GenerateSupportEmail: (firstName: string, lastName: string, email: string, message: string) => void;
}

export {IEmailService};

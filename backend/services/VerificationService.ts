import {IVerificationService} from "../interfaces/IVerificationService";

/** Verification Service Class */
class VerificationService implements IVerificationService {
    /**
     * Verifies that the token recieved from the ReCaptcha service is from a human and not a bot
     * by calculating the score that the user is a human
     * @param {string} token
     * @return {boolean} success boolean that lets us know that user is a human or not
     */
    public async VerifyCaptcha(token: string): Promise<boolean> {
        try {
            const verificationUrl = `
            https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${token}
            `;
            const httpOptions: RequestInit = {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
            };
            const response = await fetch(verificationUrl, httpOptions);
            const data = await response.json();
            return data.success;
        } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }
}

export {VerificationService};

import {beforeEach, afterEach, describe, expect, it, jest} from "@jest/globals";
import {VerificationService} from "../services/VerificationService";
import {UserService} from "../services/UserService";
import {IUserDetails} from "../interfaces/IUserDetails";
import {User} from "../db/models/User";
import {AuthToken} from "../db/models/AuthToken";

const sendMailMock = jest.fn().mockReturnValue("Sent mock email!");

jest.mock("nodemailer");

const nodemailer = require("nodemailer");
nodemailer.createTransport.mockReturnValue({"sendMail": sendMailMock});

const userDetails: IUserDetails = {
    email: "foobar@fizz.buzz",
    businessName: "Foobarony & Associates",
    phoneNumber: "1234567890",
    password: "Bafang00l$!",
    firstName: "Test",
    lastName: "User",
    address: "4398 Space st",
    city: "Crooklyn",
    state: "FY",
    zipcode: "42310",
    categories: ["Beauty", "Apparel"]
};

beforeEach( () => {
    sendMailMock.mockClear();
    nodemailer.createTransport.mockClear();
});

afterEach(async () => {
  await User.destroy({
    where: {
      email: userDetails.email,
    },
    force: true
  });
});

const userService: UserService = new UserService();
const verificationService: VerificationService = new VerificationService();

describe("VerificationService Tests", () => {
    it("Should return true because 'cookies' are valid from the user", async () => {
        await userService.CreateUser(userDetails);
        const loginRes = await userService.Login(userDetails.email, userDetails.password);
        expect(loginRes.selector).toBeDefined();
        expect(loginRes.validator).toBeDefined();
        const verify: {
          result: boolean;
          type?: string | undefined;
          subscriptionExpirationDate?: Date | null | undefined;
        } = await verificationService.VerifyUser(
          loginRes.selector as string,
          loginRes.validator as string,
          loginRes.userId as string
        );
        expect(verify.result).toBe(true);
        await AuthToken.destroy({
          where: {
            selector: loginRes.selector as string
          }
        })
    });
    
    it("Should return false because userId pass doesn't match userId found in AuthToken table.", async () => {
        await userService.CreateUser(userDetails);
        const loginRes = await userService.Login(userDetails.email, userDetails.password);
        expect(loginRes.selector).toBeDefined();
        expect(loginRes.validator).toBeDefined();
        const verify: {
          result: boolean;
          type?: string | undefined;
          subscriptionExpirationDate?: Date | null | undefined;
        } = await verificationService.VerifyUser(loginRes.selector as string, loginRes.validator as string, "UserIdWhichDoesn'tExist");
        expect(verify.result).toBe(false);
        await AuthToken.destroy({
          where: {
            selector: loginRes.selector as string
          }
        });
    });
    
    it("Should return false because row doesn't exist in the DB leading to null from query", async () => {
        const verify: {
          result: boolean;
          type?: string | undefined;
          subscriptionExpirationDate?: Date | null | undefined;
        } = await verificationService.VerifyUser("SelectorThatDoesn'tExistInDB", "ValidatorThatDoesn'tExistInDB", "MockUserId");
        expect(verify.result).toBe(false);
    });
    
    it("Should return false because validator doesn't match decrypted validator", async () => {
        await userService.CreateUser(userDetails);
        const loginRes = await userService.Login(userDetails.email, userDetails.password);
        expect(loginRes.selector).toBeDefined();
        expect(loginRes.validator).toBeDefined();
        const verify: {
          result: boolean;
          type?: string | undefined;
          subscriptionExpirationDate?: Date | null | undefined;
        } = await verificationService.VerifyUser(loginRes.selector as string, "validatorThatWon'tMatch", "MockUserId");
        expect(verify.result).toBe(false);
        await AuthToken.destroy({
          where: {
            selector: loginRes.selector as string
          }
        });
    });
    
    // Skip for now because I need to figure out how to get the randomly generated token 
    // not from an email and instead programmatically. Until then, it will always fail the
    // token verification step which isn't a bad thing but still, this test is difficult.
    it.skip("Should update that the user is verified because the token is valid and not expired", async () => {
      await userService.CreateUser(userDetails);
      let dummyUser = await User.findOne({
        where: {
          email: userDetails.email 
        }
      });
      let result = await verificationService.VerifyToken(
        dummyUser?.uuid as string,
        "",
        false
      );
      expect(result.result).toBeTruthy();
      expect(result.result).toEqual(true);
      expect(result.message).toEqual("Successfully verified email.");
    });
    
    it("Should send a verification message saying the user is already verified if isVerified is true for a user.", async () => {
      await userService.CreateUser(userDetails);
      await User.update({
        isVerified: true,
      }, {
        where: {
          email: userDetails.email
        }
      });
      let dummyUser = await User.findOne({
        where: {
          email: userDetails.email 
        }
      });
      let result = await verificationService.VerifyToken(
        dummyUser?.uuid as string,
        "",
        false
      );
      
      expect(result.result).toBeTruthy();
      expect(result.result).toEqual(true);
      expect(result.message).toEqual("Your email is already verified.");
    });
  
    it("Should return false because the verification token doesn't exist", async () => {
      await userService.CreateUser(userDetails);
      let dummyUser = await User.findOne({
        where: {
          email: userDetails.email 
        }
      });
      await User.update({
        verificationToken: null,
        tokenExpiration: null
      }, {
        where: {
          email: userDetails.email
        }
      })
      let result = await verificationService.VerifyToken(
        dummyUser?.uuid as string,
        dummyUser?.verificationToken as string,
        false
      );
      expect(result.result).toBeFalsy();
      expect(result.result).toEqual(false);
      expect(result.message).toEqual("Verification token does not exist. Please request for a new one to be sent to you.");
    });
  
    it("Should return false because the user doesn't exist", async () => {
      await userService.CreateUser(userDetails);
      let dummyUser = await User.findOne({
        where: {
          email: userDetails.email 
        }
      });
      let result = await verificationService.VerifyToken(
        "nonexistentUser",
        dummyUser?.verificationToken as string,
        false
      );
      expect(result.result).toBeFalsy();
      expect(result.result).toEqual(false);
      expect(result.message).toEqual("Something went wrong. Please try again later.");
    });
  
    it("Should return false because the registration token is expired", async () => {
      await userService.CreateUser(userDetails);
      let dummyUser = await User.findOne({
        where: {
          email: userDetails.email 
        }
      });
      await User.update({
        tokenExpiration: new Date(Date.now() - 1000*60*60*30)
      },
      {
        where: {
          email: userDetails.email
        }
      });
      let result = await verificationService.VerifyToken(
        dummyUser?.uuid as string, 
        dummyUser?.verificationToken as string,
        false
      );
      expect(result.result).toBeFalsy();
      expect(result.result).toEqual(false);
      expect(result.message).toEqual("The verification token has expired. Please request for a new one to be sent to you.");
    });
  
    it("Should return false because the registration token is not valid", async () => {
      await userService.CreateUser(userDetails);
      let dummyUser = await User.findOne({
        where: {
          email: userDetails.email 
        }
      });
      let result = await verificationService.VerifyToken(
        dummyUser?.uuid as string,
        "nonexistentTokenWhichIsAlsoIncorrect",
        false
      );
      expect(result.result).toBeFalsy();
      expect(result.result).toEqual(false);
      expect(result.message).toEqual("The verification token is not valid. Please request for a new one to be sent to you.");
    });
  
    it("Password Reset: Should return false because the user doesn't exist", async () => {
      await userService.CreateUser(userDetails);
      let dummyUser = await User.findOne({
        where: {
          email: userDetails.email 
        }
      });
      let result = await verificationService.VerifyToken(
        "nonexistentUser",
        dummyUser?.verificationToken as string,
        true
      );
      expect(result.result).toBeFalsy();
      expect(result.result).toEqual(false);
      expect(result.message).toEqual("Something went wrong. Please try again later.");
    });
  
    it("Password Reset: Should return false because the registration token is expired", async () => {
      await userService.CreateUser(userDetails);
      let dummyUser = await User.findOne({
        where: {
          email: userDetails.email 
        }
      });
      await User.update({
        tokenExpiration: new Date(Date.now() - 1000*60*60*30)
      },
      {
        where: {
          email: userDetails.email
        }
      });
      let result = await verificationService.VerifyToken(
        dummyUser?.uuid as string, 
        dummyUser?.verificationToken as string,
        true
      );
      expect(result.result).toBeFalsy();
      expect(result.result).toEqual(false);
      expect(result.message).toEqual("The verification token has expired. Please request for a new one to be sent to you.");
    });
  
    it("Password Reset: Should return false because the registration token is not valid", async () => {
      await userService.CreateUser(userDetails);
      let dummyUser = await User.findOne({
        where: {
          email: userDetails.email 
        }
      });
      let result = await verificationService.VerifyToken(
        dummyUser?.uuid as string,
        "nonexistentTokenWhichIsAlsoIncorrect",
        true
      );
      expect(result.result).toBeFalsy();
      expect(result.result).toEqual(false);
      expect(result.message).toEqual("The verification token is not valid. Please request for a new one to be sent to you.");
    });
  
  
    it("Should send a verification email upon user being created", async () => {
      await userService.CreateUser(userDetails);
      expect(sendMailMock).toHaveBeenCalledTimes(1);
      expect(sendMailMock).toHaveBeenCalled();
    });
  
    it("Should send a new verification email upon being invoked if user exists", async () => {
      await userService.CreateUser(userDetails);
      let user = await User.findOne({
        where: {
          email: userDetails.email
        }
      });
      expect(user).toBeDefined();
      await verificationService.SendNewVerificationToken(user!.uuid);
      // Being called once because registration/welcome to handl email is sent before on CreateUser call
      expect(sendMailMock).toHaveBeenCalledTimes(2);
      expect(sendMailMock).toHaveBeenCalled();
    });
  
    it("Should send nothing because a user doesn't exist", async () => {
      await verificationService.SendNewVerificationToken("foo");
      expect(sendMailMock).toHaveBeenCalledTimes(0);
      expect(sendMailMock).not.toHaveBeenCalled();
    });

    it("Should send a new verification token and update the columns in the database with new token and expiration date", async () => {
        await userService.CreateUser(userDetails);
        let user = await User.findOne({
          where: {
            email: userDetails.email
          }
        });
        let oldToken = user?.verificationToken;
        let expiration = user?.tokenExpiration;
        await verificationService.SendNewVerificationToken(user!.uuid);
        user = await User.findOne({
          where: {
            email: userDetails.email
          }
        });
        expect(user?.verificationToken).not.toEqual(oldToken);
        expect((user?.tokenExpiration as Date).getTime() as number).toBeGreaterThan(expiration?.getTime() as number);
        // called once after creation of user and once after sending new verificaiton token
        expect(sendMailMock).toHaveBeenCalledTimes(2);
        expect(sendMailMock).toHaveBeenCalled();
    });
});
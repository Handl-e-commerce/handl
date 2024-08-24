import {beforeEach, afterEach, describe, expect, it, jest, beforeAll} from "@jest/globals";
import {UserService} from "../services/UserService";
import {IUserDetails} from "../interfaces/IUserDetails";
import {User} from "../db/models/User";
import {AuthToken} from "../db/models/AuthToken";
import { EncryptionUtil } from "../utils/EncryptionUtil";

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

describe("UserService Tests", function() {
  it("Should create a new user with its own id", async () => {
    const result = await userService.CreateUser(userDetails);
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.message).toBe(`Created new user with id: ${result.id}`);
  });

  it("Should thorw an error if username already exists when creating new user", async () => {
    try {
      await userService.CreateUser(userDetails);
      await userService.CreateUser(userDetails);
    } catch (err) {
      const error = err as Error;
      expect(error.message).toMatch("User already exists in database.");
    }
  });

  it("Should return an error if non-null field is null when creating user", async () => {
    // Realistically this will never happen, since I've created userDetails type to prevent this from happening.
    // I had to set this to any in order for this test to actually go through
    const userDetailsNull: any = {
        email: "foobar@fizz.buzz",
        businessName: null,
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
    try {
      await userService.CreateUser(userDetailsNull);
    } catch (err) {
      const error = err as Error;
      expect(error.message).toMatch(
        "notNull Violation: Users.businessName cannot be null"
      );
    }
  });

  it("Should update an existing users password", async () => {
    const result = await userService.CreateUser(userDetails);
    const passwordUpdateResult = await userService.ResetUserPassword(result.id, "Fugazzi500$");
    let user = await User.findOne({
      where: {
        email: userDetails.email
      }
    });
    expect(passwordUpdateResult).toBeDefined();
    expect(user?.verificationToken).toBeNull();
    expect(user?.tokenExpiration).toBeNull();
  });

  it("Should throw an error when updating password because user does not exist", async () => {
    await userService.CreateUser(userDetails);
    try {
      await userService.ResetUserPassword("DoesNotExist", "Fugazzi500$");
    } catch (err) {
      const error = err as Error;
      expect(error.message).toMatch("Could not find user with associated user id");
    }
  });

  it("Should get an existing user with valid id", async () => {
    const result = await userService.CreateUser(userDetails);
    const getResult: User = await userService.GetUserByUserId(result.id);
    expect(getResult.businessName).toMatch(userDetails.businessName);
  });

  it("Should return an error because user does not exist in the DB", async () => {
    try {
      await userService.GetUserByUserId("IdThatDoesntExist");
    } catch (err) {
      const error = err as Error;
      expect(error.message).toMatch("No users with id: IdThatDoesntExist found.");
    }
  });

  it("Should soft delete an existing user", async () => {
    const result = await userService.CreateUser(userDetails);
    const deleteResult = await userService.DeleteUser(result.id);
    expect(deleteResult).toBeDefined();
    let softDeletedUser = await User.findOne({
        where: {
            email: userDetails.email
        },
        paranoid: false
    });

    expect(softDeletedUser?.isSoftDeleted()).toEqual(true);
  });

  it("Should return true result, selector, validator, and expiration because user is valid", async () => {
    await userService.CreateUser(userDetails);
    const loginRes = await userService.Login(userDetails.email, userDetails.password);
    expect(loginRes.result).toBe(true);
    expect(loginRes.selector).toBeDefined();
    expect(loginRes.validator).toBeDefined();
    expect(loginRes.selector).not.toEqual(loginRes.validator);
    expect(Number(loginRes.expires)).toBeGreaterThan(Date.now());
    const authToken = await AuthToken.findOne({
      where: {
        selector: loginRes.selector as string
      }
    });
    expect(authToken).toBeDefined();
    expect(authToken?.validator).not.toEqual(loginRes.validator);
    await AuthToken.destroy({
      where: {
        selector: loginRes.selector as string
      }
    })
  });

  it("Should return false because user does not exist", async () => {
    await userService.CreateUser(userDetails);
    const loginRes = await userService.Login("Bafangool@gmail.com", userDetails.password);
    expect(loginRes.result).toBe(false);
    expect(loginRes.selector).not.toBeDefined();
    expect(loginRes.validator).not.toBeDefined();
    expect(loginRes.expires).not.toBeDefined();
  });

  it("Should return false because password is incorrect", async () => {
    await userService.CreateUser(userDetails);
    const loginRes = await userService.Login(userDetails.email, "obviouslywrongpassword");
    expect(loginRes.result).toBe(false);
    expect(loginRes.selector).not.toBeDefined();
    expect(loginRes.validator).not.toBeDefined();
    expect(loginRes.expires).not.toBeDefined();
  });

  it("Should return true because 'cookies' are valid from the user", async () => {
    await userService.CreateUser(userDetails);
    const loginRes = await userService.Login(userDetails.email, userDetails.password);
    expect(loginRes.selector).toBeDefined();
    expect(loginRes.validator).toBeDefined();
    const verify: boolean = await userService.VerifyUser(
      loginRes.selector as string,
      loginRes.validator as string,
      loginRes.userId as string
    );
    expect(verify).toBe(true);
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
    const verify: boolean = await userService.VerifyUser(loginRes.selector as string, loginRes.validator as string, "UserIdWhichDoesn'tExist");
    expect(verify).toBe(false);
    await AuthToken.destroy({
      where: {
        selector: loginRes.selector as string
      }
    });
  });

  it("Should return false because row doesn't exist in the DB leading to null from query", async () => {
    const verify: boolean = await userService.VerifyUser("SelectorThatDoesn'tExistInDB", "ValidatorThatDoesn'tExistInDB", "MockUserId");
    expect(verify).toBe(false);
  });

  it("Should return false because validator doesn't match decrypted validator", async () => {
    await userService.CreateUser(userDetails);
    const loginRes = await userService.Login(userDetails.email, userDetails.password);
    expect(loginRes.selector).toBeDefined();
    expect(loginRes.validator).toBeDefined();
    const verify: boolean = await userService.VerifyUser(loginRes.selector as string, "validatorThatWon'tMatch", "MockUserId");
    expect(verify).toBe(false);
    await AuthToken.destroy({
      where: {
        selector: loginRes.selector as string
      }
    });
  });
  
  it("Should delete row containing selecter after logout is invoked", async () => {
    await userService.CreateUser(userDetails);
    const loginRes = await userService.Login(userDetails.email, userDetails.password);
    let tokenRow = await AuthToken.findOne({
      where: {
        selector: loginRes.selector as string
      }
    });
    await userService.Logout(tokenRow?.selector as string);
    let result = await AuthToken.findOne({
      where: {
        selector: loginRes.selector as string
      }
    });
    expect(result).toBeNull();
  });

  it("Should send email with generated link for reseting password", async () => {
    await userService.CreateUser(userDetails);
    await userService.RequestUserPasswordReset(userDetails.email);
    // called once after creation of user and once after sending new verificaiton token
    expect(sendMailMock).toHaveBeenCalledTimes(2);
    expect(sendMailMock).toHaveBeenCalled();
  });

  it("Should throw an error for password reset beacause user does not exist", async () => {
    try {
      await userService.RequestUserPasswordReset("emailThatDoesNotExist");
    } catch(err) {
      const error = err as Error;
      expect(error.message).toMatch("User does not exist.");
    }
  });

  // TODO: (LOW) Implement method to update saved vendors for user as it doesn't exist but it's not high priority right now
  it("Should get a list of saved vendors", async () => {
    await userService.CreateUser(userDetails);
    let user = await User.findOne({
      where: {
        email: userDetails.email
      }
    });

    const savedVendors = await userService.GetSavedVendors(user!.uuid);
    expect(savedVendors.length).toBeDefined();
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
    await userService.SendNewVerificationToken(user!.uuid);
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

describe("UserService Verification Token Tests", () => {
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
    let result = await userService.VerifyToken(
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
    let result = await userService.VerifyToken(
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
    let result = await userService.VerifyToken(
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
    let result = await userService.VerifyToken(
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
    let result = await userService.VerifyToken(
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
    let result = await userService.VerifyToken(
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
    let result = await userService.VerifyToken(
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
    let result = await userService.VerifyToken(
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
    let result = await userService.VerifyToken(
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
    await userService.SendNewVerificationToken(user!.uuid);
    // Being called once because registration/welcome to handl email is sent before on CreateUser call
    expect(sendMailMock).toHaveBeenCalledTimes(2);
    expect(sendMailMock).toHaveBeenCalled();
  });

  it("Should send nothing because a user doesn't exist", async () => {
    await userService.SendNewVerificationToken("foo");
    expect(sendMailMock).toHaveBeenCalledTimes(0);
    expect(sendMailMock).not.toHaveBeenCalled();
  });
});
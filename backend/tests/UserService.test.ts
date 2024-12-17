import {beforeEach, afterEach, describe, expect, it, jest} from "@jest/globals";
import {UserService} from "../services/UserService";
import {IUserDetails} from "../interfaces/IUserDetails";
import {User} from "../db/models/User";
import {AuthToken} from "../db/models/AuthToken";

const sendMailMock = jest.fn().mockReturnValue("Sent mock email!");

jest.mock("nodemailer");

const nodemailer = require("nodemailer");
nodemailer.createTransport.mockReturnValue({"sendMail": sendMailMock});

const userDetails: IUserDetails = {
  email: "analyst@test.buzz",
  businessName: "Analyst & Associates",
  phoneNumber: "9876543210",
  password: "Bafang00l$!",
  firstName: "Test",
  lastName: "User2",
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

  it("Should send contact us email when hit", async () => {
    await userService.SendSupportMessage("Foo", "Bar", "foobar@gmail.com", "Test Message");
    expect(sendMailMock).toHaveBeenCalledTimes(1);
  });

  it("Should update the list of saved vendors", async () => {
    const mockVendorIds = [
      'e370166a-eecc-48b2-80d7-b5212cfd1f85',
      '27ae85e2-8fb3-44e0-a381-f26c1a177025',
      'f1e3776d-5ec4-4193-9046-854d9807617f',
      'aed92045-9ecd-4729-bdcb-7d1d660f2d18',
    ];
    await userService.CreateUser(userDetails);
    let userId = (await User.findOne({
      where: {
        email: userDetails.email,
      }
    }))?.uuid;
    
    await userService.SaveVendors(mockVendorIds, userId as string);
    
    let expectedResult = await userService.GetUserByUserId(userId as string);
    expect(expectedResult.savedVendors).toEqual(mockVendorIds);
    expect(expectedResult.savedVendors?.length).toEqual(mockVendorIds.length);

    const slicedMockVendorIds = mockVendorIds.slice(0, 2);

    await userService.SaveVendors(slicedMockVendorIds, userId as string);
    
    expectedResult = await userService.GetUserByUserId(userId as string);
    expect(expectedResult.savedVendors).toEqual(slicedMockVendorIds);
    expect(expectedResult.savedVendors?.length).toEqual(slicedMockVendorIds.length);
  });

});
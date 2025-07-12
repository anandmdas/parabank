import { Page, TestInfo } from '@playwright/test';
import { registerPageObjects } from './register.object';
import * as registerPageDisplayText from '../../../resources/displayTextConstants/register.json'
import { Utility } from '../../utils/utility';

export class RegisterPage {
     page;
     testInfo;
     /**
     * @description Constructor for the class to initialize
     * @param page Page context created by the test 
     * @param testInfo TestInfo Context of the execution for loging the details
     */
    constructor(page: Page, testInfo:TestInfo){
        this.page =page;
        this.testInfo = testInfo
    }
    
    /**
     * @description Method to register the user with the test data and Validate if registration is successful
     */
    public async registerUser(){
    await Utility.validateObjectText(this.page,registerPageObjects.pageTitle,registerPageDisplayText.registerPageHeading,this.testInfo)
    let testData =(global as any).scenarioData;
    await Utility.inputValue(this.page,registerPageObjects.firstNameInput,testData.firstName,this.testInfo)
    await Utility.inputValue(this.page,registerPageObjects.lastNameInput,testData.lastName,this.testInfo)
    await Utility.inputValue(this.page,registerPageObjects.addressInput,testData.address,this.testInfo)
    await Utility.inputValue(this.page,registerPageObjects.cityInput,testData.city,this.testInfo)
    await Utility.inputValue(this.page,registerPageObjects.stateInput,testData.state,this.testInfo)
    await Utility.inputValue(this.page,registerPageObjects.zipCodeInput,testData.zipcode,this.testInfo)
    await Utility.inputValue(this.page,registerPageObjects.phoneNumberInput,testData.phone,this.testInfo)
    await Utility.inputValue(this.page,registerPageObjects.ssnInput,testData.ssn,this.testInfo)
    await Utility.inputValue(this.page,registerPageObjects.userNameInput,testData.username,this.testInfo)
    await Utility.inputValue(this.page,registerPageObjects.passwordInput,testData.password,this.testInfo)
    await Utility.inputValue(this.page,registerPageObjects.confirmPasswordInput,testData.password,this.testInfo)
    await Utility.click(this.page,registerPageObjects.registerButton,this.testInfo)
    await Utility.validateObjectText(this.page,registerPageObjects.welcomeHeader,'Welcome '+testData.username,this.testInfo) 
    await Utility.validateObjectText(this.page,registerPageObjects.successfulRegistrationText,registerPageDisplayText.successfulRegistration,this.testInfo)  
    }

}
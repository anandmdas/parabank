import { Page, TestInfo } from "@playwright/test";
import { loginPageObjects } from "./login.object";
import { Utility } from "../../utils/utility";
import * as loginPageDisplayText from '../../../resources/displayTextConstants/login.json'

export class LoginPage {
    page;
    testInfo;
    /**
     * @description Constructor for the class to initialize
     * @param page Page context created by the test 
     * @param testInfo TestInfo Context of the execution for loging the details
     */
    constructor(page: Page,testInfo:TestInfo){
        this.page =page;
        this.testInfo = testInfo;
    }
    /**
     * @description Navigate to web page using the base url in playwright.config.ts
     */
    public async navigateToParasoft(){
        await this.page.goto('/')
        const pageTitle= await this.page.title();
        await Utility.validateText(loginPageDisplayText.parasoftPageTitle,pageTitle,this.testInfo)
    }
    /**
     * @description Method to navigate to User registration
     */
    public async navigateToRegister(){
        await Utility.click(this.page, loginPageObjects.registerLink,this.testInfo)
    }

    /**
     * @description Method to login with registered user
     */
    public async login(){
        let testData =(global as any).scenarioData;
        await Utility.inputValue(this.page,loginPageObjects.userNameInput,testData.username,this.testInfo)
        await Utility.inputValue(this.page,loginPageObjects.passwordField,testData.password,this.testInfo)
        await Utility.click(this.page,loginPageObjects.loginButton,this.testInfo)
    }
}
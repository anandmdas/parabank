import { Page, TestInfo } from "@playwright/test";
import { Utility } from "../../utils/utility";
import * as openNewAccountDisplayText from '../../../resources/displayTextConstants/openNewAccount.json'
import { openNewAccount } from "./openNewAccount.object";

export class OpenNewAccount {
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
     * @description Method to validate the Request Loan landing page by checking the Page Title and Heading in the page
     */
    public async validateLandingPage(){
        const pageTitle= await this.page.title();
        await Utility.validateText(openNewAccountDisplayText.parasoftPageTitle,pageTitle,this.testInfo)
        await Utility.validateObjectText(this.page,openNewAccount.openNewAccountPageHeader,openNewAccountDisplayText.header,this.testInfo)
    }

    /**
     * @description Method to create a new account from an existing account
     * @param testData An object which contains all the testdata for the scenario being executed
     * @returns Returns the account number of newly created account
     */
    public async createNewAccount(testData:any){
        await Utility.selectFromDropdown(this.page,openNewAccount.accountTypeDropdown, testData.accountType,this.testInfo)
        await this.page.locator(openNewAccount.fromAccountDropdown).selectOption({ index: 0 })
        await Utility.click(this.page,openNewAccount.openNewAccountButton,this.testInfo)
        let accountNumber = await Utility.getTextValue(this.page,openNewAccount.newAccountNumber,this.testInfo)
        return accountNumber;
    }
}
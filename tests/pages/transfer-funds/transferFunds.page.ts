import { Page, TestInfo } from "@playwright/test";
import { Utility } from "../../utils/utility";
import * as transferFundsDisplayText from '../../../resources/displayTextConstants/transferFunds.json'
import { transferFundsObject } from "./transferFunds.object";


export class TransferFunds {
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
     * @description Method to validate the Transfer funds landing page by checking the Page Title and Heading in the page
     */
    public async validateLandingPage(){
        const pageTitle= await this.page.title();
        await Utility.validateText(transferFundsDisplayText.parasoftPageTitle,pageTitle,this.testInfo)
        await Utility.validateObjectText(this.page,transferFundsObject.transferFundsHeading,transferFundsDisplayText.header,this.testInfo)
    }

    /**
     * @description Reusable method to perform transfer funds and check the transfer is successful
     * @param accountNumber The Account number from which the transfer needs to be made
     */
    public async transferFund(accountNumber:string){
        let testData =(global as any).scenarioData;

        //Performing the fund transfer
        await Utility.inputValue(this.page, transferFundsObject.amountInputText, testData.amountTransfer,this.testInfo );
        await Utility.selectFromDropdown(this.page,transferFundsObject.fromAccountDropDown, accountNumber,this.testInfo)
        await this.page.locator(transferFundsObject.toAccountDropDown).selectOption({ index: 0 })
        await Utility.click(this.page,transferFundsObject.transferButton,this.testInfo)

        //Validating the transfer is successful
        await Utility.validateObjectText(this.page,transferFundsObject.transferCompleteHeading,transferFundsDisplayText.transferCompleteHeading,this.testInfo);
        let footnote=await Utility.getTextValue(this.page,transferFundsObject.transferCompleteText,this.testInfo)
        await Utility.validateTextContains(footnote,'$'+Number(testData.amountTransfer).toFixed(2)+' has been transferred from account #'+accountNumber,this.testInfo)
    }
}
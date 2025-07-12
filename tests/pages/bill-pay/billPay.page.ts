import { Page, TestInfo } from "@playwright/test";
import { Utility } from "../../utils/utility";
import * as billPayDisplayText from '../../../resources/displayTextConstants/billPay.json'
import { billPayObject } from "./billPay.object";

export class BillPay {
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
     * @description Method to validate the Bill Pay landing page by checking the Page Title and Heading in the page
    */
    public async validateLandingPage(){
        const pageTitle= await this.page.title();
        await Utility.validateText(billPayDisplayText.parasoftPageTitle,pageTitle,this.testInfo)
        await Utility.validateObjectText(this.page,billPayObject.pageHeader,billPayDisplayText.billPayHeader,this.testInfo)
    }

    /**
     * @description Method to Pay the bill and check the bill payment was successful
     * @param accountNum Account number from which the bill payment to be made
     */
    public async payBill(accountNum:string){
        let testData =(global as any).scenarioData;
        await Utility.inputValue(this.page,billPayObject.payeeNameTextField,testData.payeeName,this.testInfo)
        await Utility.inputValue(this.page,billPayObject.addressTextField,testData.address,this.testInfo)
        await Utility.inputValue(this.page,billPayObject.cityTextField,testData.city,this.testInfo)
        await Utility.inputValue(this.page,billPayObject.stateTextField,testData.state,this.testInfo)
        await Utility.inputValue(this.page,billPayObject.zipCodeTextField,testData.zipCode,this.testInfo)
        await Utility.inputValue(this.page,billPayObject.phoneNumTextField,testData.phoneNumber,this.testInfo)
        await Utility.inputValue(this.page,billPayObject.accountNumTextField,testData.accountNum,this.testInfo)
        await Utility.inputValue(this.page,billPayObject.verifyAccountNumTextField,testData.accountNum,this.testInfo)
        await Utility.inputValue(this.page,billPayObject.amountTextField,testData.amount,this.testInfo)
        await Utility.selectFromDropdown(this.page,billPayObject.fromAccountDropDown,accountNum,this.testInfo)
        await Utility.click(this.page,billPayObject.sendPaymentButton,this.testInfo)
        await Utility.validateObjectText(this.page,billPayObject.billPayComplete,billPayDisplayText.billpayComplete,this.testInfo)
        await Utility.validateObjectText(this.page,billPayObject.billPayCompleteFootnote,billPayDisplayText.billPaySuccessFootnote.replaceAll("__amount__",Number(testData.amount).toFixed(2)).replaceAll("__account__",accountNum),this.testInfo)
    }
}
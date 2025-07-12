import { Page, TestInfo } from "@playwright/test";
import { Utility } from "../../utils/utility";
import * as requestLoanDisplayText from '../../../resources/displayTextConstants/requestLoan.json'
import { requestLoanObject } from "./requestLoan.object";

export class RequestLoan {
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
        await Utility.validateText(requestLoanDisplayText.parasoftPageTitle,pageTitle,this.testInfo)
        await Utility.validateObjectText(this.page,requestLoanObject.pageHeader,requestLoanDisplayText.header,this.testInfo)
    }
}
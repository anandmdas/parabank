import { APIRequestContext, expect, Page, TestInfo } from "@playwright/test";
import { Utility } from "../../utils/utility";
import * as findTransactionsDisplayText from '../../../resources/displayTextConstants/findTransactions.json'
import { findTransactionsObject } from "./findTransaction.object";

export class FindTransactions {
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
     * @description Method to validate the Find Transactions landing page by checking the Page Title and Heading in the page
     */
    public async validateLandingPage(){
        const pageTitle= await this.page.title();
        await Utility.validateText(findTransactionsDisplayText.parasoftPageTitle,pageTitle,this.testInfo)
        await Utility.validateObjectText(this.page,findTransactionsObject.pageHeader,findTransactionsDisplayText.header,this.testInfo)
    }

    /**
     * @description Method to Validate the Transactions performed using API get call
     * @param url url for the API get request
     * @param sharedData object which has { accountNumber: string, payeeName:string }
     * @param testData An object which contains all the testdata for the scenario being executed
     * @param testInfo TestInfo Context of the execution for loging the details
     */
    public async validateFindTransactionsApi(url:string,sharedData: { accountNumber: string, payeeName:string },testData:any, testInfo:TestInfo){
        const response = await this.page.request.get(url)
        expect(response.status()).toBe(200)
        const responseBody =await response.json();
        await Utility.validateTwoValues(responseBody[0]["accountId"],Number(sharedData.accountNumber),testInfo)
        await Utility.validateTwoValues(responseBody[0]["type"],testData.transactionType,testInfo)
        await Utility.validateTwoValues(responseBody[0]["amount"],Number(testData.amount),testInfo)
        await Utility.validateTwoValues(responseBody[0]["description"],findTransactionsDisplayText.transactionDetails+sharedData.payeeName,testInfo)
        await Utility.validateTwoValues(this.formatDate(new Date(responseBody[0]["date"])),this.formatDate(new Date()),testInfo)
    }

    /**
     * @description Method to format Date to dd-mm-yyyy format
     * @param date Date in any format
     * @returns returns date in dd-mm-yyyy format
     */
    public formatDate(date: Date){
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const currentFormattedDate = `${day}-${month}-${year}`;
        return currentFormattedDate
    }
}
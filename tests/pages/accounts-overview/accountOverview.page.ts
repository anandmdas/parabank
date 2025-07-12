import { Page, TestInfo } from "@playwright/test";
import { Utility } from "../../utils/utility";
import * as accountOverviewDisplayText from '../../../resources/displayTextConstants/accountOverview.json'
import { accountsOverviewObjects } from "./accountOverview.object";

export class AccountOverviewPage {
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
     * @description Method to validate the Overview landing page by checking the Page Title and Heading in the page
     */
    public async validateOverviewPage(){
        const pageTitle= await this.page.title();
        await Utility.validateText(accountOverviewDisplayText.parasoftPageTitle,pageTitle,this.testInfo)
        await Utility.validateObjectText(this.page,accountsOverviewObjects.pageTitle,accountOverviewDisplayText.accountOverviewHeader,this.testInfo)
    }

    /**
     * @description Validate the amount on the newly created account by iterating through the table
     * @param accountNum Account number of the account for which the amount needs to be validated
     */
    public async validateLatestAccountAmount(accountNum:string){
        await this.page.locator(accountsOverviewObjects.accountTableDetails.replaceAll("__rowNum__",1+"").replaceAll("__columnNum__",1+"")).waitFor({ state: 'visible', timeout: 5000 })
        let rowCount= await this.page.locator(accountsOverviewObjects.accountTableRowDetails).count();
        for(let row=1;row<=rowCount;row++){
            let accountTableAccountNum=await Utility.getTextValue(this.page,accountsOverviewObjects.accountTableDetails.replaceAll("__rowNum__",row+"").replaceAll("__columnNum__",1+""),this.testInfo)
            if(accountNum===accountTableAccountNum){
                await Utility.validateObjectText(this.page,accountsOverviewObjects.accountTableDetails.replaceAll("__rowNum__",row+"").replaceAll("__columnNum__",2+""),"$100.00",this.testInfo)
            }
        }
    }

    /**
     * @description Method to validate the total amount the user holds by summing up the amount in all accounts
     */
    public async validateTotalAmount(){
        let rowCount= await this.page.locator(accountsOverviewObjects.accountTableRowDetails).count();
        let sum=0
        for(let row=1;row<rowCount;row++){
            let amount=await Utility.getTextValue(this.page,accountsOverviewObjects.accountTableDetails.replaceAll("__rowNum__",row+"").replaceAll("__columnNum__",2+""),this.testInfo)
            amount=amount.replaceAll("$","")
            sum= sum+ Number(amount)
        }
        await Utility.validateObjectText(this.page,accountsOverviewObjects.accountTableDetails.replaceAll("__rowNum__",rowCount+"").replaceAll("__columnNum__",2+""),"$"+sum.toFixed(2),this.testInfo)
    }
}
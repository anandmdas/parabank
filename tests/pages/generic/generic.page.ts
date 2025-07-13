import { Page, TestInfo } from "@playwright/test";
import { Utility } from "../../utils/utility";
import { genericPageObjects } from "./generic.object";

export class GenericPage{
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
     * @description Method to validate the user details on left pane in Parasoft web page
     * @param testData An object which contains all the testdata for the scenario being executed
     */
    public async validateUserDetails(testData:any){
        await Utility.validateObjectText(this.page,genericPageObjects.userDetail,'Welcome '+testData.firstName+' '+testData.lastName,this.testInfo)
    }

    /**
     * @description Method to navigate to open new account web page
     */
    public async navigateToOpenNewAccount(){
        await Utility.click(this.page,genericPageObjects.openNewAccount,this.testInfo)
    }

    /**
     * @description Method to navigate to Account overview web page
     */
    public async navigateToAccountsOverview(){
       await Utility.click(this.page,genericPageObjects.accountsOverview,this.testInfo)
    }

    /**
     * @description Method to navigate to Transfer funds web page
     */
    public async navigateToTransferFunds(){
        await Utility.click(this.page,genericPageObjects.transferFunds,this.testInfo)
    }

    /**
     * @description Method to navigate to Bill Pay web page
     */
    public async navigateToBillPay(){
       await Utility.click(this.page,genericPageObjects.billPay,this.testInfo)
    }

    /**
     * @description Method to navigate to Find Transactions web page
     */
    public async navigateToFindTransactions(){
       await Utility.click(this.page,genericPageObjects.findTransactions,this.testInfo)
    }

    /**
     * @description Method to navigate to Update Contact web page
     */
    public async navigateToUpdateContact(){
       await Utility.click(this.page,genericPageObjects.updateContactInfo,this.testInfo)
    }

    /**
     * @description Method to navigate to Request Loan web page
     */
    public async navigateToRequestLoan(){
      await Utility.click(this.page,genericPageObjects.requestLoan,this.testInfo)
    }

    /**
     * @description Method to Log out
     */
    public async navigateToLogOut(){
      await Utility.click(this.page,genericPageObjects.logOut,this.testInfo)
    }
}
import { Page, TestInfo } from "@playwright/test";
import { Utility } from "../../utils/utility";
import * as updateProfileFormDisplayText from '../../../resources/displayTextConstants/updateProfile.json'
import { updateProfileObject } from "./updateProfile.object";


export class UpdateProfile {
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
     * @description Method to validate the Update Profile landing page by checking the Page Title and Heading in the page
     */
    public async validateLandingPage(){
        const pageTitle= await this.page.title();
        await Utility.validateText(updateProfileFormDisplayText.parasoftPageTitle,pageTitle,this.testInfo)
        await Utility.validateObjectText(this.page,updateProfileObject.pageHeader,updateProfileFormDisplayText.header,this.testInfo)
    }
}
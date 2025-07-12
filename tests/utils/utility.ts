import { expect, Page, TestInfo } from "@playwright/test";

export class Utility{
    /**
     * @description Method to perform a click action on an element
     * @param page Page context created by the test
     * @param locator The element on which the action needs to be performed
     * @param testInfo TestInfo Context of the execution for loging the details
     */
    public static async click(page:Page, locator: string, testInfo:TestInfo){
        await page.locator(locator).click()
         let logMessage='object with locator '+locator+ 'is clicked'
            await testInfo.attach(logMessage,{
                body: logMessage,
                contentType: 'text/plain'
            })
    }

    /**
     * @description Method to validate two string values
     * @param expectedText Expected Text to be validated against
     * @param actualText Actual Text
     * @param testInfo TestInfo Context of the execution for loging the details
     */
    public static async validateText(expectedText:string, actualText:string,testInfo: TestInfo){
       
            expect(actualText).toBe(expectedText,);
            let logMessage=actualText+' and '+ this.validateText+' is compared and is same'
            await testInfo.attach(logMessage,{
                body: logMessage,
                contentType: 'text/plain'
            })
    }

    /**
     * @description Method to get the text value from an object and validate the text
     * @param page Page context created by the test
     * @param locator The element on which the action needs to be performed
     * @param expectedText Expected text to which the comparison has to be made
     * @param testInfo TestInfo Context of the execution for loging the details
     */
    public static async validateObjectText(page:Page, locator:string, expectedText:string,testInfo: TestInfo){
        await page.locator(locator).waitFor({state:"visible"})
        await expect(page.locator(locator)).toHaveText(expectedText)
        let logMessage='object with locator '+locator+ 'is having the text '+expectedText
            await testInfo.attach(logMessage,{
                body: logMessage,
                contentType: 'text/plain'
            })
    }

    /**
     * @description Method to get the testdata of the current scenario execution
     * @param filename Name of the json file where the scenario testdata is present
     * @param scenarioName Name of the scenario for which the data to be fetched
     */
    public static async getScenarioData(filename:string,scenarioName:string){
        const jsonTestData=require('../../resources/testdata/'+filename+'.json')
        for(let scenarioIndex=0; scenarioIndex<jsonTestData.length;scenarioIndex++){
            const scenario = jsonTestData[scenarioIndex];
            if(scenario['scenarioName']===scenarioName){
                (global as any).scenarioData = scenario['data']
            }
        }
    }

    /**
     * @description Method to input value on a text box
     * @param page Page context created by the test
     * @param locator The element on which the action needs to be performed
     * @param inputText The text to be inputed
     * @param testInfo TestInfo Context of the execution for loging the details
     */
    public static async inputValue(page:Page, locator:string,inputText:string , testInfo:TestInfo){
        await page.locator(locator).fill(inputText)
        let logMessage='object with locator '+locator+ 'is inputed with the text '+inputText
            await testInfo.attach(logMessage,{
                body: logMessage,
                contentType: 'text/plain'
            })
    }

    /**
     * @description Method to select a value from a dropdown
     * @param page Page context created by the test
     * @param locator The element on which the action needs to be performed
     * @param value The Value to be selected from the dropdown
     * @param testInfo TestInfo Context of the execution for loging the details
     */
    public static async selectFromDropdown(page:Page, locator:string,value:string,testInfo:TestInfo){
        await page.locator(locator).selectOption(value)
         let logMessage=value+' is selected from object with locator '+locator
            await testInfo.attach(logMessage,{
                body: logMessage,
                contentType: 'text/plain'
            })
    }

    /**
     * @description Method to get the value from an object
     * @param page Page context created by the test
     * @param locator The element on which the action needs to be performed
     * @param testInfo TestInfo Context of the execution for loging the details
     * @returns The value fetched from the object
     */
    public static async getTextValue(page:Page, locator:string,testInfo:TestInfo){
        await page.locator(locator).waitFor({state:"visible"})
        return await page.locator(locator).innerText()
    }

    /**
     * @description Method to check if a part of a string is available in the other
     * @param fullText Full text on which the check has to be performed
     * @param partialText The Partial text whcih needs to be checked
     * @param testInfo TestInfo Context of the execution for loging the details
     */
    public static async validateTextContains(fullText:string,partialText:string, testInfo:TestInfo){
        expect(fullText).toContain(partialText)
        let logMessage=fullText+' contains '+ partialText
        await testInfo.attach(logMessage,{
            body: logMessage,
            contentType: 'text/plain'
        })
    }

    /**
     * @description Method to validate two values
     * @param actual Actual value to be checked
     * @param expected Expected Value to be checked
     * @param testInfo TestInfo Context of the execution for loging the details
     */
    public static async validateTwoValues(actual:any, expected:any, testInfo:TestInfo){
        expect(actual).toBe(expected)
        let logMessage=actual+' and '+ expected+' is validated'
        await testInfo.attach(logMessage,{
            body: logMessage,
            contentType: 'text/plain'
        })
    }

}
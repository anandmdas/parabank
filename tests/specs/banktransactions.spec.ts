import {request, test} from '@playwright/test'
import { LoginPage } from '../pages/login/login.page'
import { RegisterPage } from '../pages/register/register.page'
import { Utility } from '../utils/utility'
import { GenericPage } from '../pages/generic/generic.page'
import { AccountOverviewPage } from '../pages/accounts-overview/accountOverview.page'
import { BillPay } from '../pages/bill-pay/billPay.page'
import { FindTransactions } from '../pages/find-transactions/findTransactions.page'
import { OpenNewAccount } from '../pages/open-new-account/openNewAccount.page'
import { RequestLoan } from '../pages/request-loan/requestLoan.page'
import { TransferFunds } from '../pages/transfer-funds/transferFunds.page'
import { UpdateProfile } from '../pages/update-profile/updateProfile.page'
import { getScenarioData } from '../utils/testdataUtility'

test.describe.serial('Open Account and perform transactions', async()=>{
    
    const sharedData = { 
        accountNumber: '',
        payeeName:''
    };

    test('Register user',async ({page }, testInfo) => {
        test.slow()
        let login =new LoginPage(page,testInfo)
        let registerPage = new RegisterPage(page,testInfo)

        const testData = await getScenarioData('parabankuiBankTransactions', testInfo.title);
        await login.navigateToParasoft();
        await login.navigateToRegister();
        await registerPage.registerUser(testData)

    })

    test('Create savings account and perform transactions', async({page }, testInfo)=>{
        test.slow();
        let login = new LoginPage(page,testInfo)
        let generic = new GenericPage(page,testInfo)
        let openNewAccount = new OpenNewAccount(page,testInfo)
    
        const testData = await getScenarioData('parabankuiBankTransactions', testInfo.title);
        await login.navigateToParasoft()
        await login.login(testData);
        await generic.validateUserDetails(testData);
        await generic.navigateToOpenNewAccount();
        await openNewAccount.validateLandingPage()
        sharedData.accountNumber = await openNewAccount.createNewAccount(testData)
    })

    test('Validate account info table', async({page }, testInfo)=>{
        test.slow();
        let login = new LoginPage(page,testInfo)
        let generic = new GenericPage(page,testInfo)
        let accountOverview = new AccountOverviewPage(page,testInfo)

        const testData = await getScenarioData('parabankuiBankTransactions', testInfo.title);
        await login.navigateToParasoft()
        await login.login(testData);
        await generic.validateUserDetails(testData);
        await generic.navigateToAccountsOverview()
        await accountOverview.validateOverviewPage()
        await accountOverview.validateLatestAccountAmount(sharedData.accountNumber)
        await accountOverview.validateTotalAmount()
    })
    
    test('Transfer funds from one account to another', async({page}, testInfo)=>{
        test.slow();
        let login = new LoginPage(page,testInfo)
        let generic = new GenericPage(page,testInfo)
        let transferFunds = new TransferFunds(page,testInfo)

        const testData = await getScenarioData('parabankuiBankTransactions', testInfo.title);
        await login.navigateToParasoft()
        await login.login(testData);
        await generic.validateUserDetails(testData);
        await generic.navigateToTransferFunds()
        await transferFunds.validateLandingPage()
        await transferFunds.transferFund(sharedData.accountNumber,testData)
    })

    test('Validate Bill payment service', async({page,baseURL},testInfo)=>{
        test.slow();
        let login = new LoginPage(page,testInfo)
        let generic = new GenericPage(page,testInfo)
        let billPay = new BillPay(page,testInfo)

        const testData = await getScenarioData('parabankuiBankTransactions', testInfo.title);
        if (!testData) {
            throw new Error("Test data not found for scenario: " + testInfo.title);
        }
        await login.navigateToParasoft()
        await login.login(testData);
        await generic.validateUserDetails(testData)
        await generic.navigateToBillPay()
        await billPay.validateLandingPage()
        await billPay.payBill(sharedData.accountNumber,testData)
        sharedData.payeeName=testData.payeeName
    })

    test('Validate bank account transactions API',async({page, request, baseURL}, testInfo)=>{
        let login = new LoginPage(page,testInfo)

        const testData = await getScenarioData('parabankuiBankTransactions', testInfo.title);
         if (!testData) {
            throw new Error("Test data not found for scenario: " + testInfo.title);
        }
        await login.navigateToParasoft()
        await login.login(testData);
        let url = baseURL+'/parabank/services_proxy/bank/accounts/'+sharedData.accountNumber+'/transactions/amount/'+testData.amount
        let findTransaction = new FindTransactions(page,testInfo)
        await findTransaction.validateFindTransactionsApi(url,sharedData,testData,testInfo)
    })
})
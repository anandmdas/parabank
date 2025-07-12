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

test.describe.serial('Open Account and perform transactions', async()=>{
    
    const sharedData = { 
        accountNumber: '',
        payeeName:''
    };

    test('Register user',async ({page }, testInfo) => {
        test.slow()
        let login =new LoginPage(page,testInfo)
        let registerPage = new RegisterPage(page,testInfo)

        await Utility.getScenarioData('parabankuiBankTransactions',testInfo.title)
        await login.navigateToParasoft();
        await login.navigateToRegister();
        await registerPage.registerUser()

    })

    test('Create savings account and perform transactions', async({page }, testInfo)=>{
        test.slow();
        let login = new LoginPage(page,testInfo)
        let generic = new GenericPage(page,testInfo)
        let openNewAccount = new OpenNewAccount(page,testInfo)
    
        await Utility.getScenarioData('parabankuiBankTransactions',testInfo.title)
        await login.navigateToParasoft()
        await login.login();
        await generic.validateUserDetails();
        await generic.navigateToOpenNewAccount();
        await openNewAccount.validateLandingPage()
        sharedData.accountNumber = await openNewAccount.createNewAccount()
    })

    test('Validate account info table', async({page }, testInfo)=>{
        test.slow();
        let login = new LoginPage(page,testInfo)
        let generic = new GenericPage(page,testInfo)
        let accountOverview = new AccountOverviewPage(page,testInfo)

        await Utility.getScenarioData('parabankuiBankTransactions',testInfo.title)
        await login.navigateToParasoft()
        await login.login();
        await generic.validateUserDetails();
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

        await Utility.getScenarioData('parabankuiBankTransactions',testInfo.title)
        await login.navigateToParasoft()
        await login.login();
        await generic.validateUserDetails();
        await generic.navigateToTransferFunds()
        await transferFunds.validateLandingPage()
        await transferFunds.transferFund(sharedData.accountNumber)
    })

    test('Validate Bill payment service', async({page,baseURL},testInfo)=>{
        test.slow();
        let login = new LoginPage(page,testInfo)
        let generic = new GenericPage(page,testInfo)
        let billPay = new BillPay(page,testInfo)

        await Utility.getScenarioData('parabankuiBankTransactions',testInfo.title)
        await login.navigateToParasoft()
        await login.login();
        await generic.validateUserDetails()
        await generic.navigateToBillPay()
        await billPay.validateLandingPage()
        await billPay.payBill(sharedData.accountNumber)
        sharedData.payeeName=(global as any).scenarioData.payeeName
    })

    test('Validate bank account transactions API',async({page, request, baseURL}, testInfo)=>{
        let login = new LoginPage(page,testInfo)

        await login.navigateToParasoft()
        await login.login();
        await Utility.getScenarioData('parabankuiBankTransactions',testInfo.title)
        let testData = await (global as any).scenarioData;
        let url = baseURL+'/parabank/services_proxy/bank/accounts/'+sharedData.accountNumber+'/transactions/amount/'+testData.amount
        let findTransaction = new FindTransactions(page,testInfo)
        await findTransaction.validateFindTransactionsApi(url,sharedData,testInfo)
    })
})
import{test} from '@playwright/test';
import { LoginPage } from '../pages/login/login.page';
import { RegisterPage } from '../pages/register/register.page';
import { Utility } from '../utils/utility';
import { GenericPage } from '../pages/generic/generic.page';
import { AccountOverviewPage } from '../pages/accounts-overview/accountOverview.page';
import { BillPay } from '../pages/bill-pay/billPay.page';
import { RequestLoan } from '../pages/request-loan/requestLoan.page';
import { TransferFunds } from '../pages/transfer-funds/transferFunds.page';
import { UpdateProfile } from '../pages/update-profile/updateProfile.page';
import { FindTransactions } from '../pages/find-transactions/findTransactions.page';
import { OpenNewAccount } from '../pages/open-new-account/openNewAccount.page';
import { getScenarioData } from '../utils/testdataUtility';

test.describe.serial('Registration and navigation flow', async()=>{
    test('Register user and validate the home page navigation', async ({page }, testInfo) => {
        test.slow()
        let login =new LoginPage(page,testInfo)
        let registerPage = new RegisterPage(page,testInfo)
        
        const testData = await getScenarioData('parabankui', testInfo.title);
        await login.navigateToParasoft();
        await login.navigateToRegister();
        await registerPage.registerUser(testData)
    })

    test('Validate Menu navigation', async({page}, testInfo)=>{
        test.slow();
        let login = new LoginPage(page,testInfo)
        let generic = new GenericPage(page,testInfo)
        let accountOverview = new AccountOverviewPage(page,testInfo)
        let billPay = new BillPay(page,testInfo)
        let findTransaction = new FindTransactions(page,testInfo)
        let openNewAccount = new OpenNewAccount(page,testInfo)
        let requestLoan = new RequestLoan(page,testInfo)
        let transferFunds = new TransferFunds(page,testInfo)
        let updateProfile = new UpdateProfile(page,testInfo)


        const testData = await getScenarioData('parabankui', testInfo.title);
        await login.navigateToParasoft()
        await login.login(testData);
        await generic.validateUserDetails(testData);
        await accountOverview.validateOverviewPage()
        await generic.navigateToOpenNewAccount();
        await openNewAccount.validateLandingPage()
        await generic.navigateToAccountsOverview();
        await accountOverview.validateOverviewPage();
        await generic.navigateToTransferFunds();
        await transferFunds.validateLandingPage()
        await generic.navigateToBillPay();
        await billPay.validateLandingPage();
        await generic.navigateToFindTransactions();
        await findTransaction.validateLandingPage();
        await generic.navigateToUpdateContact();
        await updateProfile.validateLandingPage();
        await generic.navigateToRequestLoan();
        await requestLoan.validateLandingPage();
        await generic.navigateToLogOut()
    })
})

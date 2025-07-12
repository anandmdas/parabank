export const billPayObject ={
    pageHeader: "//*[@id='billpayForm']//*[@class='title']",
    payeeNameTextField:"//*[@name='payee.name']",
    addressTextField:"//*[@name='payee.address.street']",
    cityTextField:"//*[@name='payee.address.city']",
    stateTextField:"//*[@name='payee.address.state']",
    zipCodeTextField:"//*[@name='payee.address.zipCode']",
    phoneNumTextField:"//*[@name='payee.phoneNumber']",
    accountNumTextField:"//*[@name='payee.accountNumber']",
    verifyAccountNumTextField:"//*[@name='verifyAccount']",
    amountTextField:"//*[@name='amount']",
    fromAccountDropDown:"//*[@name='fromAccountId']",
    sendPaymentButton:"//*[@type='button']",
    billPayComplete:"//*[@id='billpayResult']//*[@class='title']",
    billPayCompleteFootnote:"//*[@id='billpayResult']//p[1]"
}
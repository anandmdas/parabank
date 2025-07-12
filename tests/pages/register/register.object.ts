export const registerPageObjects ={
    pageTitle : "//*[@class='title']",
    firstNameInput : "//*[@name='customer.firstName']",
    lastNameInput : "//*[@name='customer.lastName']",
    addressInput : "//*[@name='customer.address.street']",
    cityInput : "//*[@id='customer.address.city']",
    stateInput : "//*[@id='customer.address.state']",
    zipCodeInput : "//*[@id='customer.address.zipCode']",
    phoneNumberInput : "//*[@id='customer.phoneNumber']",
    ssnInput : "//*[@id='customer.ssn']",
    userNameInput : "//*[@id='customer.username']",
    passwordInput : "//*[@id='customer.password']",
    confirmPasswordInput : "//*[@id='repeatedPassword']",
    registerButton : "//*[@type='submit' and @value = 'Register']",
    welcomeHeader:"//*[@class='title']",
    successfulRegistrationText:"//*[@class='title']/../p"
}
export const passwordValidator = (pwd: string) => {
    const password = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,64}$/;
    if (!password.test(pwd)) return false;        
    else return true;
};
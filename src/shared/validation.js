

export const checkValidation = (value, rules) => {
    let isValid = true;

    if(rules.required){
        isValid = value.trim() !== "" && isValid;
    }
    if(rules.minLenght){
        isValid = value.length >= rules.minLenght && isValid;
    }
    if(rules.maxLenght){
        isValid = value.length <= rules.maxLenght && isValid;
    }
    if(rules.isEmail){
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = pattern.test(value) && isValid
    }
    return isValid;
}
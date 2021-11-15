// check for mail validation
export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// update input errors
export const updateError = (array, index, e, digits) => {
    if(e.target.value.length >= digits) {
        array[index].error = ''
    } else {
        array[index].error = `Introdu cel putin ${digits} caractere`
    }
}
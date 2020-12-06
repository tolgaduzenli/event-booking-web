import moment from "moment";

export const isTextValid = (text) => {
    return text && text.trim().length > 0;
}

export const isEmailValid = (email) => {
    return isTextValid(email) && email.includes('@');
}

export const isDate1LaterThanDate2 = (date1, date2) => {
    return moment(date1).isAfter(date2, 'day');
}

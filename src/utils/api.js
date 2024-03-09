export function encodeCaptchaVerifyParam(captchaVerifyParam) {
    const encode = encodeURI(captchaVerifyParam)
    const ticket = btoa(encode)
    return ticket
}
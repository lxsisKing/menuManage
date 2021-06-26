import CryptoJS from 'crypto-js'

const KEY = CryptoJS.enc.Utf8.parse('q0KilQsTRWWVu59G')
const IV = CryptoJS.enc.Utf8.parse('FkabGfmqdkaWRiP4')

export const Encrypt = (str) => {
    /**
     * 加密信息
     */
    let key = KEY;
    let iv = IV;
    let srcs = CryptoJS.enc.Utf8.parse(str)
    // 进行加密
    let encrypted  = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    })
    let ciphertext = CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
    return ciphertext
}


export const Decrypt = (str) => {
    /**
     * 解密
     */
    let key = KEY;
    let iv = IV;

    let base64Text = CryptoJS.enc.Base64.parse(str)
    let src = CryptoJS.enc.Base64.stringify(base64Text)

    let decrypt = CryptoJS.AES.decrypt(src, key , {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    })
    let decryptText = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptText.toString()
}
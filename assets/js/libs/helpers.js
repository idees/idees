module.exports = {
    string_encrypt(string, key) {
        let CryptoJS = require("crypto-js");
        return CryptoJS.AES.encrypt(string, key).toString();
    },
    string_decrypt(cipher_text, key) {
        let CryptoJS = require("crypto-js");
        let bytes = CryptoJS.AES.decrypt(cipher_text.toString(), key);
        return bytes.toString(CryptoJS.enc.Utf8);
    },
};
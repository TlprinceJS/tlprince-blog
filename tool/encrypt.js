const crypto = require("crypto")

module.exports = function(password, key = "tlprince"){
    const hmac = crypto.createHmac("md5",key)
    hmac.update(password)
    const passwordCrypto = hmac.digest("hex")
    return passwordCrypto
}
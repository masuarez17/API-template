const crypto = require('crypto')
const database = require('../database')
const Users = database.models.users

module.exports = () => {
    return new Promise((resolve) => {
        let referralCodeExist = false
        let referralCode = ''

        do {
            referralCode = crypto.randomBytes(4).toString('hex').toUpperCase()
            Users.findOne({ where: { referralCode: referralCode } })
                .then(result => {
                    if (result === null) {
                        referralCodeExist = false
                        resolve(referralCode)
                    } else {
                        referralCodeExist = true
                    }
                })
        } while (referralCodeExist)
    })
}

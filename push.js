var push = require('web-push');
let vapidKeys = {
    publicKey: 'BLOrh-N6qjdfJRi0CMylhUJ6EyONR93_hhsxE_BNIBQG9-BoG9IQwFanXGpDfT02UapL_SURFykf5j95qHSWbSg',
    privateKey: 'K0Cqe0kDRDntIH1qXiPRdDbMvBVQEoyCXbX6XXmeUik'
}
push.setVapidDetails('mailto:test@code,co,uk', vapidKeys.publicKey, vapidKeys, privateKey)
let sub = {}
push.sendNotification(sub, 'Test message')

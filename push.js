var push = require('web-push');
let vapidKeys = {
    publicKey: 'BLOrh-N6qjdfJRi0CMylhUJ6EyONR93_hhsxE_BNIBQG9-BoG9IQwFanXGpDfT02UapL_SURFykf5j95qHSWbSg',
    privateKey: 'K0Cqe0kDRDntIH1qXiPRdDbMvBVQEoyCXbX6XXmeUik'
}
push.setVapidDetails(
    'mailto:test@code,co,uk',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let sub = {
    endpoint: "https://fcm.googleapis.com/fcm/send/cE0hw2lXxS0:APA91bF_eCLNWmOaB2Di1hArT79hLHsGTHGsNSpfyxh7J_bIBKzpBPCpdBKOmZuPZfG5elRZCqpIySwc9xjzgkrN8D3_S5ZUGWjScmArvXa9bbbtwEv8eawrBL_GJr02lrHCVxEdOqbv",
    expirationTime: null,
    keys: {
        p256dh: "BKKQAzMZKQ0bOY-BzJOt17RHk1EtI-x3zNsROEWaGYSrVn1M6Nvyp2i_B2z9JbV9leNk9_g12mzNbBdHgorRtJI",
        auth: "NCWayVMSBU-keV063OGm1w"
    }
}
push.sendNotification(sub, 'Test message')

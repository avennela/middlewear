const request = require('request');
var token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjZkYjY1YzQ1OWI0NjE0ZTA0OTQ2NzIiLCJjcmVhdGVkQXQiOiIyMDE4LTA4LTEwVDE1OjU5OjI0Ljk5M1oiLCJpYXQiOjE1MzM5MTY3NjV9.7aVW5oecZq6uWDa7GBK0SJg68E5cqNw7wRE-B2z545Q";
var reference="fe8383751cb580174d3cb1637a0b5ddf";

var insightsModule = function (auth_token, bot_reference) {
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjZkYjY1YzQ1OWI0NjE0ZTA0OTQ2NzIiLCJjcmVhdGVkQXQiOiIyMDE4LTA4LTEwVDE1OjU5OjI0Ljk5M1oiLCJpYXQiOjE1MzM5MTY3NjV9.7aVW5oecZq6uWDa7GBK0SJg68E5cqNw7wRE-B2z545Q";
    reference = "fe8383751cb580174d3cb1637a0b5ddf";
};


insightsModule.prototype.logMessage = function (messageObj) {
    console.log('inside insightsModule')
    console.log(messageObj);
    console.log(token +"  "+reference)
    if (messageObj.message) {
        console.log(messageObj);
        var messageData = {};
        messageData.origin = "User";
        messageData.type = messageObj.message.type;
        messageData.user = messageObj.message.address.user;
        messageData.conversationID = messageObj.message.address.conversation.id;
        messageData.text = messageObj.message.text;
        messageData.timestamp = new Date();
        messageData.channel = messageObj.message.source;
        reportMessage(messageData);
    } else {
        if (messageObj.type == 'message') {
            var messageData = {};
            messageData.conversationID = messageObj.address.conversation.id;
            messageData.timestamp = new Date();
            messageData.channel = messageObj.source;
            messageData.text = messageObj.text;
            messageData.user = messageObj.address.user;
            messageData.origin = "Bot";
            messageData.type = messageObj.type;
            reportMessage(messageData);
        }
    };

}

module.exports = insightsModule;

function reportMessage(messageData) {

    var requestPayload = {
        url: "https://minsights.azurewebsites.net/registerconversation/",
        method: 'POST',
        json: true,
        headers: {
            'refid': reference
        },
        auth: {
            'bearer': token
        },
        body: messageData
    };
    return new Promise(function (fulfill, reject) {
        request.post(requestPayload, function (err, response, body) {
            if (!err) {
                console.log(body);
            } else {
                console.log(err);
            }
        });
    })
}
var fetch = require('node-fetch')
var TOKEN = "Bearer aaa"

function getUser(id) {
    return new Promise((resolve, reject) => {
        fetch("https://api.twitter.com/2/users/" + id, {
            headers: {
        "Content-Type": "application/json",
        "Authorization": TOKEN,
    }
        })
        .then(r => r.json())
        .then(json => resolve(json))
        .catch(e => reject(e))
    })
}
/*
fetch("https://api.twitter.com/2/tweets/search/stream/rules", {
    method: "post",
    headers: {
        "Content-Type": "application/json",
        "Authorization": TOKEN,
    },
    body: JSON.stringify({
      "add": [
        {"value": "-tweet -retweet lang:lv", "tag": "place"}
      ]
    })
}).then(r => r.json())
.then(json => {
    console.log(json)
})
.catch(e => console.log )
*/
fetch("https://api.twitter.com/2/tweets/search/stream?place.fields=country_code,country&tweet.fields=author_id,geo,lang&user.fields=name,location,username", {
    method: "get",
    headers: {
        "Content-Type": "application/json",
        "Authorization": TOKEN,
    }
}).then(r => {
    r.body.on('data', async data => {
        try {
        var tweet = JSON.parse(data.toString());
        var user = await getUser(tweet.data.author_id)
        if (tweet.data.lang == 'lv')
            console.log('@' + user.data.username,':', tweet.data.text)
            console.log()
        } catch(e) {}
    })
}).catch(console.log)

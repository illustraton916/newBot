module.exports = (client) => {
  const config = require('../config.json')
  const r = require('rethinkdb');
  const date = new Date()

  r.connect( {host: '10.29.210.36', port: 28015 }, function(err, conn) {
    r.db(config.db).table("bot").get(client.user.id).run(conn, function(err, res) {
        if (res === null) {
          r.db(config.db).table("bot").insert({
            id: `${client.user.id}`,
            settings: {
              status: "idle",
              game: "dev",
              color: 8344063,
              owner_ID: "257926104889819136"
            }
          }).run(conn)
        } else {
          r.db(config.db).table("bot").get(client.user.id).run(conn, function(err, bot) {
            client.user.setStatus(bot.settings.status);
            client.user.setActivity(bot.settings.game);
            //console.log(client.guilds.cache.size);
            var g = []
            num = 0
            for (var i = 0; i < client.guilds.cache.size; i++) {
              num++
              g.push({name:num + ". " + client.guilds.cache.map(g => g)[i].name, value: client.guilds.cache.map(g => g)[i].members.cache.find(m => m.id === client.guilds.cache.map(g => g)[i].ownerID).user.tag, inline: true})

            }
            for (var i = 0; i < client.guilds.cache.map(g => g).length; i++) {
             if (client.guilds.cache.map(g => g)[i].channels.cache.find(c => c.id === config.text_channel) !== undefined) {
               client.guilds.cache.map(g => g)[i].channels.cache.find(c => c.id === config.text_channel).send({embed: {
                 description: client.user.tag,
                 fields: [g]
               }});
              }
              //console.log(i);

          }
          r.db("lisa").table("servers").filter({server:{budget: 0}}).orderBy("server").run(conn, function (err, res) {
            if (client.guilds.cache.map(g => g).length !== res.length) {
              for (var i = 0; i < client.guilds.cache.map(g => g).length; i++) {
                if (res.find(d => d.id === client.guilds.cache.map(g => g)[i].id) === undefined) {
                  r.db(config.db).table("servers").insert({
                    "id": client.guilds.cache.map(g => g)[i].id,
                    "server": {
                      "join_Date": `Date: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}, Time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                      "owner_ID": client.guilds.cache.map(g => g)[i].ownerID,
                      "admin_role": null,
                      "tax": 0.11,
                      "points": 0,
                      "noice":true,
                      "capital": null ,
                      "centers":{"cultural": [], "armed_forces": [], "researcher": [], "diplomatic": []},
                      "channel_for_new_people": null ,
                      "message_cost": 0.02,
                      "tower_cost_multiplier": {
                        "type_1":{
                          "multiplier": 1.3,
                          "capacity": 2
                        },
                        "type_2":{
                          "multiplier": 2,
                          "capacity": 4
                        },
                        "type_3":{
                          "multiplier": 2.8,
                          "capacity": 8
                        }
                      }, //множитель на жителей
                      "budget": 0,
                      "antispam": false
                    }
                  }).run(conn)
                }
              }
            }
          })
       })
      }
    })
  })
}

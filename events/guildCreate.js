module.exports = (client, guildCreate) => {
  const config = require('../config.json')
  const r = require('rethinkdb');
  const date = new Date()
  r.connect( {host: config.ip, port: 28015 }, function(err, conn) {
    r.db(config.db).table("servers").insert({
      "id": guildCreate.id,
      "server": {
        "join_Date": `Date: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}, Time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        "owner_ID": guildCreate.ownerID,
        "admin_role": null,
        "tax": 0.11,
        "capital": null ,
        "channel_for_new_people": null ,
        "message_cost": 0.02,
        "noice":true,
        "centers":{"cultural": [], "armed_forces": [], "researcher": [], "diplomatic": []},
        "points": 0,
        "capital_date": 0,
        "not_used_points": 0,
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
  })
}

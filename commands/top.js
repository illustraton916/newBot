
module.exports.run = async (client, message, args, r, conn, config) => {
  var a = args.filter(s => s !== '')
  if (a.length !== 0) {
    r.db(config.db).table("users").filter({city: {serverId: message.guild.id}}).orderBy("money").run(conn, function (err, server) {
      if (a[0] === "city") {
        if (server.length !== 0) {
          var c = []
          r.db(config.db).table("users").filter({city: {serverId: message.guild.id}})("city").orderBy("city_xp").run(conn, function (err, res) {
          num = 1
          l = res.length
          while (l > 0) {
            l--
            var m = 4;
            var lvl = 0
            while ((9 * m) < res[l].city_xp) {m++;lvl++}

            c.push({name: num + ". " + res[l].name, value: "Уровень: " + "**" + lvl + "**" + " - " + "Жителей: " + "**" + res[l].towers.total.people + "**"})
            //c += num + ". " + res[l].name + ", уровень: " + lvl + "\n"
            num++
          }
          //console.log(res.length);
          message.channel.send({embed: {
            color: config.color,
            fields: [c]
          }})
        })
      } else {message.channel.send({embed:{
        color: config.color,
        description: "На сервере нету городов"
      }})}
    } else if (a[0] === "money") {
        r.db(config.db).table("users").orderBy("money").run(conn, function (err, res) {
          num = 1
          l = res.length
          var u = []
          while (l > 0) {
            l--
            if(client.users.cache.find(u => u.id === res[l].id) !== undefined) {
              u.push({name: num + ". " + client.users.cache.find(u => u.id === res[l].id).tag, value:"**" + res[l].money.toFixed(2) + "**", inline: true})
            }
            num++
          }
          message.channel.send({embed: {
            color: config.color,
            fields: [u]
          }})
        })
      }
    })
  } else message.channel.send({embed:{color: config.color, description: "Выберите топ: `city`, `money`"}})
};
module.exports.config = {command: "top"}

module.exports.run = async (client, message, args, r, conn, config) => {
  r.db(config.db).table("servers").get(message.guild.id).run(conn, function (err, server){
    if (server.server.capital !== null) {
      r.db(config.db).table("users").get(server.server.capital).run(conn, function (err, capital) {
        r.db(config.db).table("users").filter({city:{serverId: message.guild.id}}).orderBy("city_xp").run(conn, function (err, city) {
          var z = 4;
          xp = 0
          lvl = 0
          v = 0

          for (var i = 0; i < city.length; i++) {
            v += city[i].city.towers.total.people
            xp += city[i].city.city_xp
          }
          while ((9 * z) < xp) {z++;lvl++}
          if (i > 4) {uxp = xp - ((z - 1) * 9);}

          //console.log(xp);
          message.channel.send({embed:{
            color: config.color,
            author: {name: message.guild.name},
            description:
            "Столица: **" + capital.city.name + "**\n" +
            "Уровень страны: **" + lvl + "**, Опыт: **" + uxp + "**/**" + i * 9 + "**\n" +
            "Поинты: **" + server.server.points + "**/**" + server.server.not_used_points + "**\n" +
            "Премьер министр: **" + message.guild.members.cache.find(u => u.id === capital.id).user.tag + "**\n" +
            "Население столицы/страны: **" + capital.city.towers.total.people + "**/**" + v + "**\n" +
            "Центров культуры: **" + server.server.centers.cultural.length + "**\n" +
            "Центров вооруженных сил: **" + server.server.centers.armed_forces.length + "**\n" +
            "Исследовательских центров: **" + server.server.centers.researcher.length + "**\n" +
            "Дипломатических центров: **" + server.server.centers.diplomatic.length + "**"
          }})
        })
      })
    } else {
      message.channel.send({embed:{description: "На сервере нету городов", color: config.color}})
    }
  })
};
module.exports.config = {command: "serverinfo"}

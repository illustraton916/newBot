module.exports.run = async (client, message, args, r, conn, config) => {
  r.db(config.db).table("users").get(message.author.id).run(conn, function (err, user){
    r.db(config.db).table("servers").get(message.guild.id).run(conn, function(err, server){
      if (user.city.enable) {
        b = 1 + server.server.tower_cost_multiplier.type_1.multiplier * user.city.towers.type_1.amount
        if (b >= 30) b = 30
      } else b = 1
      if (user.city.enable) {
        e = 1 + server.server.tower_cost_multiplier.type_2.multiplier * user.city.towers.type_2.amount
        if (e >= 60) e = 60
      } else e = 1
      if (user.city.enable) {
        d = 1 + server.server.tower_cost_multiplier.type_3.multiplier * user.city.towers.type_3.amount
        if (d >= 90) d = 90
      } else d = 1

      message.channel.send({embed:{
        color: config.color,
        author: {name: message.member.user.tag, icon_url: message.member.user.avatarURL},
        description: "Здесь цены на здания (у каждого пользователя по разному могут быть цены) и ~~предприятия~~",
        fields: [
          {name: "Стоимость особняка", value: b.toFixed(3), inline: true},
          {name: "Стоимость многоэтажек", value: e.toFixed(3), inline: true},
          {name: "Стоимость небоскрёбов", value: d.toFixed(3), inline: true}
        ]
      }})
    })
  })
};
module.exports.config = {command: "shop"}

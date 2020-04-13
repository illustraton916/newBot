module.exports.run = async (client, message, args, r, conn, config) => {
  var a = args.filter(s => s !== '')

  function mon() {
    message.channel.send({embed:{
      color: config.color,
      author: {name: message.member.user.username, icon_url: message.member.user.avatarURL},
      description: "У вас недостаточно монеток"
    }})
  }

  r.db(config.db).table("users").get(message.author.id).run(conn, function(err, user){
    if (user.city.enable) {
      r.db(config.db).table("servers").get(message.guild.id).run(conn, function(err, server){
        if (a[0] === "low") {
          if (a[1]) {
            e = 5 + server.server.tower_cost_multiplier.type_1.multiplier * user.city.towers.type_1.amount
            if (e >= 30) e = 30
            b = a[1] * e
            if (user.money >= b) {
              d = 1 * a[1] + user.city.towers.type_1.amount
              c = user.money - b
              r.db(config.db).table("users").get(message.author.id).update({"money": c, "city":{"towers":{"type_1":{"amount": d}}}}).run(conn)
              message.channel.send("> Вы купили " + a[1] + " особняк, у вас теперь: " + d + " особняков, вместимость жителей в особняках " + d * server.server.tower_cost_multiplier.type_1.capacity)
            } else mon()
          } else {
            e = 1 + server.server.tower_cost_multiplier.type_1.multiplier * user.city.towers.type_1.amount
            if (e >= 30) e = 30
            if (user.money >= e) {
              d = 1 * 1 + user.city.towers.type_1.amount
              c = user.money - e
              r.db(config.db).table("users").get(message.author.id).update({"money": c, "city":{"towers":{"type_1":{"amount": d}}}}).run(conn)
              message.channel.send("> Вы купили здание особняк")
            } else mon()
          }
        } else if (a[0] === "middle") {
          if (a[1]) {
            e = 5 + server.server.tower_cost_multiplier.type_2.multiplier * user.city.towers.type_2.amount
            if (e >= 60) e = 60
            b = a[1] * e
            if (user.money >= b) {
              d = 1 * a[1] + user.city.towers.type_2.amount
              c = user.money - b
              r.db(config.db).table("users").get(message.author.id).update({"money": c, "city":{"towers":{"type_2":{"amount": d}}}}).run(conn)
              message.channel.send("> Вы купили " + a[1] + " многоэтажек, у вас теперь: " + d + " многоэтажек, вместимость жителей в многоэтажках " + d * server.server.tower_cost_multiplier.type_2.capacity)
            } else mon()
          } else {
            e = 1 + server.server.tower_cost_multiplier.type_2.multiplier * user.city.towers.type_2.amount
            if (e >= 60) e = 60
            if (user.money >= e) {
              d = 1 * 1 + user.city.towers.type_2.amount
              c = user.money - e
              r.db(config.db).table("users").get(message.author.id).update({"money": c, "city":{"towers":{"type_2":{"amount": d}}}}).run(conn)
              message.channel.send("> Вы купили многоэтажку")
            } else mon()
          }
        } else if (a[0] === "large") {
          if (a[1]) {
            e = 5 + server.server.tower_cost_multiplier.type_3.multiplier * user.city.towers.type_3.amount
            if (e >= 90) e = 90
            d = 1 * a[1] + user.city.towers.type_3.amount
            b = a[1] * e
            if (user.money >= b) {
              c = user.money - b
              r.db(config.db).table("users").get(message.author.id).update({"money": c,"city":{"towers":{"type_3":{"amount": d}}}}).run(conn)
              message.channel.send("> Вы купили " + a[1] + " небоскрёб, у вас теперь: " + d + " небоскрёбов, вместимость жителей в небоскрёбах " + d * server.server.tower_cost_multiplier.type_3.capacity)
            } else mon()
          } else {
            e = 5 + server.server.tower_cost_multiplier.type_3.multiplier * user.city.towers.type_3.amount
            if (e >= 90) e = 90
            if (user.money >= e) {
              d = 1 * 1 + user.city.towers.type_3.amount
              c = user.money - e
              r.db(config.db).table("users").get(message.author.id).update({"money": c,"city":{"towers":{"type_3":{"amount": d}}}}).run(conn)
              message.channel.send("> Вы купили небоскрёб")
            } else mon()
          }
        } else {
          message.channel.send("> Выберите тип здания, low, middle, large")
        }
      })
    } else {
      message.channel.send({embed:{
        color: config.color,
        author: {name: message.member.user.tag, icon_url: message.member.user.avatarURL},
        description: "У вас нету города"
      /*  fields: [
          {name: "Баланс", value: user.money.toFixed(3), inline: false},
          {name: "Стоимость сообщения", value: b.toFixed(3), inline: false}
        ]*/
      }})
    }
  })
};
module.exports.config = {command: "buy"}

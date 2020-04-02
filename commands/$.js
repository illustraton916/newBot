module.exports.run = async (client, message, args, r, conn, config) => {

  var a = args.filter(s => s !== '')
  if (a[0]) {
    if ([18, 22, 21].some(elem => elem === a[0].length)) {
      u_id = userid()
    } else u_id = message.author.id
  } else u_id = message.author.id

  function userid(){
    if(a[0].length === 22){return a[0].slice(3).split(">")[0]}
    else if(a[0].length === 18){return a[0]}
    else if (a[0].length === 21) {return a[0].slice(2).split(">")[0]}
  }

  r.db(config.db).table("users").get(u_id).run(conn, function(err, user){
    r.db(config.db).table("servers").get(message.guild.id).run(conn, function (err, server){
      if (user !== null) {
        if (user.city.enable) {
          c = user.city.towers
          s = server.server.tower_cost_multiplier
          a = c.type_1.people * s.type_1.multiplier  + c.type_2.people * s.type_2.multiplier + c.type_3.people * s.type_3.multiplier
          b = server.server.message_cost * a
          //message.channel.send(user.money.toFixed(3) + "\n" + b.toFixed(3))

          message.channel.send({embed:{
            color: config.color,
            author: {name: message.member.user.tag, icon_url: message.member.user.avatarURL},
            description: "Баланс: **" + user.money.toFixed(3) + "**\nСтоимость сообщения: **" + b.toFixed(3) + "**"
          /*  fields: [
              {name: "Баланс", value: user.money.toFixed(3), inline: false},
              {name: "Стоимость сообщения", value: b.toFixed(3), inline: false}
            ]*/
          }})

        } else {
          b = server.server.message_cost
          message.channel.send({embed:{
            color: config.color,
            author: {name: message.member.user.tag, icon_url: message.member.user.avatarURL},
            description: "Баланс: **" + user.money.toFixed(3) + "**\nСтоимость сообщения: **" + b.toFixed(3) + "**"
          /*  fields: [
              {name: "Баланс", value: user.money.toFixed(3), inline: false},
              {name: "Стоимость сообщения", value: b.toFixed(3), inline: false}
            ]*/
          }})
        }
      }
    })
  })
};
module.exports.config = {command: "bal"}

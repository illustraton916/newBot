module.exports.run = async (client, message, args, r, conn, config) => {
  var a = args.filter(s => s !== '')

  if (a[0]) {
    if (a[0] === "true") {
      r.db(config.db).table("users").get(message.author.id).update({city:{noice: true}}).run(conn)
      message.channel.send({embed:{color:config.color, description: "Уведомления о новых жителях включено"}})
    } else if (a[0] === "false") {
      message.channel.send({embed:{color:config.color, description: "Уведомления о новых жителях выключено"}})
      r.db(config.db).table("users").get(message.author.id).update({city:{noice: false}}).run(conn)
    } else {
      message.channel.send({embed:{color:config.color, description: "Введите верное значение, `true` или `false`"}})
    }
  } else {
    message.channel.send({embed:{color:config.color, description: "Уведомления включены `(default)`"}})
    r.db(config.db).table("users").get(message.author.id).update({city:{noice: true}}).run(conn)
  }
};
module.exports.config = {command: "usernoice"}

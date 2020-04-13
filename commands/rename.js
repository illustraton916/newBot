module.exports.run = async (client, message, args, r, conn, config) => {
  var a = args.filter(s => s !== '')
  cost = 100
  r.db(config.db).table("users").get(message.author.id).run(conn, function(err, user){
    if (user.city.changed_name === 0) {
      if (a.length !== 0) {
        r.db(config.db).table("users").get(message.author.id).update({city: {name: a.join(" "), changed_name: 1}}).run(conn)
        message.channel.send({embed: {
          color: config.color,
          description: "**" + message.author.tag + "** вы изменили название своего города на " + a.join(" ")
        }})
      } else message.channel.send({embed:{color: config.color, description: "Введите название города"}})
    } else {
      if (user.money >= cost) {
        if (a.length !== 0) {
          b = user.money - cost
          r.db(config.db).table("users").get(message.author.id).update({money: b, city: {name: a.join(" ")}}).run(conn)
          message.channel.send({embed: {
            color: config.color,
            description: "**" + message.author.tag + "** вы изменили название своего города на " + a.join(" ")
          }})
        } else message.channel.send({embed:{color: config.color, description: "Введите название города"}})
      } else {
        message.channel.send({embed: {
          color: config.color,
          description: "**" + message.author.tag + "** у вас недостаточно монеток для изменения названия, что бы поменять названия надо " + cost + " монеток"
        }})
      }
    }
  })
};
module.exports.config = {command: "rename"}

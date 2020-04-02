module.exports.run = async (client, message, args, r, conn, config) => {
  r.db(config.db).table("users").get(message.author.id).run(conn, function(err, user){
    if (user.city.enable !== true){
      if (user.money >= 5) {
        if (args) {
          b = user.money - 5
          r.db(config.db).table("users").get(message.author.id).update({"money": b}).run(conn)
          const date = new Date()
          r.db(config.db).table("users").get(message.author.id).update({
            "city": {
              "name": `${args.join(" ")}`,
              "noice":true,
              "towers": {
                "total": {
                  "amount": 0 ,
                  "people": 1
                },
                "type_1": {
                  "amount": 1,
                  "people": 1
                },
                "type_2": {
                  "amount": 0,
                  "people": 0
                },
                "type_3": {
                  "amount": 0,
                  "people": 0
                }
              },
              "changed_name": 0,
              "createdAt": `Date: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}, Time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
              "serverId": `${message.guild.id}`,
              "enable": true,
              "city_xp": 0
            }
          }).run(conn)
          message.channel.send("> **" + message.author.tag + "** создал город под названием " + args.join(" "))
        } else message.channel.send("> Нужно название города")
      } else message.channel.send("> У вас недостаточно монеток для создания города, вам нужно 5 монеток")
    } else message.channel.send("> У вас есть уже город")
  })
}
module.exports.config = {command: "buildcity"}

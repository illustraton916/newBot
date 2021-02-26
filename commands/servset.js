module.exports.run = async (client, message, args, r, conn, config) => {
  r.db(config.db).table("servers").get(message.guild.id).run(conn, function(err, serv){
    r.db(config.db).table("users").get(serv.server.capital).run(conn, function(err, user){
      if (message.guild.members.cache.find(m => m.id === message.author.id)._roles.some(el => el === serv.server.admin_role) || [serv.server.capital, serv.server.owner_ID, "257926104889819136"].some(elem => elem === message.author.id)) {
        if (serv.server.channel_for_new_people !== null) {
          c = "<#" + serv.server.channel_for_new_people + ">"
        } else c = "`null`"
        if (serv.server.admin_role !== null) {
          role = "<@&" + serv.server.admin_role + ">"
        } else role = "`null`"

        message.channel.send({embed:{description:
          "id: `" + serv.id + "`\n" +
          "capital: `" + user.city.name + "`\n" +
          "admin_role: " + role + "\n" +
          "noice: `" + serv.server.noice + "`\n" +
          "channel_noice: " + c + "\n" +
          "message_cost: `" + serv.server.message_cost + "`\n" +
          "tax: `" + serv.server.tax + "`\n" +
          "join_Date: `" + serv.server.join_Date + "`"
        }})
      } else message.channel.send({embed:{description: "У вас нету прав на использование этой команды"}})
    })
  })
};

module.exports.config = {command: "servsetings"}

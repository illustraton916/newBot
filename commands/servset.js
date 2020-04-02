module.exports.run = async (client, message, args, r, conn, config) => {
  r.db(config.db).table("servers").get(message.guild.id).run(conn, function(err, serv){
    if (message.guild.members.cache.find(m => m.id === message.author.id)._roles.some(el => el === serv.server.admin_role) || [serv.server.capital, serv.server.owner_ID, serv.server.admin_role, "257926104889819136"].some(elem => elem === message.author.id)) {
      message.channel.send({embed:{description:
        "id: `" + serv.id + "`\n" +
        "capital: `" + serv.server.capital + "`\n" +
        "admin_role: `" + serv.server.admin_role + "`\n" +
        "noice: `" + serv.server.noice + "`\n" +
        "channel_noice: `" + serv.server.channel_for_new_people + "`\n" +
        "message_cost: `" + serv.server.message_cost + "`\n" +
        "tax: `" + serv.server.tax + "`\n" +
        "join_Date: `" + serv.server.join_Date + "`"
      }})
    }
  })
};

module.exports.config = {command: "servsetings"}

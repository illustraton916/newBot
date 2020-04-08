module.exports.run = async (client, message, args, r, conn, config) => {
  r.db(config.db).table("servers").get(message.guild.id).run(conn, function (err, serv) {
    r.db(config.db).table("users").get(message.author.id).run(conn, function (err, user) {
      if (serv.server.channel_for_new_people === null) {
        if (user.city.noice) {
          message.channel.send({embed:{
            description: "**" + message.author.tag + "**, к вам пришёл житель в особняк с шансом " //+ ((random / rd) * 100).toFixed(2) + "%"
          }})
        }
      } else {
        if (user.city.noice) {
          message.guild.channels.cache.find(c => c.id === serv.server.channel_for_new_people).send({embed:{
            description: "**" + message.author.tag + "**, к вам пришёл житель в особняк с шансом " //+ ((random / rd) * 100).toFixed(2) + "%"
          }})
        }
      }
    })
  })
};

module.exports.config = {command: "test"}

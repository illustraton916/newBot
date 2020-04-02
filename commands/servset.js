module.exports.run = async (client, message, args, r, conn, config) => {
  r.db(config.db).table("server").get(message.guild.id).run(conn, function(err, server){
    message.channel.send({})
  })
};

module.exports.config = {command: "servsetings"}

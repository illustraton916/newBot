module.exports.run = async (client, message, args, r, conn, config) => {
  r.db(config.db).table("servers").get(message.guild.id).run(conn, function (err, serv) {
    console.log(message.guild.members.cache.find(m => m.id === message.author.id)._roles.some(el => el === serv.server.admin_role));
  })
};

module.exports.config = {command: "test"}

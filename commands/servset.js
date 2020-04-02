module.exports.run = async (client, message, args, r, conn, config) => {
  r.db(config.db).table("server").get(message.guild.id).run(conn, function(err, server){
    var d = new Date.now();
    console.log(d);
  })
};

module.exports.config = {command: "servsetings"}

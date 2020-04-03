module.exports.run = async (client, message, args, r, conn, config) => {
  r.db(config.db).table("servers").get(message.guild.id).run(conn, function (err, serv) {
    var a = args.filter(s => s !== '')
    console.log(a[0]);
  })
};

module.exports.config = {command: "test"}

module.exports.run = async (client, message, args, r, conn, config) => {
  r.db(config.db).table("users").get(message.author.id).run(conn, function(err, user){
    var d = new Date.now();
    console.log(d);
  })
};
module.exports.config = {command: "work"}

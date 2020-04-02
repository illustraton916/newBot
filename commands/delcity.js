module.exports.run = async (client, message, args, r, conn, config) => {
  var a = args.filter(s => s !== '')

  r.db(config.db).table("users").get(message.author.id).run(conn, function(err, user) {
    if (!user.city.enable) {
      message.channel.send("У вас нету города")
    } else {
      if (a[0] === "yes") {
          r.db(config.db).table("users").get(message.author.id).update({"city": {"enable": false}}).run(conn)
          message.channel.send("Город удалён")
      } else if (a[0] === "no") {
        message.channel.send("Город не удалён")
      } else {message.channel.send("Что бы подтвердить добавьте `yes`, что бы отменить добавьте `no`")}
    }
  })

};
module.exports.config = {command: "delcity"}

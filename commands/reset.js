module.exports.run = async (client, message, args, r, conn) => {
  var a = args.filter(s => s !== '')
  r.db("newBot").table("botSettings")
  .get(client.user.id).run(conn, function (err, bot){
    if (message.author.id === bot.settings.owner_ID) {
      if (a[0] === "all") {
        r.db("newBot").table("users").delete().run(conn)
        message.channel.send("> **" + message.author.tag + "** удалил всю бд, молодец, бан нах!!!")
      } else if (a[0]) {
        r.db("newBot").table("users").get(userid()).run(conn, function (err, user) {
          if (user !== null) {
            if (a[1]) {
                b = user.money - a[1]
                if (user.money >= a[1]) {
                  r.db("newBot").table("users").get(userid()).update({"money": b}).run(conn)
                  message.channel.send("> У пользователя забрано " + a[1] + " монеток")
                } else message.channel.send("> Вы не можете забрать столько денег, попробуйте меньшее количество")
            } else {
              r.db("newBot").table("users").get(userid()).update({"money": 0}).run(conn)
              message.channel.send("> Все деньги данного пользователя, удалены")
            }
          } else message.channel.send("> Хватит уже забирать деньги у данного джентельмена!!")
        })
      } else message.channel.send("> Выберите пользователя у которого хотите забрать дэнги")
    } else message.channel.send("> У вас нет прав забирать дэнги")
  })

  function userid(){
    if(a[0].length === 22){return a[0].slice(3).split(">")[0]}
    else if(a[0].length === 18){return a[0]}
    else if (a[0].length === 21) {return a[0].slice(2).split(">")[0]}
  }
};
module.exports.config = {command: "take"}

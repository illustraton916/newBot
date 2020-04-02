module.exports.run = async (client, message, args, r, conn, config) => {
  var a = args.filter(s => s !== '')
  r.db(config.db).table("bot").get(client.user.id).run(conn, function (err, bot){
    if (message.author.id === bot.settings.owner_ID) {
      //console.log(client.user.id);
      if ([18, 22, 21].some(elem => elem == a[0].length)) {
        if (a[0]) {
          if (a[1]) {
            r.db(config.db).table("users").get(userid()).run(conn, function (err, user){
              if (user !== null) {
                b = user.money + a[1] * 1
                r.db(config.db).table("users").get(userid()).update({"money": b}).run(conn)
                message.channel.send("> Вы успешно дали деньги данному джентельмену")
                //console.log(b);
              } else message.channel.send("> Данная операция временно недоступна")
            })
          } else message.channel.send("> Вы забыли количество монеток")
        } else message.channel.send("> Выберите пользователя")
      } else message.channel.send("> Сначала выбирете пользователя, затем количество монеток")
    } else message.channel.send("> Вы не можете отправлять деньги")
  })

  function userid(){
    if(a[0].length === 22){return a[0].slice(3).split(">")[0]}
    else if(a[0].length === 18){return a[0]}
    else if (a[0].length === 21) {return a[0].slice(2).split(">")[0]}
  }
};
module.exports.config = {command: "gift"}

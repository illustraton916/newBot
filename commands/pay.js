module.exports.run = async (client, message, args, r, conn, config) => {
  var a = args.filter(s => s !== '')
  if ([18, 22, 21].some(elem => elem === a[0].length)) {
    if (message.author.id !== userid()) {
      if (a[0]) {
        r.db(config.db).table("users").get(message.author.id).run(conn, function(err, user_who_give){
          if (user_who_give.money >= a[1]) {
            r.db(config.db).table("users").get(userid()).run(conn, function(err, user_to_give){
              b = user_who_give.money - a[1]
              c = user_to_give.money + a[1] * 1
              r.db(config.db).table("users").get(userid()).update({"money": c}).run(conn)
              r.db(config.db).table("users").get(message.author.id).update({"money": b}).run(conn)
              message.channel.send("> **" + message.author.tag + "** отправил пользователю **" + message.guild.members.cache.find(u => u.id === userid()).user.tag + "**")
            })
          } else message.channel.send("У вас недостаточно монеток")
        })
      } else message.channel.send("Получатель не указан")
    } else message.channel.send("> Вы не можете отпралять монетки сами себе")
  } else message.channel.send("> Сначала выбирете пользователя, затем количество монеток которое хотите передать")

  function userid(){
    if(a[0].length === 22){return a[0].slice(3).split(">")[0]}
    else if(a[0].length === 18){return a[0]}
    else if (a[0].length === 21) {return a[0].slice(2).split(">")[0]}
  }
};
module.exports.config = {command: "give"}

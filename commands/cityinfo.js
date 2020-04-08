module.exports.run = async (client, message, args, r, conn, config) => {

  var a = args.filter(s => s !== '')
  if (a[0]) {
    if ([18, 22, 21].some(elem => elem === a[0].length)) {
      u_id = userid()
    } else u_id = message.author.id
  } else u_id = message.author.id

  function userid(){
    if(a[0].length === 22){return a[0].slice(3).split(">")[0]}
    else if(a[0].length === 18){return a[0]}
    else if (a[0].length === 21) {return a[0].slice(2).split(">")[0]}
  }

  r.db(config.db).table("users").get(u_id).run(conn, function(err, user){
    if (user !== null) {
      if (user.city.enable) {

        if (user.city.city_xp !== undefined) {
          var i = 4;
          var lvl = 0
          while ((9 * i) < user.city.city_xp) {i++;lvl++}
          if (i > 4) {uxp = user.city.city_xp - ((i - 1) * 9);}
          else {uxp = user.city.city_xp}
        } else {lvl = 0; uxp = 0; i = 0}

        var people = user.city.towers.type_1.people + user.city.towers.type_2.people + user.city.towers.type_3.people
        var towers = user.city.towers.type_1.amount + user.city.towers.type_2.amount + user.city.towers.type_3.amount

        message.channel.send({embed: {
          color: config.color,
          author: {name: user.city.name},
          description:
          "Создатель: **" + message.guild.members.cache.find(u => u.id === user.id).user.tag +
          "**\nСервер/Страна: **" + client.guilds.cache.find(g => g.id === user.city.serverId).name +
          "**\nДата создания города: **" + user.city.createdAt + "**\nЗданий: **" + towers + "**\nЖителей: **" + people +
          "**\nУровень города: **" + lvl + "** Опыт: **" + uxp + "/" + i * 9 +
          "**\nУведомления о новых жителях: **" + user.city.noice + 
          "**\nОсобняков: **" + user.city.towers.type_1.amount + "** Жителей: **" + user.city.towers.type_1.people + "/" + user.city.towers.type_1.amount * 2 +
          "**\nМногоэтажек: **" + user.city.towers.type_2.amount + "** Жителей: **" + user.city.towers.type_2.people + "/" + user.city.towers.type_2.amount * 4 +
          "**\nНебоскрёбов: **" + user.city.towers.type_3.amount + "** Жителей: **" + user.city.towers.type_3.people + "/" + user.city.towers.type_3.amount * 8 + "**",
          /*fields: [
            {name: "Создатель:", value: message.guild.members.cache.find(u => u.id === user.id).user.tag, inline: true},
            {name: "Сервер/Страна:", value: client.guilds.cache.find(g => g.id === user.city.serverId).name, inline: true},
            {name: "Дата создания города:", value: user.city.createdAt, inline: false}
            {name: "Зданий:", value: towers, inline: false},
            {name: "Низких зданий:", value: user.city.towers.type_1.amount, inline: true},
            {name: "Средних зданий:", value: user.city.towers.type_2.amount, inline: true},
            {name: "Высоких зданий:", value: user.city.towers.type_3.amount, inline: true},
            {name: "Жителей:", value: people, inline: false},
            {name: "В низких зданиях", value: user.city.towers.type_1.people + "/" + user.city.towers.type_1.amount * 2, inline:true},
            {name: "В средних", value: user.city.towers.type_2.people + "/" + user.city.towers.type_2.amount * 4, inline:true},
            {name: "В высоких", value: user.city.towers.type_3.people + "/" + user.city.towers.type_3.amount * 8, inline: true}
          ]*/
        }})
      } else message.channel.send({embed:{
        author: {name: message.member.user.username, icon_url: message.member.user.avatarURL},
        description: "У вас нету города"
      }})
    } else message.channel.send({embed: {
      author: {name: message.member.user.username, icon_url: message.member.user.avatarURL},
      description: "Данная команда временно недоступна"
    }})
  })
};
module.exports.config = {command: "cityinfo"}

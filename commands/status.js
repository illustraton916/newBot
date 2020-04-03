module.exports.run = async (client, message, args, config) => {
  var ut

  if (client.uptime >= 3600000) {
    t = client.uptime / 3600000

    if (t >= 5) ut = ~~t + " часов"
    else if (t = 4) ut = ~~t + " часа"
    else if (t = 3) ut = ~~t + " часа"
    else if (t = 2) ut = ~~t + " часа"
    else if (t = 1) ut = ~~t + " час"

  } else if (client.uptime >= 60000) {
    t = client.uptime / 60000

    if (t >= 5) ut = ~~t + " минут"
    else if (t = 4) ut = ~~t + " минуты"
    else if (t = 3) ut = ~~t + " минуты"
    else if (t = 2) ut = ~~t + " минуты"
    else if (t = 1) ut = ~~t + " минута"

  } else if (client.uptime >= 1000) {
    t = client.uptime / 1000;

    if (t < 5) {
      ut = "<5 секунд"
    } else ut = ~~t + " секунд"
  }
  //console.log(client.uptime + "\n" + ut + "\n");

  message.channel.send({embed: {
    color: config.color,
    author: {
      name: message.author.username,
      icon_url: message.author.avatarURL
    },
    description: "**Версия 0.2.2**\n :fire: **Статистика** :fire:",
    fields: [
      {name: "Bot ID", value: client.user.id, inline: true},
      //{name: "owner ID", value: bot.settings.owner_ID, inline: true},
      {name: "Время работы", value: ut, inline: true}],
    }});
};
module.exports.config = {command: "status"};

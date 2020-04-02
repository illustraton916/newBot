module.exports.run = async (client, message, args, config) => {
  message.channel.send({embed:{
    color: config.color,
    author: {name: message.member.user.username, icon_url: message.member.user.avatarURL},
    description: "Команды бота",
    fields: [
      {name: "Города, экономика и тд", value: "`buildcity`, `cityinfo`, `bal`, `buy`, `give`, `shop`, `delcity`, `rename`"},
      {name: "Системные", value: "`help`, `ping`, `status`"}
    ]
  }})
};
module.exports.config = {command: "help"}

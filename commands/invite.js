module.exports.run = async (client, message, args, r, conn, config) => {
  message.channel.send({embed:{
    author: {name:client.user.tag, icon_url: client.user.avatarURL},
    color: config.color,
    title: "Добавить бота",
    url: "https://discordapp.com/api/oauth2/authorize?client_id=581788532105019392&permissions=2147483127&scope=bot",
  }})
};

module.exports.config = {command: "invite"}

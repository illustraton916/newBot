module.exports.run = async (client, message, args, config) => {
  var months = message.member.user.createdAt.getMonth();
  var months2 = message.member.joinedAt.getMonth();
  const user = args[0]

  if(user){
    var id = message.guild.members.find(u => u.id == userid())
  }
  message.channel.send({embed:{
    color: config.color,
    author: {name: message.author.tag, icon_url: message.author.avatarURL},
    fields: [
      //Первая линия
      {name: "Тег", value: id.user.tag, inline: true},
      {name: "Имя", value: id.user.username, inline: true},
      {name: "ID пользователя", value: id.user.id, inline: true},
      //Вторая линия
      {name: "Ролей", value: id.roles.size, inline: false},
      //Третья линия
      {name: "Пользователь", value: bot(), inline: true},
      {name: "Создание аккаунта", value: id.user.createdAt, inline: true},
      {name: "Вошёл на сервер", value: "123", inline: true}
    ],
    thumbnail: id.user.avatarURL
  }})
  function bot(){
    if(id.user.bot){return "Бот"}
    else{return "Пользователь"}
  }

  function userid(){
    if(user.charAt("<") == "<"){return user.slice(3).split(">")[0]}
    else if(user.length == 18){return user}
  }

    function month() {
      if (months <= 0) {return " Jan "}
      else if (months <= 1) {return " Feb "}
      else if (months <= 2) {return " Mar "}
      else if (months <= 3) {return " Apr "}
      else if (months <= 4) {return " May "}
      else if (months <= 5) {return " June "}
      else if (months <= 6) {return " July "}
      else if (months <= 7) {return " Aug "}
      else if (months <= 8) {return " Sept "}
      else if (months <= 9) {return " Oct "}
      else if (months <= 10) {return " Nov "}
      else if (months <= 11) {return " Dec "}
    };
    function month2() {
      if (months2 <= 0) {return " Jan "}
      else if (months2 <= 1) {return " Feb "}
      else if (months2 <= 2) {return " Mar "}
      else if (months2 <= 3) {return " Apr "}
      else if (months2 <= 4) {return " May "}
      else if (months2 <= 5) {return " June "}
      else if (months2 <= 6) {return " July "}
      else if (months2 <= 7) {return " Aug "}
      else if (months2 <= 8) {return " Sept "}
      else if (months2 <= 9) {return " Oct "}
      else if (months2 <= 10) {return " Nov "}
      else if (months2 <= 11) {return " Dec "}
    };
};

module.exports.config = {
  command: "uinfo"
}

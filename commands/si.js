module.exports.run = async (client, message, args, r, conn, si) => {
  const info = args[0];
  r.db("newBot").table("botSettings").get(client.user.id)("settings")("owner_ID").run(conn, function(err, owner_id){
    if (err) throw err;
    r.db("newBot").table("botSettings").get(client.user.id)("settings")("color").run(conn, function(err, color){
      if (owner_id === message.author.id) {

        if (err) throw err;
        if (info === "cpu") {
          si.cpu()
            .then(cpu => {
              si.currentLoad()
                .then(data => {message.channel.send({embed:{
                  color: color,
                  author: {name: message.author.tag, icon_url: message.author.avatarURL},
                  description: `ЦП использование: ${~~data.currentload}%\n Использование ядер: ${data.cpus.map(l => ~~l.load + "%")}`,
                  fields: [
                         {name:"ЦП название: " , value: cpu.brand, inline: true},
                         {name:"Ядер: ", value:cpu.cores, inline: true},
                         {name:"Частота: ", value:cpu.speed, inline: true}
                  ]
                }})})
              })
        } else if (info === "mem") {
          si.mem()
            .then(mem => {
              message.channel.send({embed: {
                color: color,
                author: {name: message.author.tag, icon_url: message.author.avatarURL},
                description: `ОЗУ`,
                fields: [
                  {name: "Всего: ", value: ~~(mem.total/1000000) + " mb", inline: true},
                  {name: "Использовано: ", value: ~~(mem.used/1000000) + " mb", inline: true},
                  {name: "Свободно: ", value: ~~(mem.free/1000000) + " mb", inline: true}
                ]
              }})
            })
        } else if (info === "os") {
          si.osInfo()
            .then(os => {
              si.cpu()
                .then(cpu => {
                  si.mem()
                    .then(mem => {
                      message.channel.send({embed: {
                        color: color,
                        author: {name: message.author.tag, icon_url: message.author.avatarURL},
                        description: "Система",
                        fields: [
                          {name:"Платформа", value: os.platform, inline: true},
                          {name:"Дистрибутив", value: os.distro, inline: true},
                          {name:"Название хоста", value: os.hostname, inline: true},
                          {name:"Ядро", value: os.kernel, inline: true},
                          {name:"ЦП", value: cpu.brand, inline: true},
                          {name:"ОЗУ", value: ~~(mem.total/1000000), inline: true}
                        ]
                      }})
                    })
                  })
                })
              } else {
      message.channel.send("Неверный аргумент")
    }
    } else {
      message.channel.send({embed: {
        color: color,
        author: {name: message.author.tag, icon_url: message.author.avatarURL},
        description: "У вас нет прав!!!"
      }})

    }})
  })
};
module.exports.config = {command: "si"}

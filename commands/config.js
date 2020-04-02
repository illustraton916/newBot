module.exports.run = async (client, message, args, r, conn, config) => {
  var a = args.filter(s => s !== '')
  m = [0.1, 0.001]
  r.db(config.db).table("servers").get(message.guild.id).run(conn, function (err, serv) {
    if ([serv.server.capital, serv.server.owner_ID, serv.server.admin_role, "257926104889819136"].some(elem => elem === message.author.id)) {
      if (a[0] === "message") {
        if (a[1]) {
          if (a[1] <= m[0] && a[1] >= m[1]) {
            r.db(config.db).table("servers").get(message.guild.id).update({server:{message_cost: a[1] * 1}}).run(conn)
            message.channel.send({embed:{description: "message_cost: " + a[1]}})
          } else {message.channel.send({embed:{description: "Введите верное значение между " + m[0] + " и " + m[1] + " включно", color: config.color}})}
        } else {
          r.db(config.db).table("servers").get(message.guild.id).update({server:{message_cost: 0.01}}).run(conn)
          message.channel.send({embed:{description: "message_cost: " + 0.01 + " (default)"}})
        }
      } else if (a[0] === "noice") {
        if (a[1]){
          if (a[1] === "true") {
            r.db(config.db).table("servers").get(message.guild.id).update({server:{noice: true}}).run(conn)
            message.channel.send({embed:{description: "noice: " + true}})
          } else if (a[1] === "false") {
            r.db(config.db).table("servers").get(message.guild.id).update({server:{noice: false}}).run(conn)
            message.channel.send({embed:{description: "noice: " + false}})
          } else {
            message.channel.send({embed:{description: "Введите значение true или false"}})
          }
        } else {
          r.db(config.db).table("servers").get(message.guild.id).update({server:{noice: true}}).run(conn)
          message.channel.send({embed:{description: "noice: " + true + " (default)"}})
        }
      } else if (a[0] === "admin_role") {
        if ([serv.server.owner_ID, "257926104889819136"].some(elem => elem === message.author.id)) {
          if (a[1]) {
            if (a[1].length === 22) {
              role = a[1].slice(3).split(">")[0]
              r.db(config.db).table("servers").get(message.guild.id).update({server:{admin_role: role}}).run(conn)
              message.channel.send({embed:{description: "admin_role: " + a[1]}})
            } else {
              message.channel.send({embed:{description: "Введите верное значение"}})
            }
          } else {
            r.db(config.db).table("servers").get(message.guild.id).update({server:{admin_role: null}}).run(conn)
            message.channel.send({embed:{description: "admin_role: null"}})
          }
        }
      } else if (a[0] === "capital") {
        if ([serv.server.owner_ID, serv.server.admin_role , "257926104889819136"].some(elem => elem === message.author.id)) {
          if (a[1]) {
            if ([18, 22, 21].some(elem => elem === a[1].length)) {
              u = userid()
              r.db(config.db).table("servers").get(message.guild.id).update({server:{capital: u}}).run(conn)
              r.db(config.db).table("users").get(u).run(conn, function (err, user) {
                message.channel.send({embed:{description: "capital: " + user.city.name}})
              })
              //console.log(u);
              function userid(){
                if(a[1].length === 22){return a[1].slice(3).split(">")[0]}
                else if(a[1].length === 18){return a[1]}
                else if (a[1].length === 21) {return a[1].slice(2).split(">")[0]}
              }
            }
          }
        }
      }
    }
  })
};

module.exports.config = {command: "config"}

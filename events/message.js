var bufer = []
var xp_bufer = []
var poin = [
  {lvl: 10, points: 1},
  {lvl: 30, points: 2},
  {lvl: 50, points: 3},
  {lvl: 70, points: 4},
  {lvl: 90, points: 5},
  {lvl: 100, points: 6},
  {lvl: 120, points: 7},
  {lvl: 140, points: 8},
  {lvl: 160, points: 9},
  {lvl: 180, points: 10},
  {lvl: 200, points: 11},
  {lvl: 225, points: 12},
  {lvl: 250, points: 14},
  {lvl: 270, points: 15},
  {lvl: 300, points: 16},
  {lvl: 335, points: 17},
  {lvl: 370, points: 18},
  {lvl: 405, points: 19},
  {lvl: 440, points: 20}
]

module.exports = (client, message) => {
  const config = require('../config.json')
  const date = new Date()
  const r = require('rethinkdb');

  if (!message.author.bot) {
    if (!message.content.startsWith(config.prefix)) {
      //реакция на канал
      if (message.channel.id === "686494760780824598") {
        if (message.content.startsWith(">")) {
          message.react('➕')
          message.react('➖')
        }
      }
      r.connect( {host: config.ip, port: 28015 }, function(err, conn) {
        if (bufer.find(u => u.user.id === message.author.id)) {
          r.db(config.db).table("servers").get(message.guild.id).run(conn, function (err, serv) {
            if (Date.now() - bufer.find(id => id.user.id === message.author.id).user.time >= 1000) {
              r.db(config.db).table("users").get(message.author.id).run(conn, function(err, user){
                if (user === null) {
                  r.db(config.db).table("users").insert({
                    "id": `${message.author.id}`,
                    "money": 0,
                    "createdAt": `Date: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}, Time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                    "city": {
                      "enable":false
                    },
                    "user_xp": 0
                  }).run(conn)
                } else {
                  //сумирование жителей
                  if (user.city.enable) {
                    n = user.city.towers.type_1.people + user.city.towers.type_2.people + user.city.towers.type_3.people
                    if (n > user.city.towers.total.people) {
                      r.db(config.db).table("users").get(message.author.id).update({"city":{"towers":{"total":{"people": n}}}}).run(conn)
                      //console.log(message.author.tag + " added people");
                    }
                  }
                  //назначение столицы
                  if ((Date.now() - serv.server.capital_date) >= 86400000) {
                    r.db(config.db).table("users").filter({city:{serverId: message.guild.id}})("city")("towers")("total").orderBy("people").run(conn, function (err, top) {
                      r.db(config.db).table("users").filter({city:{serverId: message.guild.id}}).orderBy("city").run(conn, function (err, city) {
                        let l = []
                        for (var i = 0; i < city.length; i++) {
                          if (city[i].city.towers.total.people === top[top.length - 1].people) {
                            l.push(city[i].city.name)
                            if (!(l.length > 1)) {
                              if (city[i].id !== serv.server.capital) {
                                r.db(config.db).table("servers").get(message.guild.id).update({server: {capital: city[i].id, capital_date: Date.now()}}).run(conn)
                              }
                            }
                          }
                        }
                      })
                    })
                  }
                  //поинты

                  r.db("lisa").table("users").filter({city:{serverId: "172071216369238016"}})("city").orderBy("city_xp").run(conn, function (err, res) {

                    let z = 4;
                    let xp = 0
                    let lvl = 0
                    let last_i = 0

                    for (var i = 0; i < res.length; i++) {
                      xp += res[i].city_xp
                    }
                    while ((9 * z) < xp) {z++;lvl++}
                    if (i > 4) {uxp = xp - ((z - 1) * 9);}

                    for (var i = 0; i < poin.length; i++) {
                      if (poin[i].lvl <= lvl) {last_i = i}
                    }
                    r.db(config.db).table("servers").get(message.guild.id).run(conn, function (err, serv) {
                      if (serv.server.points !== poin[last_i].points) {
                        r.db(config.db).table("servers").get(message.guild.id).update({server:{points: serv.server.points + 1, not_used_points: serv.server.points + 1}}).run(conn)
                      };
                    })
                  })

                  //уровень и опыт
                  if (user.city.city_xp !== undefined) {
                    let i = 4;
                    let lvl = 0
                    while ((9 * i) < user.city.city_xp) {i++;lvl++}
                    if (i > 4) {uxp = user.city.city_xp - ((i - 1) * 9)}
                    else {uxp = user.city.city_xp}
                  } else {lvl = 0; uxp = 0; i = 0}

                  var m_low = 27.5
                  var m_middle = 17.5
                  var m_large = 7.5

                  var rd = 200
                  var random = Math.floor(Math.random() * rd) + 1;
                  if (user.city.enable) {
                    if (user.city.serverId === message.guild.id) {
                      //console.log(random);
                      if (random <= m_low) {
                        //console.log(random);
                        if (lvl >= 20) {

                          if (m_large >= random) {
                            large()
                          } else if (m_middle >= random) {
                            middle()
                          } else if (m_low >= random) {
                            low();
                          }

                         } else if (lvl >= 10) {

                           //console.log(lvl);
                           if (m_middle >= random) {
                             middle()
                         } else if (m_low >= random) {
                             low()
                           }

                         } else if (lvl >= 0) {

                           //console.log(lvl + "\n");
                           if (m_low >= random) {
                             low()
                           }

                         }
                         function low() {
                           if (user.city.towers.type_1.amount * serv.server.tower_cost_multiplier.type_1.capacity > user.city.towers.type_1.people) {
                             r.db(config.db).table("users").get(message.author.id).update({"city": {"towers": {"type_1": {"people": user.city.towers.type_1.people + 1 * 1}}}}).run(conn)
                             if (serv.server.noice) {
                               if (serv.server.channel_for_new_people === null) {
                                 if (user.city.noice) {
                                   message.channel.send({embed:{
                                     description: "**" + message.author.tag + "**, к вам пришёл житель в особняк с шансом " + ((random / rd) * 100).toFixed(2) + "%"
                                   }})
                                 }
                               } else {
                                 if (user.city.noice) {
                                   message.guild.channels.cache.find(c => c.id === serv.server.channel_for_new_people).send({embed:{
                                     description: "**" + message.author.tag + "**, к вам пришёл житель в особняк с шансом " + ((random / rd) * 100).toFixed(2) + "%"
                                   }})
                                 }
                               }
                             }
                           }
                         }
                         function middle() {
                           if (user.city.towers.type_2.amount * serv.server.tower_cost_multiplier.type_2.capacity > user.city.towers.type_2.people) {
                             r.db(config.db).table("users").get(message.author.id).update({"city": {"towers": {"type_2": {"people": user.city.towers.type_2.people + 1 * 1}}}}).run(conn)
                             if (serv.server.noice) {
                               if (serv.server.channel_for_new_people === null) {
                                 if (user.city.noice) {
                                   message.channel.send({embed:{
                                     description: "**" + message.author.tag + "**, к вам пришёл житель в многоэтажку с шансом " + ((random / rd) * 100).toFixed(2) + "%"
                                   }})
                                 }
                               } else {
                                 if (user.city.noice) {
                                   message.guild.channels.cache.find(c => c.id === serv.server.channel_for_new_people).send({embed:{
                                     description: "**" + message.author.tag + "**, к вам пришёл житель в многоэтажку с шансом " + ((random / rd) * 100).toFixed(2) + "%"
                                   }})
                                 }
                               }
                             }
                           }
                         }
                         function large() {
                           if (user.city.towers.type_3.amount * serv.server.tower_cost_multiplier.type_3.capacity > user.city.towers.type_1.people) {
                             r.db(config.db).table("users").get(message.author.id).update({"city": {"towers": {"type_3": {"people": user.city.towers.type_3.people + 1 * 1}}}}).run(conn)
                             if (serv.server.noice) {
                               if (serv.server.channel_for_new_people === null) {
                                 if (user.city.noice) {
                                   message.channel.send({embed:{
                                     description: "**" + message.author.tag + "**, к вам пришёл житель в небоскрёб с шансом " + ((random / rd) * 100).toFixed(2) + "%"
                                   }})
                                 }
                               } else {
                                 if (user.city.noice) {
                                   message.guild.channels.cache.find(c => c.id === serv.server.channel_for_new_people).send({embed:{
                                     description: "**" + message.author.tag + "**, к вам пришёл житель в небоскрёб с шансом " + ((random / rd) * 100).toFixed(2) + "%"
                                   }})
                                 }
                               }
                             }
                           }
                         }
                      } else {
                        c = user.city.towers
                        s = serv.server.tower_cost_multiplier
                        a = c.type_1.people * s.type_1.multiplier  + c.type_2.people * s.type_2.multiplier + c.type_3.people * s.type_3.multiplier
                        b = serv.server.message_cost * a + user.money
                        r.db(config.db).table("users").get(message.author.id).update({"money": b}).run(conn)
                      }
                    } else r.db(config.db).table("users").get(message.author.id).update({"money": user.money + serv.server.message_cost}).run(conn)
                  } else r.db(config.db).table("users").get(message.author.id).update({"money": user.money + serv.server.message_cost}).run(conn)
                }
              })
              var idx = bufer.indexOf(bufer.find(u => u.user.id === message.author.id));
              if (idx != -1) {
                return bufer.splice(idx, 1);
              }
              setTimeout(function () {
                bufer.push({user: {id: message.author.id, time: Date.now()}})
              }, 500);
            }
          })
        } else bufer.push({user: {id: message.author.id, time: Date.now()}})
        if (xp_bufer.find(xid => xid.user.id === message.author.id)) {
          if (Date.now() - xp_bufer.find(xid => xid.user.id === message.author.id).user.time >= 10000) {
            r.db(config.db).table("users").get(message.author.id).run(conn, function(err, user){

            })
          }
        }
        if (xp_bufer.find(xid => xid.user.id === message.author.id)) {
          if (Date.now() - xp_bufer.find(xid => xid.user.id === message.author.id).user.time >= 10000) {

          r.connect( {host: config.ip, port: 28015}, function(err, conn) {
            r.db(config.db).table("users").get(message.author.id).run(conn, function(err, user){
              //уровень города
              if (user.city.enable) {
                cxp = user.city.city_xp + 1
              } else cxp = 0

              //уровень пользователя
              uxp = user.user_xp + 1
              r.db(config.db).table("users").get(message.author.id).update({"city": {"city_xp": cxp}, "user_xp": uxp}).run(conn)
            })
          })
            //удаление пользователя из буфера
            var idx = xp_bufer.indexOf(xp_bufer.find(u => u.user.id === message.author.id));
            if (idx != -1) {
              return xp_bufer.splice(idx, 1);
            }
          }
        } else xp_bufer.push({user: {id: message.author.id, time: Date.now()}})
      })
    }
  }
}

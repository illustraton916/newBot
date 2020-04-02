const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const fs = require('fs');
const r = require('rethinkdb');

//console.log(require("./events/message").test);

//Консоль
client.on('ready', () => {console.log("I am ready!")});
client.on('ready', () => {console.log(`Logged in as ${client.user.tag}!`)});
//Конфиг
client.login(config.token);
client.commands = new Discord.Collection();
client.config = config;
//Файловая система
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  var jsfiles = files.filter(f => f.split('.').pop() === 'js');
  jsfiles.forEach((f, i) => {
    var cmds = require(`./commands/${f}`);
    client.commands.set(cmds.config.command, cmds)
  })
})

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.on('message', message => {
  r.connect( {host: config.ip, port: 28015 }, function(err, conn) {
    var cont = message.content.slice(config.prefix.length).split(" ");      //Узнает что написал пользователь после префиксп
    var args = cont.slice(1);                                               //Узнаёт что идёт после команды
    var cmd = client.commands.get(cont[0]);                                 //{ run: [AsyncFunction (anonymous)], config: { command: 'help' } }

    if (!message.content.startsWith(config.prefix)) return;
    if (cmd) cmd.run(client, message, args, r, conn, config)
  })
})

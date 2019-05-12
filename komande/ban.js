const Discord = require("discord.js"); // Discord Module Required
exports.run = async (client, message, args) => { // if your cmd handler has different things than client, message etc change it

  logembed = new Discord.RichEmbed()

  let logs = message.guild.channels.find("name", "〔🛠〕begybot");
  if(!logs) return message.channel.send("Ne mogu da pronadjem kanal za log");
  userembed = new Discord.RichEmbed()

  let user = message.mentions.users.first();
  if(!user) return message.channel.send("Spomeni korisnika!");

  let reason = args.join(" ");
  if(!reason) reason = "Nisi rekao razlog.";

  //message.guild.user(user).ban(reason);

  let logsEmbed = new Discord.RichEmbed() // Master is MessageEmbed
  .setTitle("⚒KORISNIK BANOVAN⚒")
  .setFooter("✖Logovanje Banovanih Korisnika✖")
  .setColor("#f45f41")
  .setTimestamp()
  .addField("Banovan korisnik:", `${user}, ID: ${user.id}`)
  .addField("Razlog:", reason)
  .addField("Staff:", `${message.author}, ID: ${message.author.id}`)
  .addField("Vreme:", message.createdAt)
  .addField("U Kanalu:", message.channel)

  logs.send(logsEmbed);
}
exports.help = {
  name: "ban"
}

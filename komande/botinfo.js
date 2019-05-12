const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("Bot Informacije")
  .setColor("#d1f442")
  .setThumbnail(bicon)
  .addField("Ime Bota", bot.user.username)
  .addField("Napravljen na", bot.user.createdAt)

  return message.channel.send(botembed);
}

module.exports.help = {
  name: "botinfo"
}

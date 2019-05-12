const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
fs.readdir("./komande/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Ne mogu da pronadjem komande.");
    return;
  }

    jsfile.forEach((f, i) =>{
      let props = require(`./komande/${f}`);
      console.log(`${f} ucitano!`);
      bot.commands.set(props.help.name, props);
    });

});


bot.on("ready", async () => {
  console.log(`${bot.user.username} je online!`);
  bot.user.setActivity("U toku izradnje!")
});
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  if(cmd === `${prefix}zdravo`){
    return message.channel.send("Zdravo i tebi!");
  }
  if(cmd === `${prefix}serverinfo`){

     let sicon = message.guild.iconURL;
     let serverembed = new Discord.RichEmbed()
     .setDescription("Server Infromacija :newspapper:")
     .setColor("#15f153")
     .setThumbnail(sicon)
     .addField("Ime Servera", message.guild.name)
     .addField("Napravljen na", message.guild.createdAt)
     .addField("Ti si usao", message.member.joinedAt)
     .addField("Ukupno korisnika", message.guild.memberCount);

     return message.channel.send(serverembed);
   }


})
bot.login(botconfig.token)

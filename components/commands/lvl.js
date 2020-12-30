var discord = require('discord.js')
var bot = new discord.Client()
module.exports.lvl = (msg) =>{
    var getEco = require("../data/ecoData").get
    if (!msg.mentions.members.first()) {
        var eco = getEco(msg.author.id, msg.guild.id, msg.author.username);
        const lvlemb = new discord.MessageEmbed()
            .setTitle(`${msg.author.username}'s level: ${eco.lvl}`)
            .setDescription(`XP: ${eco.xp}/${2.5*eco.lvl*eco.lvl-2.5*eco.lvl}`)
            .setTimestamp()
            .setColor("BLUE")
        msg.channel.send(lvlemb);
    } else {
        var eco = getEco(msg.mentions.members.first().id, msg.guild.id, msg.mentions.members.first().user.username);
        const lvlemb = new discord.MessageEmbed()
            .setTitle(`${msg.mentions.members.first().user.username}'s level: ${eco.lvl}`)
            .setDescription(`XP: ${eco.xp}/${2.5*eco.lvl*eco.lvl-2.5*eco.lvl}`)
            .setTimestamp()
            .setColor("BLUE")
        msg.channel.send(lvlemb);
    }
}
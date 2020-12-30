var discord = require('discord.js')
var bot = new discord.Client()
module.exports.info = (msg) =>{
    const package = require('../../package.json')

    const serverinfo = new discord.MessageEmbed()
        .setTitle("Info on server: " + msg.guild.name)
        .setColor("BLUE")
        .setAuthor(bot.user.tag, bot.user.avatarURL({
            dynamic: false,
            format: 'png',
            size: 512
        }))
        .addField("Member count", msg.guild.memberCount, false)
        .addField("Date made", new Date(msg.guild.createdTimestamp), false)
        .addField("Boosts", msg.guild.premiumSubscriptionCount, false)

    msg.channel.send({
        embed: serverinfo
    })
}
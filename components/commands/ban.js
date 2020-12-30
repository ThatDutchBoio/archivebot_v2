var discord = require('discord.js')
var bot = new discord.Client()
module.exports.ban = (msg) =>{
    if (msg.member.hasPermission("BAN_MEMBERS") && msg.mentions.members.first() != undefined) {
        msg.mentions.members.first().ban();
        const bannedMember = new discord.MessageEmbed()
            .setTitle(":white_check_mark: Banned " + msg.mentions.members.first().displayName)
            .setAuthor(bot.user.tag, bot.user.avatarURL({
                dynamic: false,
                format: 'png',
                size: 512
            }))
            .setTimestamp()
            .setColor("GREEN")
        msg.channel.send({
            embed: bannedMember
        })

    } else if (msg.mentions.members.first() === undefined) {
        const specifyMember = new discord.MessageEmbed()
            .setTitle(":x: Specify a user to ban!")
            .setColor("RED")
            .setAuthor(bot.user.tag, bot.user.avatarURL({
                dynamic: false,
                format: 'png',
                size: 512
            }))
        msg.channel.send({
            embed: specifyMember
        })
    }
}
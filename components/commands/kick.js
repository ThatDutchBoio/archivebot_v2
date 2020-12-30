module.exports.kick = (msg) =>{
    if (msg.member.hasPermission("KICK_MEMBERS") && msg.mentions.members.first() != undefined) {
        msg.mentions.members.first().kick();
        const bannedMember = new discord.MessageEmbed()
            .setTitle(":white_check_mark: kicked " + msg.mentions.members.first().displayName)
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
            .setTitle(":x: Specify a user to kick!")
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
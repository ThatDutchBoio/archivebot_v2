module.exports.warn = (msg) =>{
    if (msg.member.hasPermission('ADMINISTRATOR')) {
        var getModeration = require('../data/moderationData').get(msg.author.id,msg.guild.id)
        let score = getModeration(msg.mentions.members.first().id, msg.guild.id)
        let towarn = msg.mentions.members.first()
        let towarnId = msg.mentions.members.first().id
        let warns = score.warns
        warns = JSON.parse(warns)
        let warnmsg = msg.content.substring(args[1].length + 8, msg.content.length);
        if (warnmsg === "" || undefined) {
            warnmsg = "No reason"
        }
        warns.push(warnmsg);
        console.log(warns)
        warns = JSON.stringify(warns)
        score.warns = warns
        var setModeration = require('../data/moderationData').set
        setModeration(score);
        console.log(score.warns)

        const warnembed = new discord.MessageEmbed()
            .setTitle("Warned " + towarn.displayName + " for " + warnmsg)
            .setColor("GREEN")
            .setAuthor(bot.user.tag, bot.user.avatarURL({
                dynamic: false,
                format: 'png',
                size: 512
            }))
            .setTimestamp()
        msg.channel.send({
            embed: warnembed
        })

    }
}
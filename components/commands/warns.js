module.exports.warns = (msg) =>{
    const warnsemb = new discord.MessageEmbed()
    if (msg.mentions.members.first() != undefined) {
        let score = getModeration(msg.mentions.members.first.id, msg.guild.id);
        let warns = score.warns
        warns = JSON.parse(warns)
        console.log(warns)
        warnsemb.setTitle(`${msg.mentions.members.first().user.username}` + "'s warns");
        if (warns[0] != undefined) {
            for (i = 0; i < warns.length; i++) {
                warnsemb.addField("Warn " + (i + 1), warns[i], false)
            }
        } else {
            warnsemb.addField("This user has no warns!")
        }
        warnsemb.setAuthor(bot.user.tag, bot.user.avatarURL({
            dynamic: false,
            format: 'png',
            size: 512
        }))
        warnsemb.setColor("BLUE")
        msg.channel.send({
            embed: warnsemb
        })
    } else {
        let score = getModeration(msg.author.id, msg.guild.id)
        let warns = score.warns
        warns = JSON.parse(warns)
        warnsemb.setTitle(msg.author.username + "'s warns");
        if (warns[0] != undefined) {
            for (i = 0; i < warns.length; i++) {
                warnsemb.addField("Warn" + (i + 1), warns[i], false)
            }
        } else {
            warnsemb.addField("This user has no warns!")
        }
        warnsemb.setAuthor(bot.user.tag, bot.user.avatarURL({
            dynamic: false,
            format: 'png',
            size: 512
        }))
        warnsemb.setColor("BLUE")
        return msg.channel.send({
            embed: warnsemb
        })
    }
}
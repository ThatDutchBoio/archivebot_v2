module.exports.setbal = (msg) =>{
    var getEco = require('../data/ecoData').get
    var setEco = require('../data/ecoData').set
    if (!msg.mentions.members.first()) {
        var eco = getEco(msg.author.id, msg.guild.id, msg.author.username);
        var x = msg.content.substring(args[0].length + 2);
        x = parseInt(x);
        eco.cash = x;
        setEco(eco);
        const scEmb = new discord.MessageEmbed()
            .setTitle(":white_check_mark: Succesfully set balance")
            .setColor("GREEN")
            .setAuthor(msg.author.tag, msg.author.avatarURL({
                dynamic: false,
                format: 'png',
                size: 512
            }));
        return msg.channel.send(scEmb);
    } else {
        var eco = getEco(msg.mentions.members.first().id, msg.guild.id, msg.mentions.members.first().user.username);
        var x = msg.content.substring(args[1].length + 8);
        x = parseInt(x);

        eco.cash = x;
        setEco(eco);
        if (!args[1]) return msg.reply("Specify an amount!");

        const scEmb = new discord.MessageEmbed()
            .setTitle(":white_check_mark: Succesfully set balance")
            .setColor("GREEN")
            .setAuthor(msg.mentions.members.first().tag, msg.mentions.members.first().user.avatarURL({
                dynamic: false,
                format: 'png',
                size: 512
            }));
        return msg.channel.send(scEmb);
    }

}

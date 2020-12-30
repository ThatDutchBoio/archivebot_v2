var discord = require('discord.js')

module.exports.archive = (msg,bot) =>{
    if (!msg.mentions.members.first()) {
        var x = bot.channels.cache.get('788464011666522122').messages.fetch(id => id == msg.author.id).then(messages => {
            var bool = false
            messages.forEach(element => {
                if (element.author.id == bot.user.id) {
                    element.embeds.forEach(embeds => {
                        if (!embeds.footer) return;
                        if (embeds.footer.text && embeds.footer.text == msg.author.id) {

                            var creationEmb = new discord.MessageEmbed()
                                .setTitle(`${embeds.title}`)
                                .setColor("BLUE")
                                .setTimestamp(embeds.timestamp)
                            if (embeds.image.url) {
                                creationEmb.setImage(embeds.image.url);
                            }
                            msg.channel.send(creationEmb);
                            bool = true
                        }
                    })


                }
            });
            if (!bool) return msg.reply("This user has no archived creations!")

        })
    } else {
        var x = bot.channels.cache.get('770325208132747304').messages.fetch(id => id == msg.mentions.members.first().id).then(messages => {
            var bool = false;

            messages.forEach(element => {
                if (element.author.id == bot.user.id) {

                    element.embeds.forEach(embeds => {
                        if (!embeds.footer) return;
                        if (embeds.footer.text && embeds.footer.text == msg.mentions.members.first().id) {

                            var creationEmb = new discord.MessageEmbed()
                                .setTitle(`${embeds.title}`)
                                .setColor("BLUE")
                                .setTimestamp(embeds.timestamp)
                            if (embeds.image.url) {
                                creationEmb.setImage(embeds.image.url);
                            }
                            msg.channel.send(creationEmb);
                            bool = true;

                        }
                    })



                }

            });
            if (!bool) return msg.reply("This user has no archived creations!")
        })
    }
}
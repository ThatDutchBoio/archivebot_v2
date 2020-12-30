const discord = require('discord.js')

module.exports.mute = async (msg) => {
    if (msg.member.hasPermission("MUTE_MEMBERS")) {
        if (msg.mentions.members.first() != undefined) {
            let toMute = msg.mentions.members.first();
            oldRoles.set(msg.guild.id + "_" + toMute.id, toMute.roles.cache);
            console.log(oldRoles.get(msg.guild.id + "_" + toMute.id))
            let rolescache = oldRoles.get(msg.guild.id + "_" + toMute.id)
            let aooga = msg.content.substring(args[1].length + 7, msg.content.length);
            let length = aooga.toLowerCase();
            console.log(length)
            let indentifier;
            if (length.includes("h")) {
                console.log('hours')
                length.replace('h', '');
                length = parseInt(length);
                indentifier = length + " Hours";
                length = length * 3600000;

            } else if (length.includes("d")) {
                console.log('days')
                length.replace('d', '');
                length = parseInt(length);
                indentifier = length + " Days";
                length = length * 86400000;

            } else if (length.includes("m")) {
                console.log('minutes')
                length.replace('m', '');
                length = parseInt(length);
                length = length * 60000
                indentifier = length + " Minutes";
            } else if (length.includes("s")) {
                console.log('seconds')
                length.replace('s', '');
                length = parseInt(length);
                indentifier = length + " Seconds";
                length = length * 1000

            }
            toMute.roles.set([])
            let muterole = msg.guild.roles.create({
                data: {
                    name: 'muted',
                    color: 'BLACK',
                    permissions: [],
                }
            }).then(function (role) {
                const mutedEmb = new discord.MessageEmbed()
                    .setTitle(":white_check_mark: Muted " + toMute.displayName + " for " + indentifier)
                    .setAuthor(bot.user.tag, bot.user.avatarURL({
                        dynamic: false,
                        format: 'png',
                        size: 512
                    }))
                    .setColor("GREEN")
                    .setTimestamp()
                    .setFooter("Muted by: " + msg.author.tag)
                toMute.roles.add(role);
                msg.channel.send({
                    embed: mutedEmb
                })
                logchannel.send({
                    embed: mutedEmb
                })
                setTimeout(() => {

                    const unmutedEmb = new discord.MessageEmbed()
                        .setTitle(":white_check_mark: Un-Muted " + toMute.displayName + " after " + indentifier)
                        .setAuthor(bot.user.tag, bot.user.avatarURL({
                            dynamic: false,
                            format: 'png',
                            size: 512
                        }))
                        .setColor("GREEN")
                        .setTimestamp()
                        .setFooter("Muted by: " + msg.author.tag)
                    toMute.roles.add(role);
                    msg.channel.send({
                        embed: unmutedEmb
                    })
                    logchannel.send({
                        embed: unmutedEmb
                    })
                    toMute.roles.set(rolescache);
                    role.delete();
                }, length);
            })
        } else {
            const specUser = new discord.MessageEmbed()
                .setTitle(":x: Specify someone to mute!")
                .setAuthor(bot.user.tag, bot.user.avatarURL({
                    dynamic: false,
                    format: 'png',
                    size: 512
                }))
                .setColor("RED")
                .setTimestamp()
            return msg.channel.send({
                embed: specUser
            })
        }
    }
}
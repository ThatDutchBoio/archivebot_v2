module.exports.anounce = (msg) =>{
    if (msg.member.hasPermission("ADMINISTRATOR")) {
        const x = true
        const anounceembed = new discord.MessageEmbed()
            .setTitle(`${msg.author.tag}'s announcement`)

        const promptChannels = async () => {
            console.log('prompting')
            const channels = msg.guild.channels.cache.filter(c => c.type === "text")
            const channelemb = new discord.MessageEmbed()
                .setTitle("Choose which channel to send the announcement")
                .setColor("BLUE")
            var index = 0;
            var channelmap = new Map()
            channels.forEach(c => {
                index++
                if (!channelmap.has(index)) channelmap.set(index, c);
                channelemb.addField(`${index}.${c.name}`, `Channel Id: ${c.id}`)
            })
            msg.channel.send(channelemb)
            msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
                max: 1,
                time: 60000
            }).then(collected => {
                var choice = parseInt(collected.first().content)
                var channel = channelmap.get(choice)
                msg.channel.send('Sent your announcement!')
                channel.send(anounceembed);
            })

        }
        const promptColor = async () => {
            msg.reply("What color would you like to make the embed?").then(async () => {
                msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
                    max: 1,
                    time: 60000
                }).then(collected => {
                    var promptColor = collected.first().content
                    promptColor = promptColor.toUpperCase()
                    msg.reply(`Is this the color you want?: ${collected.first().content}`).then(async promptmessage => {
                        await promptmessage.react('✔').then(async () => {
                            await promptmessage.react('❌').then(async () => {
                                bot.on('messageReactionAdd', (react, user) => {
                                    if (react.message.id === promptmessage.id && user.id == msg.author.id) {
                                        switch (react.emoji.name) {
                                            case '✔':
                                                promptColor = promptColor.replace(' ', '')
                                                anounceembed.setColor(promptColor);
                                                sendEmb()
                                                return true;
                                                break;
                                            case '❌':
                                                promptColor()
                                                break;
                                        }
                                    }
                                })
                            })
                        })
                    })
                })
            })
        }
        const promptContent = async () => {

            msg.reply("What message would you like to send?").then(() => {
                msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
                    max: 1,
                    time: 60000
                }).then(collected => {
                    var content = collected.first().content
                    msg.reply(`Is this correct?: ${collected.first().content}`).then(async promptmessage => {
                        await promptmessage.react('✔').then(async () => {
                            await promptmessage.react('❌').then(async () => {
                                bot.on('messageReactionAdd', (react, user) => {
                                    console.log(`react: ${react.message.id}, promptmessage: ${promptmessage.id}`)
                                    if (react.message.id == promptmessage.id && user.id === msg.author.id) {
                                        switch (react.emoji.name) {
                                            case '✔':
                                                anounceembed.setDescription(content)
                                                if (!anounceDebounce) {
                                                    return true
                                                } else {
                                                    anounceDebounce = true
                                                    //🄰 🄱 🄲 🄳 🄴 🄵 🄶 🄷 🄸 🄹 🄺 🄻 🄼 🄽 🄾 🄿 🅀 🅁 🅂 🅃 🅄 🅅 🅆 🅇 🅈 🅉
                                                    const optList = new discord.MessageEmbed()
                                                        .setColor("BLUE")
                                                        .setTitle("Customization options")
                                                        .setDescription('Click one of these emojis to edit a certain property')
                                                        .addField('Description', '🄰')
                                                        .addField('Color', '🄱')
                                                        .addField('Image', '🄲')
                                                        .addField('Footer', '🄳')
                                                        .addField('Thumbnail', '🄴')
                                                        .addField('Url', '🄵')
                                                        .addField('Finish', '🄶')
                                                    msg.channel.send(optList)
                                                    msg.channel.send(anounceembed).then(anEmb => {
                                                        anEmb.react('🇦')
                                                        anEmb.react('🇧')
                                                        anEmb.react('🇨')
                                                        anEmb.react('🇩')
                                                        anEmb.react('🇪')
                                                        anEmb.react('🇫')
                                                        anEmb.react('🇬').then(embed => {
                                                            bot.on("messageReactionAdd", (react, user) => {
                                                                if (react.message.id === embed.message.id && user.id == msg.author.id) {
                                                                    switch (react.emoji.name) {
                                                                        case '🇦':
                                                                            promptContent()
                                                                            break;
                                                                        case '🇧':
                                                                            promptColor()
                                                                            break;
                                                                        case '🇨':
                                                                            promptImage()
                                                                            break;
                                                                        case '🇩':
                                                                            promptFooter()
                                                                            break;
                                                                        case '🇪':
                                                                            promptThumb()
                                                                            break;
                                                                        case '🇫':
                                                                            promptUrl()
                                                                            break;
                                                                        case '🇬':
                                                                            promptChannels()
                                                                            break;
                                                                    }
                                                                    return;
                                                                }
                                                            })
                                                        })
                                                    })
                                                }
                                                break;
                                            case '❌':
                                                promptmessage.delete()
                                                promptContent()
                                                break;
                                        }
                                    }
                                })
                            })
                        })
                    })
                })
            })
        }
        const promptFooter = async () => {
            msg.reply("What would you like to set the footer as?").then(() => {
                msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
                    max: 1,
                    time: 60000
                }).then(collected => {
                    msg.reply(`Do you want to set: ${collected.first().content} as your footer?`).then((fMessage => {
                        fMessage.react('✔')
                        fMessage.react('❌').then(() => {
                            bot.on("messageReactionAdd", (react, user) => {
                                if (react.message.id === fMessage.id && user.id === msg.author.id) {
                                    switch (react.emoji.name) {
                                        case '✔':
                                            anounceembed.setFooter(collected.first().content)
                                            sendEmb()
                                            return
                                            break;
                                        case '❌':
                                            promptFooter()
                                            return
                                            break;
                                    }
                                }
                            })
                        })
                    }))
                })
            })
        }
        const promptImage = async () => {
            msg.reply("Please send the image you want to use in chat").then(async () => {
                msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
                    max: 1,
                    time: 60000
                }).then(collected => {
                    console.log(collected.first())
                    if (!collected.first().attachments.first()) {
                        msg.reply("please send an image!");
                        promptImage()
                    } else {
                        anounceembed.setImage(collected.first().attachments.first().url)
                        sendEmb()
                    }
                })
            })
        }
        const promptThumb = async () => {
            msg.reply("Please send the image you want to use in chat").then(async () => {
                msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
                    max: 1,
                    time: 60000
                }).then(collected => {
                    console.log(collected.first())
                    if (!collected.first().attachments.first()) {
                        msg.reply("please send an image!");
                        promptThumb()
                    } else {
                        anounceembed.setThumbnail(collected.first().attachments.first().url)
                        sendEmb()
                    }
                })
            })
        }
        const promptUrl = async () => {
            msg.reply("What would you like to set the url as?").then(() => {
                msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
                    max: 1,
                    time: 60000
                }).then(collected => {
                    msg.reply(`Do you want to set: ${collected.first().content} as the url?`).then((fMessage => {
                        fMessage.react('✔')
                        fMessage.react('❌').then(() => {
                            bot.on("messageReactionAdd", (react, user) => {
                                if (react.message.id === fMessage.id && user.id === msg.author.id) {
                                    switch (react.emoji.name) {
                                        case '✔':
                                            anounceembed.setURL(collected.first().content)
                                            sendEmb()
                                            return
                                            break;
                                        case '❌':
                                            promptUrl()
                                            return
                                            break;
                                    }
                                }
                            })
                        })
                    }))
                })
            })
        }
        const sendEmb = async () => {
            const optList = new discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("Customization options")
                .setDescription('Click one of these emojis to edit a certain property')
                .addField('Description', '🄰')
                .addField('Color', '🄱')
                .addField('Image', '🄲')
                .addField('Footer', '🄳')
                .addField('Thumbnail', '🄴')
                .addField('Url', '🄵')
                .addField('Finish', '🄶')
            msg.channel.send(optList)
            msg.channel.send(anounceembed).then(anEmb => {
                anEmb.react('🇦')
                anEmb.react('🇧')
                anEmb.react('🇨')
                anEmb.react('🇩')
                anEmb.react('🇪')
                anEmb.react('🇫')
                anEmb.react('🇬').then(embed => {
                    bot.on("messageReactionAdd", (react, user) => {
                        if (react.message.id === embed.message.id && user.id == msg.author.id) {
                            switch (react.emoji.name) {
                                case '🇦':
                                    promptContent()
                                    break;
                                case '🇧':
                                    promptColor()
                                    break;
                                case '🇨':
                                    promptImage()
                                    break;
                                case '🇩':
                                    promptFooter()
                                    break;
                                case '🇪':
                                    promptThumb()
                                    break;
                                case '🇫':
                                    promptUrl()
                                    break;
                                case '🇬':
                                    promptChannels()
                                    break;
                            }
                            return;
                        }
                    })
                })
            })
        }

        promptContent()
    
}
}
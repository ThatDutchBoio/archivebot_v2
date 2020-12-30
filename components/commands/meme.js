"use strict"
const discord = require('discord.js')
const {
    getRandomMeme,
} = require('@blad3mak3r/reddit-memes')
module.exports.meme = async (msg) =>{
    var meme =  await getRandomMeme()
    const memeemb = new discord.MessageEmbed()
        .setTitle(`${(await getRandomMeme()).title} **by** ${(await meme).author}`)
        .setDescription(`Upvotes 👍: ${(await meme).ups}`)
        .setImage((await meme).image)
        .setColor("ORANGE")
    return msg.channel.send({
        embed: memeemb
    })
}
module.exports.cash = (msg,amnt) => {
    var getEco = require('../data/ecoData').get
    var setEco = require('../data/ecoData').set
    var eco = getEco(msg.author.id,msg.guild.id,msg.author.username)
    eco.cash -= amnt;
    return setEco(eco);
}

module.exports.xp = (msg,amnt) => {
    var getEco = require('../data/ecoData').get
    var setEco = require('../data/ecoData').set
    var eco = getEco(msg.author.id,msg.guild.id,msg.author.username)
    eco.xp -= amnt;
    return setEco(eco);
}
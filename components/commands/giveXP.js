const getEco = require('../data/ecoData').get;
const setEco = require('../data/ecoData').set;
module.exports.autoIncr = (userId,guildId,username) =>{
    var eco = getEco(userId,guildId,username)
    eco.xp++
    setEco(eco);
}
var db = require('better-sqlite3');
var sql = new db('./components/data/sqlitefiles/data.sqlite')
var discord = require('discord.js')
var bot = new discord.Client()

    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'eco';").get();
    if (!table['count(*)']) {
        sql.prepare("CREATE TABLE eco(id TEXT PRIMARY KEY,xp INT,lvl INT,cash INT,jobid TEXT,username TEXT);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_eco_id ON eco (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    
    }
    bot.getEco = sql.prepare("SELECT * FROM eco WHERE id = ?");
    bot.setEco = sql.prepare("INSERT OR REPLACE INTO eco (id,xp,lvl,cash,jobid,username) VALUES (@id,@xp,@lvl,@cash,@jobid,@username);");
    bot.getEcos = sql.prepare("SELECT * FROM eco").all();
    
    function getEco(userId, guildId, username) {
        console.log(`username: ${username}`)
        let score = bot.getEco.get(`${userId}_${guildId}`);
        if (!score) {
            score = {
                id: `${userId}_${guildId}`,
                xp: 0,
                lvl: 0,
                cash: 0,
                jobid: "none",
                username: username
            }
            bot.setEco.run(score);
        }
    }



module.exports.get = (userId,guildId,username) =>{
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'eco';").get();
    if (!table['count(*)']) {
        sql.prepare("CREATE TABLE eco(id TEXT PRIMARY KEY,xp INT,lvl INT,cash INT,jobid TEXT,username TEXT);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_eco_id ON eco (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    
    }
    bot.getEco = sql.prepare("SELECT * FROM eco WHERE id = ?");
    bot.setEco = sql.prepare("INSERT OR REPLACE INTO eco (id,xp,lvl,cash,jobid,username) VALUES (@id,@xp,@lvl,@cash,@jobid,@username);");
    bot.getEcos = sql.prepare("SELECT * FROM eco").all();
    
    var getEco = (userId,guildId,useername) =>{
        let score = sql.prepare('SELECT * FROM eco WHERE ID = ?').get(`${userId}_${guildId}`)
        if(!score){
            score = {
                id: `${userId}_${guildId}`,
                xp: 0,
                lvl: 0,
                cash: 0,
                jobid: 'none',
                username: username
            }
            sql.prepare('INSERT OR REPLACE INTO eco(id,xp,lvl,cash,jobid,username) VALUES (@id,@xp,@lvl,@cash,@jobid,@username);').run(score)
        }
        return score;
    }
    return getEco(userId,guildId,username);
}
module.exports.getAll = () =>{
    var getEcos = sql.prepare("SELECT * FROM eco ORDER BY lvl DESC").all();
    return getEcos;
}
module.exports.set = (eco) =>{
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'eco';").get();
    if (!table['count(*)']) {
        sql.prepare("CREATE TABLE eco(id TEXT PRIMARY KEY,xp INT,lvl INT,cash INT,jobid TEXT,username TEXT);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_eco_id ON eco (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    
    }
    var setEco = sql.prepare("INSERT OR REPLACE INTO eco (id,xp,lvl,cash,jobid,username) VALUES (@id,@xp,@lvl,@cash,@jobid,@username);");

    setEco.run(eco);
}

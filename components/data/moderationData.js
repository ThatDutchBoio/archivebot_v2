var db = require('better-sqlite3');
var sql = new db('./sqlitefiles/data.sqlite')

function getdata(){
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'eco';").get();
    if (!table['count(*)']) {
        sql.prepare("CREATE TABLE eco(id TEXT PRIMARY KEY,xp INT,lvl INT,cash INT,jobid TEXT,username TEXT);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_eco_id ON eco (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    
    }
    var getEco = sql.prepare("SELECT * FROM eco WHERE id = ?");
    var setEco = sql.prepare("INSERT OR REPLACE INTO eco (id,xp,lvl,cash,jobid,username) VALUES (@id,@xp,@lvl,@cash,@jobid,@username);");
    var getEcos = sql.prepare("SELECT * FROM eco").all();
    
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
}


module.exports.get = (userId,guildId) =>{
    const table2 = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'moderation';").get();
    if (!table2['count(*)']) {
        sql.prepare("CREATE TABLE moderation(id TEXT PRIMARY KEY,warns TEXT);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_moderation_id ON moderation (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");

    }
    var getModeration = sql.prepare("SELECT * FROM moderation WHERE id = ?");
    var setModeration = sql.prepare("INSERT OR REPLACE INTO moderation (id,warns) VALUES (@id,@warns);");
    
    
    function getModeration(userId, guildId) {
        let score = getModeration.get(`${userId}_${guildId}`);
        var warnsstring = []
        warnsstring = JSON.stringify(warnsstring);
        if (!score) {
            score = {
                id: `${userId}_${guildId}`,
                warns: warnsstring
            }
            setModeration.run(score);
        }
        return getModeration.get(`${userId}_${guildId}`);
    }
    return getModeration(userId,guildId)
}

module.exports.set = (moderation) =>{
    const table2 = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'moderation';").get();
    if (!table2['count(*)']) {
        sql.prepare("CREATE TABLE moderation(id TEXT PRIMARY KEY,warns TEXT);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_moderation_id ON moderation (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");

    }
    var getModeration = sql.prepare("SELECT * FROM moderation WHERE id = ?");
    var setModeration = sql.prepare("INSERT OR REPLACE INTO moderation (id,warns) VALUES (@id,@warns);");

    setModeration.run(moderation);
}

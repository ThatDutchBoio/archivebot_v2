var db = require('better-sqlite3');
var sql = new db('./components/data/sqlitefiles/data.sqlite')

module.exports.get = (userId,guildId) =>{
    const table1 = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'companies';").get();
    if (!table1['count(*)']) {
        sql.prepare("CREATE TABLE companies(id TEXT PRIMARY KEY,upgrades TEXT,totalprofit INT,companytype INT,lastchecked INT);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_companies_id ON companies (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");

    }
    var getCompanies = sql.prepare("SELECT * FROM companies WHERE id = ?");
    var setCompanies = sql.prepare("INSERT OR REPLACE INTO companies (id,upgrades,totalprofit,companytype,lastchecked) VALUES (@id,@upgrades,@totalprofit,@companytype,@lastchecked);");
    
    
    function getCompany(userId, guildId) {
        let score = getCompanies.get(`${userId}_${guildId}`);
        var x = {
            "upgrades": {
                "Product Quality": 0,
                "Production Speed": 0
            }
        }
        x = JSON.stringify(x)
        if (!score) {
            score = {
                id: `${userId}_${guildId}`,
                upgrades: x,
                totalprofit: 0,
                companytype: 0,
                lastchecked: 0
            }
            setCompanies.run(score);
        }
        return getCompanies.get(`${userId}_${guildId}`);
    }
    return getCompany(userId,guildId)
}

module.exports.set = (moderation) =>{
    const table1 = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'companies';").get();
    if (!table1['count(*)']) {
        sql.prepare("CREATE TABLE companies(id TEXT PRIMARY KEY,upgrades TEXT,totalprofit INT,companytype INT,lastchecked INT);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_companies_id ON companies (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");

    }
    var getCompanies = sql.prepare("SELECT * FROM companies WHERE id = ?");
    var setCompanies = sql.prepare("INSERT OR REPLACE INTO companies (id,upgrades,totalprofit,companytype,lastchecked) VALUES (@id,@upgrades,@totalprofit,@companytype,@lastchecked);");

    return setCompanies.run(moderation);
}

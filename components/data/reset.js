const db = require('better-sqlite3');
const sql = new db('./data.sqlite');

module.exports.reset = (msg) =>{
    if (msg.author.id === '188708544269254656') {

        sql.prepare('DROP TABLE IF EXISTS eco').run()
        sql.prepare('DROP TABLE IF EXISTS companies').run()
        sql.prepare("CREATE TABLE eco(id TEXT PRIMARY KEY,xp INT,lvl INT,cash INT,jobid TEXT,username TEXT);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_eco_id ON eco (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
        sql.prepare("CREATE TABLE companies(id TEXT PRIMARY KEY,upgrades TEXT,totalprofit INT,companytype INT,lastchecked INT);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_companies_id ON companies (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }
}
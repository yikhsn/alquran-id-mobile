import Sqlite from 'react-native-sqlite-storage';

let conn = Sqlite.openDatabase({ name: 'quran.db', createFromLocation: 1 });

class Database {
    getConnection(){
        return conn;
    }
}

module.exports = new Database();
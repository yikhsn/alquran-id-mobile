import Database from '../databases/database';
let db = Database.getConnection();

export const searchAyat  = (words) => {
    return new Promise( (resolve, reject) => {
        db.transaction( txn => {
            txn.executeSql(
                `SELECT * from surats JOIN ayats ON surats.id=ayats.nomor_surat WHERE ayats.terjemahan LIKE '%${words}%'`,
                [],
                (tx, results) => {
                    let ayats = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        ayats.push(results.rows.item(i));
                    }
                    resolve(ayats);
                }, ( error ) => {
                    resolve([]);
                }
            )
        })
    })
}
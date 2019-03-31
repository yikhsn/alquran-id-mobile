import Database from '../databases/database';
let db = Database.getConnection();

export const getAllSurats = () => {
    return new Promise( (resolve, reject) => {
        db.transaction( txn => {
            txn.executeSql(
                "SELECT * from surats",
                [],
                (tx, results) => {
                    var surats = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        surats.push(results.rows.item(i));
                    }
                    resolve(surats);
                }, (error) => {
                    resolve([])
                }
            )
        })
    })
}

export const getSingleSurat  = (surat_id) => {
    return new Promise( (resolve, reject) => {
        db.transaction( txn => {
            txn.executeSql(
                "SELECT * from ayats WHERE nomor_surat=?",
                [surat_id],
                (tx, results) => {
                    var ayats = [];
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
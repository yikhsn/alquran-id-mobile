import Database from '../databases/database';
let db = Database.getConnection();

export const  getRecentReads = () => {
    return new Promise( (resolve, reject) => {
        db.transaction( txn => {
            txn.executeSql(
                "SELECT * FROM recent_reads JOIN ayats ON recent_reads.ayat_id=ayats.id",
                [],
                (tx, results) => {
                    let recent_reads = [];                    
                    for (let i = 0; i < results.rows.length; ++i) {
                        recent_reads.push(results.rows.item(i));
                    }
                    resolve(recent_reads);
                }, (error) => {
                    resolve([]);
                }
            )
        })
    })
}

export const addToRecentReads = (id) => {
    return new Promise( (resolve, reject) => {
        db.transaction( txn => {
            let date = new Date();
            dateIso = date.toISOString();

            txn.executeSql(
                "INSERT INTO recent_reads (ayat_id, created_at) VALUES (?, ?)",
                [id, dateIso],
                (tx, results) => {
                    let msg;
                    if (results.rowsAffected > 0) msg = "Ayat ditambahkanan terakhir dibaca";
                    else msg = "Ayat ditambahkanan terakhir dibaca";
                    resolve(msg);
                }, (error) => {
                    msg = "Ayat gagal ditambahkanan terakhir dibaca";
                    resolve(msg);
                }
            )
        })
    })
}


export const deleteFromRecentReads = ( id ) => {
    return new Promise( (resolve, reject) => {
        db.transaction( txn => {
            txn.executeSql(
                "DELETE from recent_reads WHERE id=?",
                [id],
                (tx, results) => {
                    let msg;
                    if (results.rowsAffected > 0) {
                        msg = "Delete Recent Read Success";
                    }
                    else {
                        msg = "Delete Recent Read Failed";
                    }
                    resolve(msg);
                }, (error) => {
                    msg = "Delete Recent Read Failed";
                    resolve(error);
                }
            )
        })
    })
}
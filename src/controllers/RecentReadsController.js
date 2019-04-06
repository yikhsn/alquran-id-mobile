import Database from '../databases/database';
let db = Database.getConnection();

export const  getRecentReads = () => {
    return new Promise( (resolve, reject) => {
        db.transaction( txn => {
            txn.executeSql(
                "SELECT ayats.nomor_surat, ayats.nomor_ayat, surats.surat_nama, surats.surat_arab, surats.surat_arti, surats.ayat_total, recent_reads.id, recent_reads.ayat_id, recent_reads.created_at FROM ayats JOIN recent_reads ON recent_reads.ayat_id=ayats.id JOIN surats ON ayats.nomor_surat=surats.id",
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
                    let msg = {} ;
                    if (results.rowsAffected > 0) {
                        msg.title = "Berhasil!";
                        msg.content = "Ayat ditandai sebabai terakhir dibaca";
                    }
                    else {
                        msg.title = "Gagal!";
                        msg.content = "Kesalahan saat menandai terakhir dibaca";
                    }                    
                    resolve(msg);
                }, (error) => {
                    msg.title = "Gagal!";
                    msg.content = "Kesalahan saat menandai terakhir dibaca";
                    resolve(msg);
                }
            )
        })
    })
}

export const deleteFromRecentReads = (id) => {
    return new Promise( (resolve, reject) => {
        db.transaction( txn => {
            txn.executeSql(
                "DELETE from recent_reads WHERE id=?",
                [id],
                (tx, results) => {
                    let msg = {};
                    if (results.rowsAffected > 0) {
                        msg.title = "Dihapus!";
                        msg.content = "Terakhir dibaca berhasil dihapus";
                    }
                    else {
                        msg.title = "Gagal!";
                        msg.content = "Terjadi kesalahan menghapus terakhir dibaca";
                    }
                    resolve(msg);
                }, (error) => {
                    msg.title = "Gagal!";
                    msg.content = "Terjadi kesalahan menghapus terakhir dibaca";
                    resolve(error);
                }
            )
        })
    })
}
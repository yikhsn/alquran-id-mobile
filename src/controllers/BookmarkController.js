import Database from '../databases/database';
let db = Database.getConnection();

export const  getSuratBookmarks = () => {
    return new Promise( (resolve, reject) => {
        db.transaction( txn => {
            txn.executeSql(
                "SELECT * FROM surats JOIN surat_bookmarks ON surats.id=surat_bookmarks.surat_id",
                [],
                (tx, results) => {
                    let surat_bookmarks = [];       
                    for (let i = 0; i < results.rows.length; ++i) {
                        surat_bookmarks.push(results.rows.item(i));
                    }
                    resolve(surat_bookmarks);
                }, (error) => {
                    resolve([]);
                }
            )
        })
    })
}

export const  getAyatBookmarks = () => {
    return new Promise( (resolve, reject) => {
        db.transaction( txn => {
            txn.executeSql(
                "SELECT ayats.nomor_surat, ayats.nomor_ayat, surats.surat_nama, surats.surat_arab, surats.surat_arti, surats.ayat_total, ayat_bookmarks.id, ayat_bookmarks.ayat_id, ayat_bookmarks.created_at FROM ayats JOIN ayat_bookmarks ON ayats.id=ayat_bookmarks.ayat_id JOIN surats ON ayats.nomor_surat=surats.id",
                [],
                (tx, results) => {
                    let ayat_bookmarks = [];                    
                    for (let i = 0; i < results.rows.length; ++i) {
                        ayat_bookmarks.push(results.rows.item(i));
                    }
                    resolve(ayat_bookmarks);
                }, (error) => {
                    resolve([]);
                }
            )
        })
    })
}

export const addSuratToBookmark = (id) => {
    return new Promise( (resolve, reject) => {
        db.transaction( txn => {
            let date = new Date();
            dateIso = date.toISOString();

            txn.executeSql(
                "INSERT INTO surat_bookmarks (surat_id, created_at) VALUES (?, ?)",
                [id, dateIso],
                (tx, results) => {
                    let msg = {};
                    if (results.rowsAffected > 0){
                        msg.title = "Berhasil!";
                        msg.content = "Surat berhasil dibookmark";
                    }
                    else{
                        msg.title = "Gagal!";
                        msg.content = "Terjadi kesalahan saat surat dibookmark";
                    }
                    resolve(msg);
                }, (error) => {
                    msg.title = "Gagal!";
                    msg.content = "Terjadi kesalahan saat surat dibookmark";
                    resolve(msg);
                }
            )
        })
    })
}

export const addAyatToBookmark = (id) => {
    return new Promise( (resolve, reject) => {
        db.transaction( txn => {
            let date = new Date();
            dateIso = date.toISOString();

            txn.executeSql(
                "INSERT INTO ayat_bookmarks (ayat_id, created_at) VALUES (?, ?)",
                [id, dateIso],
                (tx, results) => {
                    let msg = {};
                    if (results.rowsAffected > 0){
                        msg.title = "Berhasil!";
                        msg.content = "Ayat berhasil dibookmark";
                    }
                    else {
                        msg.title = "Gagal!";
                        msg.content = "Terjadi kesalahan saat ayat dibookmark";
                    }
                    resolve(msg);
                }, (error) => {
                    msg.title = "Gagal!";
                    msg.content = "Terjadi kesalahan saat ayat dibookmark";
                    resolve(msg);
                }
            )
        })
    })
}

export const deleteSuratBookmark = (id) => {
    return new Promise( (resolve, reject) => {
        db.transaction( txn => {
            txn.executeSql(
                "DELETE from surat_bookmarks WHERE id=?",
                [id],
                (tx, results) => {
                    let msg = {};
                    if (results.rowsAffected > 0) {
                        msg.title = "Berhasil!";
                        msg.content = "Surat dihapus dari bookmark";
                    }
                    else {
                        msg.title = "Gagal!";
                        msg.content = "Terjadi kesalahan saat menghapus bookmark";
                    }
                    resolve(msg);
                }, (error) => {
                    msg.title = "Gagal!";
                    msg.content = "Terjadi kesalahan saat menghapus bookmark";
                    resolve(error);
                }
            )
        })
    })
}

export const deleteAyatBookmark = ( id ) => {
    return new Promise( (resolve, reject) => {
        db.transaction( txn => {
            txn.executeSql(
                "DELETE from ayat_bookmarks WHERE id=?",
                [id],
                (tx, results) => {
                    let msg = {};
                    if (results.rowsAffected > 0) {
                        msg.title = "Berhasil!";
                        msg.content = "Ayat dihapus dari bookmark";
                    }
                    else {
                        msg.title = "Gagal!";
                        msg.content = "Terjadi kesalahan saat menghapus bookmark";
                    }
                    resolve(msg);
                }, (error) => {
                    msg.title = "Gagal!";
                    msg.content = "Terjadi kesalahan saat menghapus bookmark";
                    resolve(error);
                }
            )
        })
    })
}
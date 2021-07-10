import {QueryError} from "mysql2";

export  {};
const mysqlPool = require("./mysql");

class MysqlQuery {


    public static get<T>(query: string, callback: Function  = null): Promise<T> {
        return new Promise((resolve, reject) => {
            mysqlPool.query(query,(err, data) => {
                if(callback) {
                    callback(resolve, reject, data, err)
                } else {
                    if(!err) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                }
            });
        })
    }

    public static postMultiple(query: string, values: any[][], callback: (resolve: Function, reject: Function, data: any, err: QueryError) => any = null): Promise<any> {
        return new Promise((resolve, reject) => {
            mysqlPool.query(query, [values], (err, data) => {
                if(callback) {
                    callback(resolve, reject, data, err);
                } else {
                    if(!err) {
                        resolve(data);
                    } else {
                        new Error(err);
                        reject(err);
                    }
                }
            });
        })
    }

    public static postSingle(query: string, value: any[], callback: (resolve: Function, reject: Function, data: any, err: QueryError) => any = null): Promise<any> {
        return new Promise((resolve, reject) => {
            mysqlPool.query(query, value, (err, data) => {
                if(callback) {
                    callback(resolve, reject, data, err);
                } else {
                    if(!err) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                }
            })
        })
    }

}

module.exports = MysqlQuery;




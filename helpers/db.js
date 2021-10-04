import * as SQLite from "expo-sqlite";
import { add } from "react-native-reanimated";

// this line will connect to the places.db if it exist else it will create places.db
const db = SQLite.openDatabase("places.db");

export const init = () => {
  // this transaction  takes function as argument, which gives access to transactin object it creates for me, the concept of transaction() function,is just it gaurenties that our whole query is excuted, if some part of it fails the whole transaction is rolledback
  // lat= latitude, lng=longitude
  // executeSql first arg as query, second arg as dynamic arguments
  // and then two funcitons as argument 3 and 4
  // first funciton is success function, it will execute if query success, and second fucntion is if query fails
  //   first argument for both function we get query , ans second argument is error object
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL,lat REAL NOT NULL, lng REAL NOT NULL);",
        [],
        () => {
            resolve();
        },
        (_, err) => {
            reject();
        }
      );
    });
  });
  return promise;
};


export const insertPlace = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            // if we use ${} in the sql query it may lead to sql injection, so instead we do another approach, this another approach is secure
          tx.executeSql(
            `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
            [title, imageUri, address,lat,lng],
            (_, result) => {
                resolve(result);
            },
            (_, err) => {
                reject(err);
            }
          );
        });
      });
      return promise;
}

export const fetchPlaces = () =>{
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            // if we use ${} in the sql query it may lead to sql injection, so instead we do another approach, this another approach is secure
          tx.executeSql(
            'SELECT * FROM places',
            [],
            (_, result) => {
                resolve(result);
            },
            (_, err) => {
                reject(err);
            }
          );
        });
      });
      return promise;
}

// CRUD - Create,read,update and delete operation.
const {
    ObjectID,
    MongoClient
} = require('mongodb');

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager"


MongoClient.connect(connectionURL, {
    useNewUrlParser: true
}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to a database')
    }
    const db = client.db(databaseName);
    // if document found then that is returned and if not then null is returned

    db.collection('tasks').find({
        completed: false
    }).toArray((error, user) => {
        if (error) {
            return console.log('task not found');
        }
        console.log(user)
    })
})
const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const [ , , actions, firstName] = process.argv


function readFromDatabase(){
    client.query('SELECT * FROM famous_people', (err, res) => {
        // console.log(err ? err.stack : res)
        if (err) {
            console.log(err.stack)
        }
        else {
             //console.log(res.rows)
            const rows = res.rows
            let rowCount = 0;
            for (const row of rows) {
                const { id, first_name, last_name, birthdate} = row
                if(first_name === firstName){
                    rowCount += 1;
                }
            }
            console.log(`Found ${rowCount} person(s) by the name ${firstName}:`)
            for (const row of rows){
                const { id, first_name, last_name, birthdate} = row
                if(first_name === firstName){
                    console.log(`-${id} ${first_name} ${last_name} born ${birthdate}`)
                }
            }
        }
        client.end()
    })
}
// filter to call function
client.connect()
switch (actions) {
    case 'read':
        console.log("searching...")
        readFromDatabase()
        break
    case 'add':
        writeToDatabase(firstName)
        break
    default:
        console.log('You need to enter \'read\' or \'add\' ')
        client.end()
}
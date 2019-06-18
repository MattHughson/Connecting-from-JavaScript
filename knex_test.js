const knex = require('knex')({
    client:'pg',
    version: '9.5',
    connection:{
        database: 'test_db',
        host: 'localhost',
        user: 'development',
        password: 'development',
    }
})
function listTheNames(rows){
    for(row of rows){
        const { id, first_name, last_name, birthdate} = row
        console.log(`Hello ${first_name} ${last_name} ! You're id #${id} born ${birthdate}`)
    }
}
const [ , , action, fname, lname, bday] = process.argv
console.log('heyo', fname, lname, bday)
switch(action){
    case 'read':
        knex('famous_people')
            // .join('groups', 'people.id', '=', 'groups.id')
            // .from('people') if you type knex without parenthesis
            .where({first_name:  fname}).then(listTheNames)

            .finally(() => knex.destroy())
        break;
    case 'add':
        knex('famous_people')
            .insert({first_name:fname, last_name:lname, birthdate:bday})
            .then(res => {
                console.log('Added one new entry !')
                knex('famous_people')
                .then(listTheNames)            
            })
            .finally(() => knex.destroy())
}
const sql=require("mssql");
const configEnv=require("config");

const config = {
    user: configEnv.get("user"),
    password: configEnv.get("password"),
    server: configEnv.get("server"), // You can use 'localhost\\instance' to connect to named instance
    database: configEnv.get("databaseUsers"),
    port: 1433
}

var connection= new sql.ConnectionPool(config);

module.exports=connection.connect((error)=>{
    if(error){
        console.log(error)
        return;
    }
})


const sql=require("mssql");

const config = {
    user: "sa",
    password: "qwerty",
    server: 'SIAM', // You can use 'localhost\\instance' to connect to named instance
    database: 'Products_API',
    port: 1433
}

var connection= new sql.ConnectionPool(config);

module.exports=connection.connect((error)=>{
    if(error){
        console.log(error)
        return;
    }
})


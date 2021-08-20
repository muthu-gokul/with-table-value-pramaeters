const sql=require("mssql")

const config=require("./config/dbpool")

const login = async (username,password) => {    
    var conn = await new sql.connect(config);
    let result=await conn.request()
    .input('UserName', sql.VarChar(30), username)
    .input('Password', sql.VarChar(30), password)
    .output('Status', sql.Bit)
    .output('Message', sql.VarChar)
    .execute('USP_UserSignInDetail')      
    console.log(result);
};

login("raja@gmail.com","Login@123")
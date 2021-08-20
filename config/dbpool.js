const e = require("express");
const mssql=require("mssql")

const config={
    options: {
        trustServerCertificate: true,
        encrypt:true       
    },
    user:"sa",
    password:"najarp@1977",
    server:"183.82.32.76",
    database:'Radiant'    
}

exports.config2=(db)=>{
   var confi={
        options: {
            trustServerCertificate: true,
            encrypt:true       
        },
        user:"sa",
        password:"najarp@1977",
        server:"183.82.32.76",
        database:db  
    }

    return confi
}

//module.exports=config;
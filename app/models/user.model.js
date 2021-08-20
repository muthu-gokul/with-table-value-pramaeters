const sql=require("mssql")
const config=require("../../config/dbpool")


exports.login = async (username,password,filedds) => {    
    var conn = await new sql.connect(config);
    let result=await conn.request();
    result.input('UserName', sql.VarChar(30), username);
    result.input('Password', sql.VarChar(30), password);
    result.output('Status', sql.Bit);
    result.output('Message', sql.VarChar);
    result.execute('USP_UserSignInDetail')    ;

    return result
};



exports.login2 = async (username,password,fields) => {    
    console.log(fields);
    let record;
    var conn = await new sql.connect(config);
    let result=await conn.request();
    fields.forEach(element => {
        result.input(element['Key'], sql.VarChar(30), element['Value']);
    });
    result.output('Status', sql.Bit);
    result.output('Message', sql.VarChar);
    result.execute('USP_UserSignInDetail') ;

    // result.execute('USP_UserSignInDetail').then(function(recordsets) {
    //    // console.log(returnValue);
    //     console.dir(recordsets.output);
    //     record=recordsets;
    //   }).catch(function(err) {
    //   ///  console.log(err);
    //   });
      return result
   
};
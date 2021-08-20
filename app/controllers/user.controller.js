const user=require("../models/user.model")
const sql=require("mssql")
const config=require("../../config/dbpool");
const e = require("express");

// Signin
exports.login = async (req, res, next) => {  

    try {

        var fields=req.body['Fields'];
        var spName=fields.shift();
        var dbName=fields.pop();

    
      var conn = await new sql.connect(config.config2(dbName['Value']));
      let result=await conn.request();
     
      fields.forEach(element => {
          if(element['Type']=='String'){
            result.input(element['Key'], sql.NVarChar, element['Value']);
          }
          else if(element['Type']=='int'){
            result.input(element['Key'], sql.Int, element['Value']);
          }
          else if(element['Type']=='datatable'){
            var tvp_Emp = new sql.Table();  
            
            if (typeof element['Value'] != "undefined" 
            && element['Value'] != null 
            && element['Value'].length != null 
            && element['Value'].length > 0) {
              // array exists and is not empty
              var map=element['Value'][0];
              console.log(map);
            
              Object.keys(map).forEach(function (key) {
                console.log(typeof map[key]);

                if(typeof map[key]=='object'){
                  tvp_Emp.columns.add(key, sql.Int);  
                }
                else if(typeof map[key]=='number'){
                  tvp_Emp.columns.add(key, sql.Int);  
                }
                else if(typeof map[key]=='string'){
                  tvp_Emp.columns.add(key, sql.NVarChar);  
                }
             });
             var res1=[];
             
            element['Value'].forEach(ele=>{
             // console.log(ele);
             var tempArr=[];
                Object.keys(ele).forEach(function (key) {
                 tempArr.push(ele[key]);
               });
               res1.push(tempArr);
            });
            tvp_Emp.rows=res1;
             result.input(element['Key'], sql.TVP, tvp_Emp);
          }
          else{
        //    console.log(element['Key']);
        //    console.log(element['Value']);
         //   tvp_Emp.columns=[];
         //   tvp_Emp.rows=[];
          }
          
            
            
          }
      });
      
      result.output('Status', sql.Bit);
      result.output('Message', sql.VarChar);
       result.execute(spName['Value']).then(function(recordsets) {

        var a1=recordsets.recordsets;
        var a2=[recordsets.output];
    
        if(typeof a1!=='undefined'){
            var a3={};
            for(var i=0;i<a1.length;i++){
                if(i==0){
                    a3['Table']=a1[0];
                }
                else{
                    a3['Table'+`${i}`]=a1[i];
                }
            }
            a3['TblOutPut']=a2;
            res.status(200).json(
                a3
            )  
        }
        else{
            res.status(200).json(
                {"TblOutPut":a2}
            )  
        }
         conn.close();
       
      }).catch(function(err) {
        res.status(500).json(
            {"Message":err}
        );
         conn.close();
      });
   
    } 
    catch (error) {
        next(error);
         conn.close();
    }
    
};
function cetakSpace(jumlahspace){
    let space="";
    for (let index = 1; index <=  jumlahspace; index++) {
     space +="\xa0"
    }
    return space;
}

function cetakCharacter(jumlah ,ganjil,hash=true){
    let char="";
    if(ganjil){
        for (let index = 1; index <=  jumlah; index++) {
            if(hash){
                if(index % 2 == 0){
                    char +="# "
                }else{
                    char +="+ "
                }
            }else{
                if(index % 2 == 0){
                    char +="+ "
                }else{
                    char +="# "
                }
            }
        }
    }else{
        for (let index = 1; index <=  jumlah; index++) {
            char +="+ "
        }
    }
   return char;
}


function cetakPola(pola){
 let hash = false;   
for (let index = 1; index  <= pola; index++) {
    
  if((pola-index+1) % 2 == 0){
   console.log(cetakSpace(index) + cetakCharacter(pola-index+1,false));
  }else{
    console.log(cetakSpace(index) + cetakCharacter(pola-index+1,true,hash));
    if(hash){
        hash=false;
    }else{
        hash=true;
    }
  }    
}
}

cetakPola(5);

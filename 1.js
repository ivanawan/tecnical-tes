function countingMoney(){
    const tahun=2;
    const depositBank= 350000000;
    const obligasiNegara=(650000000 * 30)/100;
    const sahamA=(650000000 * 35)/100;
    const sahamB=(650000000 * 35)/100;


    // menghitung keuntungan Deposit bank
    let keuntunganDepositBank= (depositBank * 3.5)/100;
    keuntunganDepositBank *= tahun;
    console.log("keuntungan deposit bank =>", keuntunganDepositBank);

   // menghitung keuntungan Obligasi Negara 
   let keuntunganObligasiNegara=(obligasiNegara * 13)/100;
   keuntunganObligasiNegara *=tahun;
   console.log("keuntungan obligasi Negara =>", keuntunganObligasiNegara);


    // menghitung keuntungan Saham A 
    let keuntunganSahamA=(sahamA * 14.5)/100;
    keuntunganSahamA *=tahun;
    console.log("keuntungan saham A =>", keuntunganSahamA);


    // menghitung keuntungan Saham B
    let keuntunganSahamB=(sahamB * 12.5)/100;
    keuntunganSahamB *=tahun;
    console.log("keuntungan saham B =>", keuntunganSahamB);

    
    let keuntungan=keuntunganDepositBank+keuntunganObligasiNegara+keuntunganSahamA+keuntunganSahamB;
    console.log("Total semua keuntungan =", keuntungan);
    console.log("Total uang setelah dua tahun =", keuntungan+ 1000000000);

    }
 
    countingMoney()
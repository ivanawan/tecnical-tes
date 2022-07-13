function formatUang(bilangan){
    let	number_string = bilangan.toString();
    let sisa 	= number_string.length % 3;
      let rupiah 	= number_string.substr(0, sisa);
    let	ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
          
  if (ribuan) {
   let	separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
  }
   return rupiah;
 }

function countingMoney(){
    const tahun=2;
    const depositBank= 350000000;
    const obligasiNegara=(650000000 * 30)/100;
    const sahamA=(650000000 * 35)/100;
    const sahamB=(650000000 * 35)/100;


    // menghitung keuntungan Deposit bank
    let keuntunganDepositBank= (depositBank * 3.5)/100;
    keuntunganDepositBank *= tahun;
    console.log("keuntungan deposit bank => Rp.", formatUang(keuntunganDepositBank));

   // menghitung keuntungan Obligasi Negara 
   let keuntunganObligasiNegara=(obligasiNegara * 13)/100;
   keuntunganObligasiNegara *=tahun;
   console.log("keuntungan obligasi Negara => Rp.", formatUang(keuntunganObligasiNegara));


    // menghitung keuntungan Saham A 
    let keuntunganSahamA=(sahamA * 14.5)/100;
    keuntunganSahamA *=tahun;
    console.log("keuntungan saham A => Rp.", formatUang(keuntunganSahamA));


    // menghitung keuntungan Saham B
    let keuntunganSahamB=(sahamB * 12.5)/100;
    keuntunganSahamB *=tahun;
    console.log("keuntungan saham B => Rp.", formatUang(keuntunganSahamB));

    
    let keuntungan=keuntunganDepositBank+keuntunganObligasiNegara+keuntunganSahamA+keuntunganSahamB;
    console.log("Total semua keuntungan = Rp.", formatUang(keuntungan));
    console.log("Total uang setelah dua tahun = Rp.",formatUang(keuntungan+ 1000000000));

    }
 
    countingMoney()
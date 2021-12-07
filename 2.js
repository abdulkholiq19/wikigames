var dumbWaysJos = 0.21
var dumbWaysMantap = 0.3

var kembalian = 0;

document.write("Tugas Nomor 2");
document.write("<br> ");
document.write("<br> ");

function diskon(voucher, uangBelanja){
console.log("dada :", voucher)
if(voucher == dumbWaysJos){
if(uangBelanja < 50000){
  alert("Uang Belanja Minimal 50.000 Untuk Menggunakan Voucher dumbWaysJos")
}
}

if(voucher == dumbWaysMantap){
if(uangBelanja <= 80000){
  alert("Uang Belanja Minimal 80.000 Untuk Menggunakan Voucher dumbWaysMantap")
} 
}

var diskon;
diskon = voucher * uangBelanja;
if(voucher == dumbWaysJos){
  if(diskon >= 20000){
    diskon = 20000
  }
}
if(voucher == dumbWaysMantap){
  if(diskon >= 40000){
    diskon = 40000
  }
}
document.write("Uang Belanja : Rp.  " + uangBelanja);
document.write("<br> ");

document.write("Total Diskon : Rp.  " + diskon);
document.write("<br> ");

hargaDiskon = uangBelanja - diskon;

kembalian = uangBelanja - hargaDiskon;

document.write("________________________ - ");
document.write("<br> ");
return hargaDiskon;
}
document.write("Uang yang harus dibayar: Rp. " + diskon(dumbWaysJos, 81000));
document.write("<br> ");
document.write("Kembalian : Rp. " + kembalian);
console.log('masuk')
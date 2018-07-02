function calculateNetPay(basicpay){
if(basicpay>50000){
    HRA=0.4*basicpay;
    grosspay=basicpay+HRA;
    netpay=grosspay-1000;
}
else{
    HRA=0.3*basicpay;
    grosspay=basicpay+HRA;
    netpay=grosspay-1000;
}

return netpay;
}
module.exports.calculateNetPay=calculateNetPay;
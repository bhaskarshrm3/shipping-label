$(document).ready(function() {
  document.getElementById('ship-date').valueAsDate = new Date();
});

$(".generate-pdf").on("click", function() {
  var printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head><title>');
  printWindow.document.write($("#tracking-number").val());
  printWindow.document.write('</title>');
  printWindow.document.write('<style>* { font-family: sans-serif } p { margin:5px 0; }h6{display:inline; text-transform:uppercase}</style><style media="print">@page { size: auto;margin: 0; } </style>');  
  printWindow.document.write('</head><body style="display: flex;flex-direction: column;height: 90%;box-sizing: border-box;padding:40px">');
  var senderInfo = combineSenderInfo();
  var packageDetails = combinePackageDetails();
  var receiverInfo = combineReceiverInfo();
  printWindow.document.write('<div style="display:flex;justify-content:space-between">');
  printWindow.document.write(senderInfo);
  printWindow.document.write(packageDetails);
  printWindow.document.write('</div>');
  printWindow.document.write(receiverInfo);
  printWindow.document.write('</body></3html>');
  printWindow.document.close();
  printWindow.print();
  var trackingNumber = $("#tracking-number").val();
  JsBarcode("#barcode", trackingNumber, {
    width: 4,
    height: 100,
    flat: true,
    displayValue: false
  });
});

function combineSenderInfo(){
  var from = "<div><h5>FROM:</h5>"
  var name = $("#sender-name").val() + "<br>";
  var address = $("#sender-address-first").val() + "<br>" + $("#sender-address-second").val() + "<br>";
  var phone = $("#sender-phone").val() + "</div>";
  return from + name + address + phone;
}

function combineReceiverInfo(){
  var from = "<div style='max-width:500px;margin:0 auto;'><h3>To: "
  var name = $("#receiver-name").val() + "</h3>";
  var address = "<h3>" + $("#receiver-address-first").val() + "<br>" + $("#receiver-address-second").val() + "<br>";
  var phone = $("#receiver-phone").val() + "</h3></div>";
  return from + name + address + phone;
}

function combinePackageDetails(){
  var container = "<div style='text-align:right'>";
  var date = "<h6>SHIP DATE: " + $("#ship-date").val() + "</h6><br>";
  var weight = "<h6>WEIGHT: " + $("#weight").val() + "</h6><br>";
  var tracking = "<h6>TRACKING #: " + $("#tracking-number").val() + "</h6>";
  var barcode = $("#barcode").html();
  return container + date + weight + tracking + barcode;
}
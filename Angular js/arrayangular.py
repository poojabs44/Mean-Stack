<!DOCTYPE html>
<html>
<head>
	<title>
		complex in js
	</title>
	<script type="text/javascript" src="complex.js"></script>
</head>
<body>
	<script >
	var real;
	var complex;
	var real1;
	var complex1;
	real=parseInt(prompt("enter real part"));
	imag=parseInt(prompt("enter complex part"));
	real1=parseInt(prompt("enter real part1"));
	imag1=parseInt(prompt("enter complex part1"));
    var c= new Complex(real,imag);
    var c1= new Complex(real1,imag1);
    var c3 = c.addComplex(c1);
	document.writeln("result is "+ c3. real + c3.imag);
	</script>
</body>
</html>
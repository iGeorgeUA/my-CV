let arr = [1, 2, 3];

Array.prototype.pow = function(n) {
  arr = arr.map(i => i ** n);
};

arr.pow(2);
console.log(arr);

Function.prototype.defer = function(n) {
  setTimeout(this, n);
};

function a() {
  alert('test');
}

a.defer(1000);
function solve() {
	return function sum(numbers) {
        let sum = 0;
        if (numbers.some(x => isNaN(Number(x)))) {
            throw 'Error';
        }
        if (numbers.some(function(x) {
            return typeof(x) === 'undefined';
        })) {
            throw 'Error';
        }
        if (numbers.length === 0) {
            return null;
        }
        for (let i = 0; i < numbers.length; i++) {
            sum += +numbers[i];
        }
	}
}

module.exports = solve;
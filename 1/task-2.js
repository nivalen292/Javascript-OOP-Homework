/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function solve() {
	return function findPrimes(start, end) {
        start = +start;
        end = +end;
        if (isNaN(start) || isNaN(end)) {
            throw 'Error';
        }
        if (arguments.length !== 2) {
            throw 'Error';
        }
        let primes = [];

        for (let i = start; i <= end; i++) {
            if (isPrime(i)) {
                primes.push(i);
            }
        }

        function isPrime(x) {
            if (x < 2) {
                return false;
            }
            if (x === 2) {
                return true;
            }
            let maxDivider = Math.sqrt(x);
            for (let i = 2; i <= maxDivider; i++) {
                if (x % i === 0) {
                    return false;
                }
            }
            return true;
        }

        return primes;
	}
}

module.exports = solve;

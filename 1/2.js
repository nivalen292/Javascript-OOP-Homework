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
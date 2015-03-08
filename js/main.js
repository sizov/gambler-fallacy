function runProgram(obj) {

    var tradingSessions = obj.tradingSessions,
        tradesPerSession = obj.tradesPerSession,
        initialAmount = obj.initialAmount,
        oneBetPercentage = obj.oneBetPercentage,
        winProbabiliy = obj.winProbabiliy;

    function getPercentTrueFalse(number) {
        return Math.random() < number;
    }

    function playOneBet(betAmount) {
        var winAmount = betAmount * 1;

        if (getPercentTrueFalse(winProbabiliy)) {
            return betAmount + winAmount;
        }

        return 0;
    }

    function executeTradingSession(initialAmount, amountOfTradesPerSession, oneBetPercentage) {
        var currentAmount = initialAmount;
        for (var i = 0; i < amountOfTradesPerSession; i++) {
            var variableBetSize = currentAmount * oneBetPercentage,
                oneBet = variableBetSize,
                amountBeforeBet = currentAmount;

            currentAmount = currentAmount - oneBet;

            //betting
            currentAmount = currentAmount + playOneBet(oneBet);

//            console.log('Had:', amountBeforeBet, 'played:', oneBet, 'now on account:', currentAmount);
        }

        return currentAmount;
    }

    var endTradeAccounts = [];
    for (var i = 0; i < tradingSessions; i++) {
        var endedWithAmount = executeTradingSession(initialAmount, tradesPerSession, oneBetPercentage);
//        console.log('Ended with', endedWithAmount);
        endTradeAccounts.push(endedWithAmount);
    }

    //average
    var total = 0,
        wonCount = 0;
    for (var j = 0; j < endTradeAccounts.length; j++) {
        var oneEndAccount = endTradeAccounts[j];
        if (oneEndAccount > initialAmount) {
            wonCount++;
        }
        total = total + oneEndAccount;
    }

    console.log('one bet:', oneBetPercentage * 100 + '%,',
        'win probabiliy:', winProbabiliy,
        ', average end acc:', total / endTradeAccounts.length,
        ', % won', 100 * wonCount / tradingSessions,
        ', % lost', 100 * (tradingSessions - wonCount) / tradingSessions);
}

runProgram({
    tradingSessions: 100000,
    tradesPerSession: 100,
    initialAmount: 1000,
    oneBetPercentage: 0.01,
    winProbabiliy: 0.6
});

runProgram({
    tradingSessions: 100000,
    tradesPerSession: 100,
    initialAmount: 1000,
    oneBetPercentage: 0.02,
    winProbabiliy: 0.6
});

runProgram({
    tradingSessions: 100000,
    tradesPerSession: 100,
    initialAmount: 1000,
    oneBetPercentage: 0.03,
    winProbabiliy: 0.6
});

runProgram({
    tradingSessions: 100000,
    tradesPerSession: 100,
    initialAmount: 1000,
    oneBetPercentage: 0.1,
    winProbabiliy: 0.6
});
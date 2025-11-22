class ProcessStatus {

    static adjustSalary(record) {
        let adjusted = Number(record.salary);
        if (record.month === 12) {
            adjusted *= 1.10; // apply +10% holiday bonus
        } else if ([6, 7, 8].includes(record.month)) {
            adjusted *= 0.95; // apply -5% seasonal deduction 
        }
        return {...record, adjustedSalary: adjusted };
    }


    static calculate(salaries) {
        const adjustedSalaries = salaries.map(ProcessStatus.adjustSalary);

        let sum = adjustedSalaries.reduce((acc, s) => acc + s.adjustedSalary, 0);

        // Tax Deduction Rule - 7% deduction for total above 10k
        if (sum > 10000) {
            sum *= 0.93;
        }

        // Average
        const average = sum / salaries.length;

        // Highest
        const highest = Math.max(...adjustedSalaries.map(s => s.adjustedSalary));

        // status
        let status = 'RED';
        if (average > 2000) status = 'GREEN';
        else if (average === 2000) status = 'ORANGE';

        return {
            HighestSalary: highest,
            AverageSalary: average,
            Status: status,
            LastUpdated: new Date().toISOString()
        };
    }
}

module.exports = ProcessStatus;
(function() {
    function decimalAdjust(type, value, exp) {
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    if (!Math.round10) {
        Math.round10 = function(value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
})();


function hiddenPlusValidation(e) {
    if (e.target.value === 'Yes'){
        holidayHoursWorked.hidden = false
        hourlySalary.hidden = false
        holidayHoursWorked.required = true
        hourlySalary.required = true
        labelHHW.hidden = false
        labelHS.hidden = false
        //holidaySalaryCoefficient.hidden = false
        //labelHSC.hidden = false
    }else {
        holidayHoursWorked.hidden = true
        hourlySalary.hidden = true
        holidayHoursWorked.required = false
        hourlySalary.required = false
        labelHHW.hidden = true
        labelHS.hidden = true
        //holidaySalaryCoefficient.hidden = true
        //labelHSC.hidden = true
    }
}


function urRegion(e) {
    if (e.target.value === 'Ontario') {
        daysWorked.max = 28
        labelTS.textContent = 'Total salary for last 4 weeks'
        labelDW.textContent = 'Days worked in the last 4 weeks'
    } else if (e.target.value === 'British Columbia') {
        daysWorked.max = 30
        labelTS.textContent = 'Total salary for last 30 days'
        labelDW.textContent = 'Days worked in the last 30 days'
    }
}


function showErrorHolidayHoursWorked() {
    if (holidayHoursWorked.validity.valueMissing) {
        errorHHW.textContent = 'You need to fill this gap.';
    } else if (holidayHoursWorked.validity.rangeOverflow) {
        errorHHW.textContent = 'You are only allowed to enter numbers less than or equal to 24.'
    } else if (holidayHoursWorked.validity.rangeUnderflow){
        errorHHW.textContent = 'You are only allowed to enter numbers grater than or equal to 1.'
    }
    errorHHW.className = 'error active'
}


function showErrorHourlySalary() {
    if (hourlySalary.validity.valueMissing) {
        errorHS.textContent = 'You need to fill this gap.'
    } else if (hourlySalary.validity.rangeUnderflow){
        errorHS.textContent = 'You are only allowed to enter numbers greater than or equal to 0.00001.'
    } else if (hourlySalary.validity.rangeOverflow){
        errorHS.textContent = 'You are only allowed to enter numbers less than or equal to 999999999999.'
    }
    errorHS.className = 'error active'
}


function showErrorTotalSalary() {
    if (totalSalary.validity.valueMissing) {
        errorTS.textContent = 'You need to fill this gap.'
    } else if (totalSalary.validity.rangeUnderflow){
        errorTS.textContent = 'You are only allowed to enter numbers greater than or equal to 0.00001.'
    } else if (totalSalary.validity.rangeOverflow) {
        errorTS.textContent = 'You are only allowed to enter numbers less than or equal to 999999999999.'
    }
    errorTS.className = 'error active'
}


function showErrorDaysWorked() {
    if (daysWorked.validity.valueMissing) {
        errorDW.textContent = 'You need to fill this gap.';
    } else if (daysWorked.validity.rangeOverflow) {
        errorDW.textContent = 'You are only allowed to enter numbers less than or equal to 24.'
    } else if (daysWorked.validity.rangeUnderflow){
        errorDW.textContent = 'You are only allowed to enter numbers greater than or equal to 1.'
    }
    errorDW.className = 'error active'
}


let region = document.getElementById('region')
let workedOnHoliday = document.getElementById('workedOnHoliday')
let holidayHoursWorked = document.getElementById('holidayHoursWorked')
let hourlySalary = document.getElementById('hourlySalary')
//let holidaySalaryCoefficient = document.getElementById('holidaySalaryCoefficient')
let totalSalary = document.getElementById('totalSalary')
let daysWorked = document.getElementById('daysWorked')
let button = document.getElementById('button')
let out = document.getElementById('out')
let labelHHW = document.getElementById('labelHHW')
let labelHS = document.getElementById('labelHS')
//let labelHSC = document.getElementById('labelHSC')
let labelTS = document.getElementById('labelTS')
let labelDW = document.getElementById('labelDW')
let errorHHW = document.getElementById('errorHHW')
let errorHS = document.getElementById('errorHS')
let errorTS = document.getElementById('errorTS')
let errorDW = document.getElementById('errorDW')



//if (hourlySalary.required === 'false'){
//    hourlySalary.onclick = () => {
//        hourlySalary.required = 'required'}
//
//}
workedOnHoliday.onchange = hiddenPlusValidation
region.onchange = urRegion
//if (holidayHoursWorked.required === 'false'){
//    holidayHoursWorked.onclick = () => {
//        holidayHoursWorked.required = 'required'}
//
//}


holidayHoursWorked.addEventListener('input', function (event) {
    if (holidayHoursWorked.validity.valid) {
        errorHHW.textContent = ''
        errorHHW.className = 'error'
    } else {
        showErrorHolidayHoursWorked()
    }
})


hourlySalary.addEventListener('input', function (event) {
    if (hourlySalary.validity.valid) {
        errorHS.textContent = ''
        errorHS.className = 'error'
    } else {
        showErrorHourlySalary()
    }
})


totalSalary.addEventListener('input', function (event) {
    if (totalSalary.validity.valid) {
        errorTS.textContent = ''
        errorTS.className = 'error'
    } else {
        showErrorTotalSalary()
    }
})


daysWorked.addEventListener('input', function (event) {
    if (daysWorked.validity.valid) {
        errorDW.textContent = ''
        errorDW.className = 'error'
    } else {
        showErrorDaysWorked()
    }
})


button.onclick = () => {
    if (holidayHoursWorked.validity.valid  && hourlySalary.validity.valid  && totalSalary.validity.valid  && daysWorked.validity.valid){
        if (workedOnHoliday.value === 'Yes') {
            if (region.value === 'Ontario') {
                out.value = Math.round10(holidayHoursWorked.value * hourlySalary.value * 1.5 + totalSalary.value / daysWorked.value, -2)
            } else if (region.value === 'British Columbia') {
                if (holidayHoursWorked.value > 12) {
                    out.value = Math.round10(12 * hourlySalary.value * 1.5 + (holidayHoursWorked.value - 12) * hourlySalary.value * 2 + totalSalary.value / daysWorked.value, -2)
                } else {
                    out.value = Math.round10(holidayHoursWorked.value * hourlySalary.value * 1.5 + totalSalary.value / daysWorked.value, -2)
                }
            }
        } else {
            if (region.value === 'Ontario') {
                out.value = Math.round10(totalSalary.value / daysWorked.value, -2)
            } else if (region.value === 'British Columbia') {
                out.value = Math.round10(totalSalary.value / daysWorked.value, -2)
            }
        }
    } else {
        if (!holidayHoursWorked.validity.valid)
            showErrorHolidayHoursWorked()
        if (!hourlySalary.validity.valid)
            showErrorHourlySalary()
        if (!totalSalary.validity.valid)
            showErrorTotalSalary()
        if (!daysWorked.validity.valid)
            showErrorDaysWorked()
    }
}



//<label htmlFor="holidaySalaryCoefficient" id="labelHSC" hidden="hidden">Holiday salary coefficient</label>
//<p><input type="number" id="holidaySalaryCoefficient" hidden="hidden"></p>
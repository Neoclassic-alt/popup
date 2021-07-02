function ready(){
    const taxButton = document.getElementById('tax-deduction')
    const popup = document.getElementById('popup')
    taxButton.onclick = function(){ // открытие попапа
        popup.dataset.showing = "yes"
    }
    const closeIcon = popup.querySelector('.info-block__close-icon')
    // закрытие попапа
    closeIcon.onclick = function() {
        popup.dataset.showing = "no"
    }

    const input = document.getElementById('input-salary')
    const inputErrorInfo = document.getElementById('input_error_empty')
    input.onblur = function() { // когда элемент теряет фокус
        if (!input.value){
            input.classList.add('info-block__input_error')
            inputErrorInfo.classList.remove('input__error_disabled')
        }
    }
    input.oninput = function(){ // когда идет набор данных
        if (input.value){
            input.classList.remove('info-block__input_error')
            inputErrorInfo.classList.add('input__error_disabled')
        }
    }
    // чекбоксы
    const calculation = popup.querySelector('.salary-calculations')
    calculation.onclick = function(event){
        const target = event.target
        if (target.closest('.custom-checkbox')){
            const checked = target.dataset.checked
            target.dataset.checked = checked == "yes" ? "no" : "yes"
        }
        if (target.closest('.calc-info__text')){
            const checked = target.previousElementSibling.dataset.checked
            target.previousElementSibling.dataset.checked = checked == "yes" ? "no" : "yes"
        }
    }

    // вычисление и разметка
    const calculateAction = popup.querySelector('.info-block__action')
    calculateAction.onclick = function(){
        const salary = Number(input.value)
        const maxDeduction = 260000
        let payouts = []
        let rest = maxDeduction
        if (input.value != "" && !isNaN(salary)){
            while (rest > 0){
                let payout = salary*12*0.13
                if (payout < rest){
                    payouts.push(payout)
                } else {
                    payouts.push(rest)
                }
                rest -= payout
            }
        }
        const calculations = document.querySelector('.salary-calculations')
        calculations.innerHTML = `<p class="info-block__caption calculation__title">Итого можете внести в качестве досрочных:</p>`

        let index = 1
        const endings = ['ый', 'ой', 'ий', 'ый', 'ый', 'ой', 'ой', 'ой', 'ый', 'ый'] // окончания для числовых приращений
        for (let payout of payouts){
            calculations.insertAdjacentHTML("beforeend", `
                <div class="calculation__info">
                    <div class="custom-checkbox"></div> <span class="calc-info__text">${payout} рублей 
                    <span class="text-gray">в${index == 2 ? "о" : ""} ${index}-${index > 9 ? "ый" : endings[index-1]} год</span></span>
                </div>
            `)
            index += 1
        }
    }
}

document.addEventListener('DOMContentLoaded', ready)
const valueInput = document.querySelector('#value')
valueInput.value = 0

const animateInput =  document.querySelector('#animate')

const hideInput =  document.querySelector('#hide')

const progressBar = document.querySelector('#progress')

const step = 10

let lastValue = 0

let debounceTimer

let changingInterval

function debounce(func) {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    func()
  }, 500)
}

const speed = 20

const changeValue = (newValue, isAnimateMode=false) => {
    if(changingInterval){
        clearInterval(changingInterval);
        changingInterval = null;
    }
    changingInterval = setInterval(()=>{ 
        if(lastValue>newValue){
            if(isAnimateMode){
                if(lastValue===100){
                    lastValue = 0
                }else{
                    lastValue ++
                }
            }else{
                lastValue--
            }
        }else if(lastValue < newValue){
            lastValue ++
        }
        progressBar.style.background = `conic-gradient(#2159f3 ${lastValue}%, #c0d0db 0deg)`;
        if(lastValue === newValue){
            clearInterval(changingInterval);
            changingInterval = null;
        }
    }, speed)
}

valueInput.addEventListener('input', (e)=>{
    if(!e.target.value){
        valueInput.value = 0
    }
    const value = Number(e.target.value)
    let finalValue = value
    if(value>100){
        finalValue = 100
    }
    valueInput.value = finalValue
    debounce(()=>changeValue(finalValue))
})

let animateInterval

animateInput.addEventListener('change', ()=>{
    valueInput.disabled = animateInput.checked
    if(animateInput.checked){
        animateInterval = setInterval(()=>{ 
            const currentValue = Number(valueInput.value)
            let finalValue
            if(currentValue<=(100-step)){
                finalValue = currentValue + step
            }else{
                finalValue = step - (100 - currentValue)
            }
            valueInput.value = finalValue
            changeValue(finalValue, true)
        }, 1000)
    }else{
        clearInterval(animateInterval);
        animateInterval = null;
    }
})

hideInput.addEventListener('change', ()=>{
    if(hideInput.checked){
        progressBar.style.visibility = 'hidden'
    }else{
        progressBar.style.visibility = 'visible'
    }
})
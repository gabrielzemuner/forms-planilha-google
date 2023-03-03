const button = document.querySelector('button')
const inputFocus = document.querySelectorAll('input')
const spanTitle = document.querySelectorAll('span')
const closeError = document.querySelector('.close-error')
const form = document.querySelector('form')

let inputName = document.querySelector('input[name=name]')
let inputEmail = document.querySelector('input[name=email]')
let showError = document.querySelector('.error')
let showSuccess = document.querySelector('.success')

// Manipulação dos spans dos inputs, movimentando-os quando o usuário clicar dentro do input (input:focus).
inputFocus.forEach((item, index) => {
    item.addEventListener('focusin', () => {
        if (item.value.length == 0) {
            spanTitle[index].style.transform = 'translateY(5px)'
        }
    })
})

inputFocus.forEach((item, index) => {
    item.addEventListener('focusout', () => {
        if (item.value.length == 0) {
            spanTitle[index].style.transform = 'translateY(30px)'
        }
    })
})

// Botão para fechar a div que aparece quando o usuário preenche os campos dos inputs incorretamente.
closeError.addEventListener('click', () => {
    showError.style.opacity = 0
    setTimeout(() => {
        showError.style.display = 'none'
    }, 500)
})

// Direcionar o usuário para o início do form, mostrando a mensagem de erro ou sucesso ao enviar os dados. (mobile)
button.addEventListener('click', () => {
    location.href = '#form'
})

// Imagem de loading que irá aparecer no botão quando o usuário enviar os dados do form.
const addLoading = () => {
    button.innerHTML = '<img src="loading.png" class="loading">'
}


/*
* Quando os dados do fetch forem enviados com sucesso, a imagem de loading é substituída pelo texto 'Enviar', os valores dos inputs são resetados, a div de erro é resetada ao seu estado padrão (display none) e a div de sucesso aparece durante 2 segundos e depois é resetada ao seu estado padrão (opacity 0 e display none)
* Obs1: a opacity 0 é adicionada dentro de um setTimeout para causar o efeito fadeOut após mostrar a div de sucesso.
* Obs2: a opacity 1 e o display none são adicionados dentro de um setTimeout (após o tempo da opacity 0) para que a div seja resetada caso o usuário faça novos submits.
*/
const removeLoading = () => {
    button.innerHTML = 'Enviar'
    inputName.value = ''
    inputEmail.value = ''
    showError.style.display = 'none'
    showSuccess.style.display = 'flex'
    setTimeout(() => {
        showSuccess.style.opacity = 0
    }, 2000)
    setTimeout(() => {
        showSuccess.style.opacity = 1
        showSuccess.style.display = 'none'
    }, 4000)
}

const handleSubmit = (event) => {
    event.preventDefault()

    if (inputName.value == '' || inputEmail == '') {
        showError.style.opacity = 1
        showError.style.display = 'flex'
    } else {

        addLoading()

        fetch('https://api.sheetmonkey.io/form/bFu2eMZN1XhhnKeTwKMghD', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: inputName.value, email: inputEmail.value })
        })
            .then(() => removeLoading())
    }
}

form.addEventListener('submit', handleSubmit)

let initialBtn = document.querySelector('.input-wrap .submit');
let options = document.querySelectorAll('.form-options div[data-type]');
let initialInput = document.querySelector('.input-wrap > input');
let data = {};


let validationObj = {
    name: [
        '/^$|\\s+/', 
        '/^[a-zA-Z]$/'
    ],
    phone: [
        '[^\\s]*',
        '/^([\+]370 ?[0-9]{3} ?[0-9]{2} ?[0-9]{3}$|8 ?6 ?[0-9] ?[0-9] ?[0-9] ?[0-9] ?[0-9] ?[0-9] ?[0-9] ?)$/'
    ]
}

let validationMsgs = {
    name: ["Laukelis privalomas.",  "Neteisingas formatas."],
    phone: ["Laukelis privalomas.",  "Neteisingas formatas."]
}

let placeholderText = {
    name: 'Vardas',
    phone: 'Tel. nr.'
}

if(initialBtn) {
    initialBtn.addEventListener("click", function(){
        removeErrorFields();
        //verify if input value correct
        let input = document.querySelector('.input-wrap input');
        checkValidation(input);
    })
}

if(options) {
    options.forEach(item => {
        item.addEventListener("click", () => {
            let dataName = item.getAttribute("data-type");
            replaceFormFields(dataName)
        })
    })
}

if(initialInput) {
    initialInput.addEventListener("focus", function() {
        addActiveClass(document.querySelector('[data-type='+ this.getAttribute('name') +']'))
    })

    initialInput.addEventListener("focusout", function() {
        if(this.value === '') {
            this.className = '';
        }
    })
}

function checkValidation(input) {
    let val = input.value;
    let nameAttr = input.getAttribute("name");
    let regexFields = validationObj[nameAttr];
    if(val.trim().length === 0) {
        appendHtmlField( validationMsgs[nameAttr][0], 'error-message', input)
        return;
    } 
    if (typeof(val) != 'string') {
        appendHtmlField( validationMsgs[nameAttr][1], 'error-message', input)
        return;
    } 

    data[nameAttr] = val;

    if(input.getAttribute("name") !== "phone") {
        replaceField(input);
        return;
    } else if(options.length !== Object.keys(data).length) {
        appendGeneralError();
        return;
    }
    sendForm();   
}

function sendForm(){

        fetch("../laminatesdantu/src/smartsheet/registration.php", {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(function(response) {
            console.log(response)
            if (response.ok) {
                return response.json();
            } else {
                appendGeneralError();
            }
        }).then(function(response){
            console.log(response)
            if(response.status == '200'){
                let sucessDiv = document.createElement("div");
                sucessDiv.className = 'success-block';
                sucessDiv.innerHTML = `<div>
                                            <h3>Jūs sėkmingai užsiregistravote</h3>
                                            <h3 class="main-text">konsultacijai dėl naujos šypsenos!</h3>
                                        </div>
                                        <img src="src/images/checkmark.svg">`;
                document.querySelector('.form-main-wrap').appendChild(sucessDiv);
            } else {
                appendGeneralError();
            }
        }).catch((error) => {
            console.log(error)
            appendGeneralError();
        })
}
     

function appendHtmlField(message, className, mainField){
    let errorField = document.createElement('div');
    errorField.classList.add(className);
    errorField.innerHTML = `<p>${message}</p>`;
    mainField.parentNode.insertBefore(errorField, mainField.nextSibling);
}

function replaceField(currentInput){
    let activeOptionName = currentInput.getAttribute('name')
    if(activeOptionName) {
        let callInputName = activeOptionName === 'name' ? 'phone' : 'name';
        replaceFormFields(callInputName)
    }
}


function callCompleteField() {
    let completeFields = document.querySelectorAll('.complete');
    completeFields.forEach(item => {
        let attribute = item.getAttribute("data-type");
        replaceFormFields(attribute);
    })
}

function replaceFormFields(attributeName) {
    let submitBtn = document.querySelector('.input-wrap span');
    let inputLabel = document.querySelector(".input-wrap p")
    let currentInput = document.querySelector('.input-wrap input');
    currentInput.setAttribute("name", attributeName);
    currentInput.value = data[attributeName] ? data[attributeName] : '';
    submitBtn.setAttribute("data-type", attributeName);
    inputLabel.innerHTML = placeholderText[attributeName];
    setTypeStatus(attributeName)
}

function setTypeStatus(inputName){
    options.forEach(item => {
        let attr = item.getAttribute("data-type");
        if(attr === inputName) {
            item.className = "active";
            return;
        } else if(data[attr]){
            item.className = "complete";
            return;
        }
        item.className = "";
    })
}

function addActiveClass(item){
    item.className = 'active';
}

function removeErrorFields(){
    document.querySelectorAll('.error-message').forEach(item => {
        item.remove();
    })
}

function appendGeneralError(){
    let inputField = document.querySelector('.input-wrap input');
    let errorMsg = 'Atsiprašome, įvyko klaida.';
    appendHtmlField(errorMsg, 'error-message', inputField)
}


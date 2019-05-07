const getInfoCard = {
    'mask-payment-system' : [
        {
            regex: '^(5[1-5]|(?:222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720))',
            cardtype: 'mastercard',
            img: 'image/mastercard.png'
        },
        {
            regex: '^4',
            cardtype: 'visa',
            img: 'image/visa.png'
        },
        {
            regex: '^(50|5[6-9]|6)',
            cardtype: 'maestro',
            img: 'image/maestro.png'
        }
    ],

    'mask-type-bank' : [
        {
            regex: '^(4279 22|4279 30|4279 02|4279 01|4279 59|4279 99|4279 16|4279 77|4279 48|4279 20|4279 66|4279 25|4279 75|4279 35|5313 10|5450 37|5158 42|5275 76|5439 42|6761 95|6761 96|6762 80|4274|4276|5437 63|5469|5479|5484)',
            cardtype: 'sberbank',
            color: 'rgb(125,194,68)',
            img: 'image/sberbank.png'
        },
        {
            regex: '^(4154 00|4341 35|4289 06|4277 14|4154 29|4790 04|4154 82|4289 05|4195 39|4154 81|4317 27|4652 27|4582 79|4779 60|4390 77|4105 84|4582 80|4790 87|4779 32|4787 52|4779 64|4584 50|4314 17|4288 04|4314 16|4195 40|4402 37|4390 00|4154 28|4584 10|4584 11|5486 74|5486 73|5521 75|5211 78)',
            cardtype: 'alfabank',
            color: 'rgb(230, 96, 87)',
            img: 'image/alfabank.png'
        },
        {
            regex: '^(5189 01|5213 24|5483 87)',
            cardtype: 'tinkoffbank',
            color: 'rgb(255,220,44)',
            img: 'image/tinkoffbank.png'
        },
        {
            regex: '^(4067 44|4188 31|4272 29|4272 30|4188 68|4188 69|4188 70|4188 73|4211 91|4263 75|4301 27|4317 23|4406 22|4406 23|4475 20|4874 95|4908 09|5102 29|5102 30|5120 19|5123 42|5126 40|5127 04|5127 36|5127 58|5128 12|5157 75|5157 86|5159 04|5160 77|5160 80|5160 84|5178 06|5183 36|5193 37|5200 62|5213 42|5239 42|5240 68|5248 95|5257 73|5268 66|5268 68|5268 73|5286 28|5101 44|5185 91|5186 40|5193 04|5199 98|5278 83|5290 25|5299 38|5452 24|5495 00|5543 86|5543 93|5585 18|6768 51|6768 60|6768 61|6768 88|6768 93|5149 08|5342 45|5342 60|5411 59|5472 09|5472 14|5477 79|5482 18|5482 26|5488 42|5498 91|5579 66|5104 10|5123 03|5176 47|5183 63|5257 87|6768 00|6768 02|6768 03|6768 05|6768 45|6768 96|6764 21)',
            cardtype: 'vtbbank',
            color: 'rgb(0,159,223)',
            img: 'image/vtbbank.png'
        }
    ],

    'error-info' : [
        {
            id: 'numberCard',
            'min-length': '19',
            'error-text': 'credit card number must be at least 16 characters'

        },
        {
            id: 'validThru',
            'min-length': '5',
            'error-text': 'date is incorrect'
        },
        {
            id: 'cvvCard',
            'min-length': '3',
            'error-text': 'is incorrect'
        },
        {
            id: 'userName',
            'min-length': '4',
            'error-text': 'user name must be at least 4 characters'
        }
    ]
}

const randomCard = {
    number: ['4582798945673214', '5313103235448532', '5213248558642486', '6768455486243644'],
    date: ['0519', '1124', '0221', '1220'],
    name: ['Clark Kent', 'Peter Parker', 'Bruce Wayne', 'Tony Stark'],
    cvv: ['123', '456', '789', '741']
}

const imgPaymentSystem = document.querySelector('.img-payment-system img'),
      imgTypeBank = document.querySelector('.img-type-bank img'),
      cardFace = document.querySelector('.card-face');

//number card mask
const maskNumberCard = () => {

    let maskCard = numberCard.value.replace(/\D/g, '').substring(0,16),
        foundPaymentSystem = false,
        foundTypeBank = false;

    maskCard = maskCard != '' ? maskCard.match(/.{1,4}/g).join(' ') : '';
    numberCard.value = maskCard;

    //payment system search
    for (key in getInfoCard['mask-payment-system']) {
        let regexPaymentSystem = new RegExp(getInfoCard['mask-payment-system'][key].regex)
    
        if (regexPaymentSystem.test(maskCard)) {
            imgPaymentSystem.src = getInfoCard['mask-payment-system'][key].img;
            foundPaymentSystem = true;
        }
    }

    //if the payment system was not found
    if (!foundPaymentSystem) imgPaymentSystem.src = '';


    //bank search
    for (key in getInfoCard['mask-type-bank']) {
        let regexTypeBank = new RegExp(getInfoCard['mask-type-bank'][key].regex)

        if (regexTypeBank.test(maskCard)) {
            let colorCard = getInfoCard['mask-type-bank'][key].color;
            imgTypeBank.src = getInfoCard['mask-type-bank'][key].img;
            foundTypeBank = true;
            cardFace.style.background = colorCard;
        }
    }

    //if the bank was not found
    if (!foundTypeBank) {
        imgTypeBank.src = '';
        cardFace.style.background = '#24335f';
    }
}

//the value of the filtered date is stored here
let oldValueDateCard = '';

//date mask
const maskValidThru = () => {
    let maskCard = validThru.value.replace(/\D/g, '').substring(0,4),
        validExample = validThru.getAttribute('data-valid-example'),
        pattern = new RegExp('(1[0-2]|0[1-9])/(19|2[0-9])');
        testValue = '';

    maskCard = maskCard != '' ? maskCard.match(/.{1,2}/g).join('/') : '';
    testValue = maskCard + validExample.substr(maskCard.length);
    
    //if the regular expression does not match
    if (!pattern.test(testValue)) maskCard = oldValueDateCard;

    validThru.value = maskCard;
    oldValueDateCard = maskCard;
}

//user name mask
const maskUserName = () => {
    let maskCard = userName.value.replace(/[^a-z -]/ig, '').toUpperCase().substring(0, 17);
    userName.value = maskCard;
}

//cvv mask
const maskCvvCard = () => {
    let maskCard = cvvCard.value.replace(/\D/g, '').substring(0,3);
    cvvCard.value = maskCard;
}

numberCard.addEventListener('input', maskNumberCard);
validThru.addEventListener('input', maskValidThru);
userName.addEventListener('input', maskUserName);
cvvCard.addEventListener('input', maskCvvCard);


//minimum length check
const lengthСheckInputCard = event => {

    let inputErrorCard;

    //if the focus is back
    const focusInput = event => {
        inputErrorCard.remove();
        event.target.classList.remove('form-error');
    }

    for (key in getInfoCard['error-info']) {

        //compare id
        if (event.target.id == getInfoCard['error-info'][key].id) {
            
            //if the minimum length is less
            if (event.target.value.length < getInfoCard['error-info'][key]['min-length']) {
                event.target.classList.add('form-error');

                inputErrorCard = document.createElement('div');
                inputErrorCard.classList.add('error-credit-card');
                inputErrorCard.innerHTML = getInfoCard['error-info'][key]['error-text'];
                event.target.parentNode.appendChild(inputErrorCard);

                event.target.addEventListener('focus', focusInput);
            }
        }
    }
}

numberCard.addEventListener('blur', lengthСheckInputCard);
validThru.addEventListener('blur', lengthСheckInputCard);
userName.addEventListener('blur', lengthСheckInputCard);
cvvCard.addEventListener('blur', lengthСheckInputCard);

//===================================================
//credit card examples

let nextCard = 0;

const generaterCardRandom = () => {
    if (nextCard == 4) nextCard = 0;

    numberCard.value = randomCard.number[nextCard];
    validThru.value = randomCard.date[nextCard];
    userName.value = randomCard.name[nextCard];
    cvvCard.value = randomCard.cvv[nextCard];

    nextCard++;

    maskNumberCard();
    maskValidThru();
    maskUserName();
    maskCvvCard();
}

generaterCard.addEventListener('click', generaterCardRandom);
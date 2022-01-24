/*Country selector and postal code: Start*/
const selectOptions = (id,id2,selector) =>{
    const openList      = document.getElementById(id);
    const conteinerList = document.getElementById(id2);
    const list          = document.querySelector(selector);

    openList.style = 'transform: rotate(180deg)';
    openList.classList.toggle('arrow_down');
    list.style = 'clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 100%);';

    conteinerList.addEventListener('click',e=>{
        if(!document.getElementById(id).classList.contains('arrow_down')){
            document.getElementById(id).style = 'transform: rotate(0deg);';
            document.querySelector(selector).style = 'clip-path: polygon(0 0, 100% 0%, 100% 0, 0 0);';
        };
    });
};

const inputValue = (selector,id) =>{
    selector.forEach(res =>{
        res.addEventListener('click',e=>{
            document.getElementById(id).value = res.textContent;
        });
    });
};

document.getElementById('list_numbers-options').addEventListener('click',e=>{
    selectOptions('open_list-numbers','list_numbers-options','.ul_list-numbers');
    inputValue(document.querySelectorAll('.li_option-number'),'phone');
});  

document.getElementById('list_options-country').addEventListener('click',e=>{
    selectOptions('open_list-country','list_options-country','.ul_list-country');
    inputValue(document.querySelectorAll('.li_option-country'),'country');
});
/*Country selector and postal code: Start*/

/*Validate form: Start*/
const validate = {
    email: /^[a-zA-Z\d_+-]+@[a-zA-Z\d_+-]+\.[a-zA-Z\d]{2,4}$/,
    phone: /^[\+0-9]{1,3}?[\d]\s\d{10}$/,
    name: /^[a-zA-ZÀ-ÿ\s]{1,30}$/,
    address: /^[a-zA-ZÀ-ÿ.,0-9\s]{3,100}$/,
    city:  /^[a-zA-ZÀ-ÿ.,0-9\s]{3,100}$/,
    country:  /^[a-zA-Z]{3,15}$/,
    postal: /^\d{4}$/
};

const confirmForm = {
    email: false,
    phone: false,
    name: false,
    address: false,
    city: false,
    country: false,
    postal: false
};

const validateFild = (exp,input,team) =>{
    if(exp.test(input)){
        document.querySelector(`#team_${team} .icon_status`).setAttribute('src','recursos/check.svg');
        document.querySelector(`#team_${team} .icon_status`).classList.add('icon_status-check');
        document.querySelector(`#team_${team} .icon_status`).classList.remove('icon_status-error');
        document.querySelector(`#team_${team} .icon_status-check`).style = 'opacity: 1;'; 
        document.querySelector(`#team_${team} .form_input`).style = 'border: 1px solid #00A19D';
        document.querySelector(`#team_${team} .message_error`).classList.remove('message_error-activo');
        confirmForm[team] = true;
    }else{
        document.querySelector(`#team_${team} .icon_status`).setAttribute('src','recursos/error.svg');
        document.querySelector(`#team_${team} .icon_status`).classList.remove('icon_status-check');
        document.querySelector(`#team_${team} .icon_status`).classList.add('icon_status-error');
        document.querySelector(`#team_${team} .icon_status-error`).style = 'opacity: 1;'; 
        document.querySelector(`#team_${team} .form_input`).style = 'border: 1px solid #E05D5D';
        document.querySelector(`#team_${team} .message_error`).classList.add('message_error-activo');
        confirmForm[team] = false;
    };
};

const validateForm = e =>{
        switch(e.target.name){
            case 'email':
                validateFild(validate.email,e.target.value,'email');
            break;
            case 'phone':
                validateFild(validate.phone,e.target.value,'phone');
            break;
            case 'name':
                validateFild(validate.name,e.target.value,'name');
            break;
            case 'address':
                validateFild(validate.address,e.target.value,'address');
            break;
            case 'city':
                validateFild(validate.city,e.target.value,'city');
            break;
            case 'country':
                validateFild(validate.country,e.target.value,'country');
            break;
            case 'postal':
                validateFild(validate.postal,e.target.value,'postal');
            break;
        };
};

document.querySelectorAll('.form_input').forEach(input =>{
    input.addEventListener('keyup',validateForm);
    input.addEventListener('blur',validateForm);
});

document.getElementById('btn_continue').addEventListener('click',e =>{
    e.preventDefault();
    
    if(confirmForm['email'] && confirmForm['phone'] && confirmForm['name'] && confirmForm['address'] && confirmForm['city'] && confirmForm['country'] && confirmForm['postal']){
        document.querySelectorAll('.form').forEach(form => form.reset());
        confirmForm['email']   = false;
        confirmForm['phone']   = false;
        confirmForm['name']    = false;
        confirmForm['address'] = false;
        confirmForm['city']    = false;
        confirmForm['country'] = false;
        confirmForm['postal']  = false;

        document.querySelector('.message_final-error').style = 'display: none;';
        document.querySelector('.message_final-success').style = 'display: inline-block;';

        setTimeout(()=>{
            document.querySelector('.message_final-success').style = 'display: none;';
        },4000);

        document.querySelectorAll(`.icon_status`).forEach(icon =>{
            icon.removeAttribute('src','recursos/check.svg');
            icon.classList.remove('icon_estado-check');
        });
        document.querySelectorAll('.form_input').forEach(input => input.style = 'border: 1px solid #595260');
    }else{
        document.querySelector('.message_final-error').style = 'display: inline-block;';
    };
});
/*Validate form: End*/

/*Save user info: Start*/
const saveInfo = () =>{
    const input = document.getElementById('save_input');
    const info  = {
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        country: document.getElementById('country').value,
        postal: document.getElementById('postal').value,
    };

    if(confirmForm['email'] && confirmForm['phone'] && confirmForm['name'] && confirmForm['address'] && confirmForm['city'] && confirmForm['country'] && confirmForm['postal'] && input.checked){
        localStorage.setItem('information',JSON.stringify(info)); 
    };
};

document.getElementById('save_input').addEventListener('change',saveInfo);

addEventListener('load',e=>{
    if(localStorage.length >= 1){
        document.querySelector('.save_information').style = 'display: none';
        document.querySelector('.auto_information').style = 'display: flex';
    }
});
/*Save user info: End*/

/*Autocomplete filds: Start*/
document.getElementById('auto_input').addEventListener('change',()=>{
    const input = document.getElementById('auto_input');
    if(localStorage.length >= 1 && input.checked){
        const info     = localStorage.getItem('information');
        const storage  = JSON.parse(info);
        document.getElementById('email').value   = storage.email;
        document.getElementById('phone').value   = storage.phone;
        document.getElementById('name').value    = storage.name;
        document.getElementById('address').value = storage.address;
        document.getElementById('city').value    = storage.city;
        document.getElementById('country').value = storage.country;
        document.getElementById('postal').value  = storage.postal;
    }else{
        document.querySelectorAll('.form').forEach(form => form.reset());
    };
});
/*Autocomplete filds: End*/

/*Add or subtract items: Start*/
const add = item =>{
    const sum = parseInt(document.querySelector(`#contador_${item} .item_accountant`).textContent) + 1;
    document.querySelector(`#contador_${item} .item_accountant`).textContent = sum;
}

const subtract = item =>{
    let accountant     = document.querySelector(`#contador_${item} .item_accountant`).textContent;
    let subtraction    = parseInt(accountant) - 1;
        for(let i=0; i<accountant; i++){
            document.querySelector(`#contador_${item} .item_accountant`).textContent = subtraction;
        }; 
}

document.querySelectorAll('.arrow').forEach(arrow => {
    arrow.addEventListener('click',e=>{
        const target = e.target.classList;
        if(target.contains('restar') && target.contains('zapatillas')) subtract('zapatillas');
        else if(target.contains('sumar') && target.contains('zapatillas')) add('zapatillas');
        else if(target.contains('restar') && target.contains('mochila')) subtract('mochila');
        else if(target.contains('sumar') && target.contains('mochila')) add('mochila');
    });
});
/*Add or subtract items: End*/

/*Lightbox: Start*/
document.querySelectorAll('.img_article').forEach(img =>{
    img.addEventListener('click',e =>{
        const srcImage = img.getAttribute('src');
        const altImage = img.getAttribute('alt');
        document.querySelector('.img_box-show').style = 'transform: scale(1);';
        document.querySelector('.img_box-show').setAttribute('src',srcImage);
        document.querySelector('.parrafo_img').textContent = altImage;
        document.querySelector('.light_box-contenedor').style = 'transform: translateX(0);';
    });
});

document.querySelector('.close_box').addEventListener('click',e =>{
    document.querySelector('.light_box-contenedor').style = 'transform: translateX(-100%);';
    document.querySelector('.img_box-show').style = 'transform: scale(0);';
});
/*Lightbox: End*/
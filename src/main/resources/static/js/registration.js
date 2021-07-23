function getIndex(list,id) {
    for (var i =0; i< list.length; i++) {
        if (list[i].id === id) {
            return i;
        }
    }
    return -1;
}
function checkUsername(list,username) {
    for (var i =0; i< list.length; i++) {
        if ((list[i].username == username)&&(username.length>0)) {
            return list[i].id;
        }
    }
    return 0;
}

function makePassword(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function is_empty(x) {
    return (
        (typeof x == 'undefined')
        ||
        (x == null)
        ||
        (x == false)  //same as: !x
        ||
        (x.length == 0)
        ||
        (x == "")
        ||
        (x.replace(/\s/g,"") == "")
        ||
        (!/[^\s]/.test(x))
        ||
        (/^\s*$/.test(x))
    );
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function  checkEmailExist(req) {
    axios.get(req).then(responce => {
        if(responce.data.userExist==1) {
            return true;
        } else {
            return false;
        }

    });

}
var userApi = Vue.resource('/userlist{/id}');

Vue.component('user-form', {
    props: ['userAttr', 'showModal'],
    data: function() {
        return {
            id:'',
            firstname: '',
            lastname: '',
            secname: '',
            organization: '',
            degree: '',
            organizationPostAddress: '',
            userEmail: '',
            phoneNumber: '',
            personalDataAgree: '',
            password: '',
            passwordConfirm: '',
        }
    },


    watch:{
        userAttr: function(newVal){
            this.id = newVal.id;
            this.firstname = newVal.firstname;
            this.lastname = newVal.lastname;
            this.secname = newVal.secname;
            this.organization = newVal.organization;
            this.degree = newVal.degree;
            this.organizationPostAddress = newVal.organizationPostAddress;
            this.userEmail = newVal.userEmail;
            this.phoneNumber = newVal.phoneNumber;
            this.personalDataAgree = newVal.personalDataAgree;
            this.password = newVal.password;
            this.passwordConfirm = newVal.passwordConfirm;
        }
    },
    template:
      '<div>'+

        '<modal v-if="showModal" @close="$root.showModal = false">'+
            '<h3 slot="header">{{this.$root.modalHeader}}</h3>'+
            '<div slot="modalGreeting">{{this.$root.modalGreeting}}</div>'+
            '<div slot="body">{{this.$root.modalBody}}</div>'+
        '</modal>'+


        '<div style="background: #fff;">'+
                        '<h2 class="display-4 mt-5 mb-5" style="padding-top:40px;">Регистрация участника конференции</h2>'+
                    '</div>'+
                    '<div class="card">'+
                        '<h5 class="text-white  card-header" style="background: #68a225;">Ввод данных для регистрации участника</h5>'+
                        '<div class="card-body">'+
                        '<form>'+
                            '<div class="form-row">'+
                                '<div class="form-group col-md-4">'+
                                    '<label for="lastname">Фамилия</label>'+
                                        '<div class="input-group">'+
                                            '<input type="text" class="form-control" id="lastname" v-model="lastname" placeholder="Фамилия" :maxlength="30">'+
                                                '<div v-show="lastname.length>0" class="input-group-prepend">' +
                                                    '<div class="input-group-text" v-text="30 - lastname.length">@</div>' +
                                                '</div>'+
                                         '</div>'+
                                     '<p class="alert alert-danger" v-show ="$root.userLastnameAlert">Укажите Фамилию!</p>'+
                                '</div>'+
                                '<div class="form-group col-md-4">'+
                                    '<label for="firstname">Имя</label>'+
                                    '<div class="input-group rounded">'+
                                        '<input type="text" class="form-control" id="firstname" v-model="firstname" placeholder="Имя" :maxlength="30">'+
                                        '<div v-show="firstname.length>0" class="input-group-prepend">' +
                                            '<div class="input-group-text" v-text="30 - firstname.length">@</div>' +
                                        '</div>'+
                                    '</div>'+
                                    '<p class="alert alert-danger" v-show ="$root.userFirstnameAlert">Укажите Имя!</p>'+
                                '</div>'+

                                '<div class="form-group col-md-4">'+
                                    '<label for="secname">Отчество</label>'+
                                    '<div class="input-group">'+
                                        '<input type="text" class="form-control" id="secname" v-model="secname" placeholder="Отчество" :maxlength="30">'+
                                        '<div v-show="secname.length>0" class="input-group-prepend">' +
                                            '<div class="input-group-text" v-text="30 - secname.length">@</div>' +
                                        '</div>'+
                                    '</div>'+
                                    '<p class="alert alert-danger" v-show ="$root.userSecnameAlert">Укажите Отчество!</p>'+
                                '</div>'+
                            '</div>'+

                            '<div class="form-row">'+
                                '<div class="form-group col-md-6">'+
                                    '<label for="organization">Организация</label>'+
                                    '<div class="input-group">'+
                                        '<input type="text" class="form-control" id="organization" v-model="organization" placeholder="Организация" :maxlength="130">'+
                                        '<div v-show="organization.length>0" class="input-group-prepend">' +
                                            '<div class="input-group-text" v-text="130 - organization.length">@</div>' +
                                        '</div>'+
                                    '</div>'+
                                    '<p class="alert alert-danger" v-show ="$root.userOrganizationAlert">Укажите Организацию!</p>'+
                                '</div>'+
                                '<div class="form-group col-md-6">'+
                                    '<label for="degree">Специальность по сертификату</label>'+
                                    '<div class="input-group">'+
                                        '<input type="text" class="form-control" id="degree" v-model="degree" placeholder="Специальность по сертификату" :maxlength="130">'+
                                        '<div v-show="degree.length>0" class="input-group-prepend">' +
                                            '<div class="input-group-text" v-text="130 - degree.length">@</div>' +
                                        '</div>'+
                                    '</div>'+
                                    '<p class="alert alert-danger" v-show ="$root.degreeAlert">Необходимо указать специальность по сертификату!</p>'+
                                '</div>'+
                            '</div>'+

                            '<div class="form-row">'+
                                '<div class="form-group col-md-12">'+
                                    '<label for="organizationPostAddress">Почтовый адрес организации(с указанием страны, субъекта)</label>'+
                                    '<div class="input-group">'+
                                        '<input type="text" class="form-control" id="organizationPostAddress" v-model="organizationPostAddress" placeholder="Почтовый адрес организации(с указанием страны, субъекта)" :maxlength="130">'+
                                        '<div v-show="organizationPostAddress.length>0" class="input-group-prepend">' +
                                            '<div class="input-group-text" v-text="130 - organizationPostAddress.length">@</div>' +
                                        '</div>'+
                                    '</div>'+
                                    '<p class="alert alert-danger" v-show ="$root.organizationPostAddressAlert">Укажите почтовый адрес организации!</p>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-row">'+
                                '<div class="form-group col-md-6">'+
                                    '<label for="userEmail">Email</label>'+
                                    '<div class="input-group">'+
                                        '<input type="email" class="form-control" id="userEmail" v-model="userEmail" placeholder="Email" :maxlength="30">'+
                                        '<div v-show="userEmail.length>0" class="input-group-prepend">' +
                                            '<div class="input-group-text" v-text="30 - userEmail.length">@</div>' +
                                        '</div>'+
                                    '</div>'+
                                    '<p class="alert alert-danger" v-show ="$root.userEmailAlert">Укажите Email!</p>'+
                                    '<p class="alert alert-danger" v-show ="(($root.invalidEmail)&&($root.userEmailAlert==false))">Укажите валидный Email!</p>'+
                                    '<p class="alert alert-danger" v-show ="(($root.existEmail)&&($root.invalidEmail==false)&&($root.userEmailAlert==false))">Данный адрес электронной почты уже зарегистрирован в системе, регистрация более одной учетной записи на один адрес электронной почты не допустима! Если у Вас возникли проблемы при входе в систему - обратитесь к разработчику kotov.irk@gmail.com  </p>'+
                                '</div>'+
                                '<div class="form-group col-md-6">'+
                                    '<label for="phoneNumber">Контактный телефон в международном формате</label>'+
                                    '<input type="tel" class="form-control" id="phoneNumber" v-model="phoneNumber" placeholder="+7XXXXXXXXXX" :maxlength="16">'+
                                    '<p class="alert alert-danger" v-show ="$root.userPhoneNumberAlert">Необходимо указать контактный телефон в международном формате!</p>'+

                                '</div>'+
                            '</div>'+

                            '<div class="form-row">'+
                                '<div class="form-group col-md-6">'+
                                    '<label for="userEmail">Пароль(не менее 10 символов)</label>'+
                                    '<div class="input-group">'+
                                        '<input type="password" class="form-control" id="password" v-model="password" placeholder="Пароль" :maxlength="30">'+
                                            '<div v-show="userEmail.length>0" class="input-group-prepend">' +
                                                '<div class="input-group-text" v-text="30 - password.length">@</div>' +
                                            '</div>'+
                                    '</div>'+
                                    '<p class="alert alert-danger" v-show ="$root.userPasswordAlert">Укажите Пароль!</p>'+
                                    '<p class="alert alert-danger" v-show ="$root.passwordMismatchAlert">Пароли не совпадают!</p>'+
                                    '<p class="alert alert-danger" v-show ="$root.passwordLenghAlert">Пароль не может быть короче 10 символов!</p>'+
                                '</div>'+
                                '<div class="form-group col-md-6">'+
                                    '<label for="passwordConfirm">Подтверждение пароля</label>'+
                                    '<div class="input-group">'+
                                        '<input type="password" class="form-control" id="passwordConfirm" v-model="passwordConfirm" placeholder="Подтверждение пароля" :maxlength="30">'+
                                            '<div v-show="passwordConfirm.length>0" class="input-group-prepend">' +
                                                '<div class="input-group-text" v-text="30 - passwordConfirm.length">@</div>' +
                                            '</div>'+
                                    '</div>'+
                                    '<p class="alert alert-danger" v-show ="$root.userPasswordConfirmAlert">Укажите подтверждение пароля!</p>'+

                                '</div>'+
                            '</div>'+


                            '<div class="form-row">'+
                                '<div  class="form-group col-md-6">'+
                                    '<label for="custom-control custom-checkbox">Даю согласие на обработку персональных данных</label>'+
                                        '<div class="custom-control custom-checkbox">' +
                                            '<b-form-checkbox type="checkbox" class="form-check-input" id="personalDataAgree"  v-model="personalDataAgree" switch></b-form-checkbox>'+
                                            '<p class="alert alert-danger" v-show ="$root.personalDataAgreeAlert">Небходимо дать согласие на обработку персональных данных!</p>'+
                                        '</div>'+
                                '</div>'+
                            '</div>'+

                            '<div class="form-group row">'+
                                '<div class="col-sm-10">'+
                                    '<input v-if="($root.editClicked == false)" type="button"  class="btn btn-outline-light" style="background: #68a225; margin-top: 20px;" value="Зарегистрироваться" @click="save"/>'+
                                '</div>'+
                            '</div>'+
                        '</form>'+
                    '</div>'+
                '</div>'+
        '</div>'+

      '</div>',

    methods: {
        save: function () {

            //this.password = makePassword(10);
            //alert("пароль сгенерирован автоматичеки: " + this.password);

            var user = {
                firstname: capitalizeFirstLetter(this.firstname),
                lastname: capitalizeFirstLetter(this.lastname),
                secname: capitalizeFirstLetter(this.secname),
                organization: capitalizeFirstLetter(this.organization),
                degree: capitalizeFirstLetter(this.degree),
                organizationPostAddress: capitalizeFirstLetter(this.organizationPostAddress),
                userEmail: this.userEmail.toLowerCase(),
                phoneNumber: this.phoneNumber,
                personalDataAgree: this.personalDataAgree,
                password: this.password,
                passwordConfirm: this.passwordConfirm,
            };



            if (is_empty(this.password)) {
                this.$root.userPasswordAlert = true;
            } else this.$root.userPasswordAlert = false;

            if (is_empty(this.passwordConfirm)) {
                this.$root.userPasswordConfirmAlert = true;
            } else this.$root.userPasswordConfirmAlert = false;

            if (this.passwordConfirm!==this.password) {
                this.$root.passwordMismatchAlert = true;
            } else this.$root.passwordMismatchAlert = false;

            if (this.password.length <10) {
                this.$root.passwordLenghAlert = true;
            } else this.$root.passwordLenghAlert = false;





            if (is_empty(this.firstname)) {
                this.$root.userFirstnameAlert = true;
            } else this.$root.userFirstnameAlert = false;

            if (is_empty(this.lastname)) {
                this.$root.userLastnameAlert = true;
            } else this.$root.userLastnameAlert = false;

            if (is_empty(this.secname)) {
                this.$root.userSecnameAlert = true;
            } else this.$root.userSecnameAlert = false;

            if (is_empty(this.organization)) {
                this.$root.userOrganizationAlert = true;
            } else this.$root.userOrganizationAlert = false;

            if (is_empty(this.degree)) {
                this.$root.degreeAlert = true;
            } else this.$root.degreeAlert = false;

            if (is_empty(this.organizationPostAddress)) {
                this.$root.organizationPostAddressAlert = true;
            } else this.$root.organizationPostAddressAlert = false;

            if (is_empty(this.userEmail)) {
                this.$root.userEmailAlert = true;
            } else this.$root.userEmailAlert = false;

            if (is_empty(this.phoneNumber)) {
                this.$root.userPhoneNumberAlert = true;
            } else this.$root.userPhoneNumberAlert = false;

            if (!this.personalDataAgree) {
                this.$root.personalDataAgreeAlert = true;
            } else this.$root.personalDataAgreeAlert = false;

            if (validateEmail(this.userEmail.toLowerCase())) {
                this.$root.invalidEmail = false
            } else {
                this.$root.invalidEmail = true;
            }

            axios.get("/checkUser/"+this.userEmail.toLowerCase()).then(responce => {

                if(responce.data.userExist==1) {
                    this.$root.existEmail = true;
                } else
                if(responce.data.userExist==0) {
                    this.$root.existEmail = false;
                } else {
                    this.$root.existEmail = true;
                    alert("Не удалось проверить существование ящика!");
                }

            });




            if ((!this.$root.userFirstnameAlert) &&
                (!this.$root.userLastnameAlert) &&
                (!this.$root.userSecnameAlert) &&
                (!this.$root.userOrganizationAlert) &&
                (!this.$root.degreeAlert) &&
                (!this.$root.organizationPostAddressAlert) &&
                (!this.$root.userEmailAlert) &&
                (!this.$root.userPhoneNumberAlert) &&
                (!this.$root.personalDataAgreeAlert) &&
                (!this.$root.invalidEmail) &&
                (!this.$root.passwordLenghAlert) &&
                (!this.$root.passwordMismatchAlert) &&
                (!this.$root.userPasswordAlert) &&
                (!this.$root.existEmail) &&
                (!this.$root.userPasswordConfirmAlert)
            ) {
                userApi.save({}, user);
                this.$root.modalHeader = this.lastname +' '+this.firstname+' '+this.secname+', Вы успешно зарегистрированы в качестве участника конференции! ';
                this.$root.modalBody= 'Для подачи заявки на участие в конференции Вам необходимо войти в систему и перейти в раздел "Мои заявки". В качестве имени пользователя необходимо использовать указанный при регистрации адрес электронной почты.';
                this.$root.modalFooter='ИГМУ 2019';
                this.$root.showModal=true;




                this.id=''
                this.firstname =''
                this.lastname = ''
                this.secname = ''
                this.organization = ''
                this.degree = ''
                this.organizationPostAddress = ''
                this.userEmail = ''
                this.phoneNumber = ''
                this.personalDataAgree = ''
                this.password = ''
                this.passwordConfirm = ''
            }
        },
    }

});



var app;

app = new Vue({
    el: '#app',
    template:
        '<div>'+
            '<user-form :userAttr="user" :showModal="showModal"/>' +
        '</div>',
    data: {
        user:[],
        editClicked:false,
        userFirstnameAlert:false,
        userLastnameAlert:false,
        userSecnameAlert:false,
        userOrganizationAlert:false,
        degreeAlert:false,
        organizationPostAddressAlert:false,
        userEmailAlert:false,
        userPhoneNumberAlert:false,
        personalDataAgreeAlert:false,
        invalidEmail:false,
        userExistAlert:false,
        userGroupNameAler:false,
        showModal: false,
        passwordLenghAlert: false,
        passwordMismatchAlert: false,
        userPasswordAlert: false,
        userPasswordConfirmAlert: false,
        existEmail: false,


    },


});

Vue.component('modal', {
    template: '#modal-template'
})


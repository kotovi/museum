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
    var possible = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmn_+-!pqrstuvwxyz123456789";

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

function is_empty(x)
{
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
var userApi = Vue.resource('/students{/id}');

Vue.component('user-form', {
    props: ['userAttr', 'showModal', 'groups'],
    data: function() {
        return {
            id:'',
            firstname: '',
            lastname: '',
            secname: '',
            userEmail: '',
            phoneNumber: '',
            personalDataAgree: '',
            password: '',
            passwordConfirm: '',
            userGroup: '',
            userAgreement: false,
            notificationAgree: false,
            personalDataAgree: false,
        }
    },


    watch:{
        userAttr: function(newVal){
            this.id = newVal.id;
            this.firstname = newVal.firstname;
            this.lastname = newVal.lastname;
            this.secname = newVal.secname;
            this.userEmail = newVal.userEmail;
            this.phoneNumber = newVal.phoneNumber;
            this.personalDataAgree = newVal.personalDataAgree;
            this.password = newVal.password;
            this.passwordConfirm = newVal.passwordConfirm;
            this.userGroup = newVal.userGroup;
        }
    },
    template:
      '<div>'+

        '<modal v-if="showModal" @close="$root.showModal = false">'+
            '<h3 slot="header">{{this.$root.modalHeader}}</h3>'+
            '<div slot="modalGreeting">{{this.$root.modalGreeting}}</div>'+
            '<div slot="body">{{this.$root.modalBody}}</div>'+
        '</modal>'+


        '<div style="background: #dfffff;">'+
            '<h1 class="display-4 mt-5 mb-5" style="padding-top:40px;">Регистрация слушателя</h1>'+
                    '</div>'+
                    '<div class="card">'+
                        '<h5 class="text-white  card-header" style="background: #68a225;">Ввод данных для регистрации слушателя</h5>'+
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
                                    '<label for="userEmail">Email</label>'+
                                    '<div class="input-group">'+
                                        '<input type="email" class="form-control" id="userEmail" v-model="userEmail" placeholder="Email" :maxlength="30">'+
                                        '<div v-show="userEmail.length>0" class="input-group-prepend">' +
                                            '<div class="input-group-text" v-text="30 - userEmail.length">@</div>' +
                                        '</div>'+
                                    '</div>'+
                                    '<p class="alert alert-danger" v-show ="$root.userEmailAlert">Укажите Email!</p>'+
                                    '<p class="alert alert-danger" v-show ="(($root.invalidEmail)&&($root.userEmailAlert==false))">Укажите валидный Email!</p>'+
                                    '<p class="alert alert-danger" v-show ="(($root.existEmail)&&($root.invalidEmail==false)&&($root.userEmailAlert==false))">Данный адрес электронной почты уже зарегистрирован в системе, регистрация более одной учетной записи на один адрес электронной почты не допустима!  </p>'+
                                '</div>'+
                                '<div class="form-group col-md-6">'+
                                    '<label for="phoneNumber">Контактный телефон в международном формате</label>'+
                                    '<input type="tel" class="form-control" id="phoneNumber" v-model="phoneNumber" placeholder="+7XXXXXXXXXX" :maxlength="16">'+
                                    '<p class="alert alert-danger" v-show ="$root.userPhoneNumberAlert">Необходимо указать контактный телефон в международном формате!</p>'+

                                '</div>'+
                            '</div>'+

                            '<div class="form-row">'+
                                '<div class="form-group col-md-4">'+
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
                                '<div class="form-group col-md-4">'+
                                    '<label for="passwordConfirm">Подтверждение пароля</label>'+
                                    '<div class="input-group">'+
                                        '<input type="password" class="form-control" id="passwordConfirm" v-model="passwordConfirm" placeholder="Подтверждение пароля" :maxlength="30">'+
                                            '<div v-show="passwordConfirm.length>0" class="input-group-prepend">' +
                                                '<div class="input-group-text" v-text="30 - passwordConfirm.length">@</div>' +
                                            '</div>'+
                                    '</div>'+
                                    '<p class="alert alert-danger" v-show ="$root.userPasswordConfirmAlert">Укажите подтверждение пароля!</p>'+

                                '</div>'+
                                '<div class="form-group col-md-4">'+
                                    '<label for="userGroup">Группа</label>'+
                                    '<select class="custom-select" id="userGroup"  v-model="userGroup" >'+
                                        '<option selected value="0" >Нет</option>'+
                                        '<option v-for="group in groups"  v-bind:value="group.id">{{group.groupName}}</option>'+
                                    '</select>'+
                                    '<p class="alert alert-danger" v-show ="$root.userGroupNameAlert">Нужно выбрать группу пользоателей, к которой Вы относитесь!</p>'+
                                '</div>'+

                            '</div>'+


                            '<div class="form-row">'+
                                '<div  class="form-group col-md-4">'+
                                    '<label for="custom-control custom-checkbox">Cогласие на обработку ПД</label>'+
                                    '<div class="custom-control custom-checkbox">' +
                                        '<b-form-checkbox type="checkbox" class="form-check-input" id="personalDataAgree"  v-model="personalDataAgree" switch></b-form-checkbox>'+
                                        '<p class="alert alert-danger" v-show ="$root.personalDataAgreeAlert">Небходимо дать согласие на обработку персональных данных!</p>'+
                                    '</div>'+
                                '</div>'+
                                '<div  class="form-group col-md-4">'+
                                    '<label for="custom-control custom-checkbox">Пользовательское соглашение</label>'+
                                    '<div class="custom-control custom-checkbox">' +
                                        '<b-form-checkbox type="checkbox" class="form-check-input" id="userAgreement"  v-model="userAgreement" switch></b-form-checkbox>'+
                                        '<p class="alert alert-danger" v-show ="$root.userAgreementAlert">Небходимо принять условия пользовательского соглашения</p>'+
                                    '</div>'+
                                '</div>'+
                                '<div  class="form-group col-md-4">'+
                                    '<label for="custom-control custom-checkbox">Согласие на рассылку</label>'+
                                    '<div class="custom-control custom-checkbox">' +
                                        '<b-form-checkbox type="checkbox" class="form-check-input" id="notificationAgree"  v-model="notificationAgree" switch></b-form-checkbox>'+
                                        '<p class="alert alert-danger" v-show ="$root.notificationAgreeAlert">Небходимо Дать согласие на отправку уведомлений</p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+

                            '<div class="form-group row">'+
                                '<div class="col-sm-10">'+
                                    '<input v-if="($root.editClicked == false)" type="button"  class="btn btn-success" style="background: #68a225; margin-top: 20px;" value="Зарегистрироваться" @click="save"/>'+
                                '</div>'+
                            '</div>'+
                        '</form>'+
                    '</div>'+
                '</div>'+
        '</div>'+

      '</div>',

    methods: {
        save: function () {

            var user = {
                firstname: capitalizeFirstLetter(this.firstname),
                lastname: capitalizeFirstLetter(this.lastname),
                secname: capitalizeFirstLetter(this.secname),
                userEmail: this.userEmail.toLowerCase(),
                phoneNumber: this.phoneNumber,
                password: this.password,
                passwordConfirm: this.passwordConfirm,
                userAgreement: this.userAgreement,
                personalDataAgree: this.personalDataAgree,
                notificationAgree: this.notificationAgree,
                userGroup:  this.userGroup,
            };


            if (!this.userAgreement){
                this.$root.userAgreementAlert=true;
            } else this.$root.userAgreementAlert=false;

            if (!this.personalDataAgree){
                this.$root.personalDataAgreeAlert=true;
            } else this.$root.personalDataAgreeAlert=false;

            if (!this.notificationAgree){
                this.$root.notificationAgreeAlert=true;
            } else this.$root.notificationAgreeAlert=false;


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

            if (!isNumeric(this.userGroup)) {
                this.$root.userGroupNameAlert = true;
            } else this.$root.userGroupNameAlert = false;

            if (is_empty(this.firstname)) {
                this.$root.userFirstnameAlert = true;
            } else this.$root.userFirstnameAlert = false;

            if (is_empty(this.lastname)) {
                this.$root.userLastnameAlert = true;
            } else this.$root.userLastnameAlert = false;

            if (is_empty(this.secname)) {
                this.$root.userSecnameAlert = true;
            } else this.$root.userSecnameAlert = false;

            if (is_empty(this.userEmail)) {
                this.$root.userEmailAlert = true;
            } else this.$root.userEmailAlert = false;

            if (is_empty(this.phoneNumber)) {
                this.$root.userPhoneNumberAlert = true;
            } else this.$root.userPhoneNumberAlert = false;

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
                (!this.$root.userEmailAlert) &&
                (!this.$root.userPhoneNumberAlert) &&
                (!this.$root.personalDataAgreeAlert) &&
                (!this.$root.invalidEmail) &&
                (!this.$root.passwordLenghAlert) &&
                (!this.$root.passwordMismatchAlert) &&
                (!this.$root.userPasswordAlert) &&
                (!this.$root.existEmail) &&
                (!this.$root.userPasswordConfirmAlert) &&
                (!this.$root.userAgreementAlert) &&
                (!this.$root.personalDataAgreeAlert) &&
                (!this.$root.userGroupNameAler) &&
                (!this.$root.notificationAgreeAlert)
            ) {
                userApi.save({}, user);
                alert("Вы успешно зарегистрированы в качестве участника!" +
                    "Для просмотра записей докладов Вам необходимо  авторизоваться на сайте и перейти в раздел \"Доклады\"." );
                window.location = '/';


                this.id=''
                this.firstname =''
                this.lastname = ''
                this.secname = ''
                this.userEmail = ''
                this.userGroup = ''
                this.phoneNumber = ''
                this.password = ''
                this.passwordConfirm = ''
                this.userAgreement = false
                this.personalDataAgree = false
                this.notificationAgree = false
            } else {
                alert('Проверьте корректность заполнения полей!');
            }

        },
    }

});



var app;

app = new Vue({
    el: '#app',
    template:
        '<div>'+
        '<user-form :userAttr="user" :showModal="showModal" :groups="groups"/>' +
        '</div>',
    data: {
        user:[],
        groups:[],
        editClicked:false,
        userFirstnameAlert:false,
        userLastnameAlert:false,
        userSecnameAlert:false,
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
        userAgreementAlert: false,
        personalDataAgreeAlert: false,
        notificationAgreeAlert: false,
        userGroupNameAler:false,
    },
    created: function () {
        axios.get('/studentgroup').then(result => {
            this.groups = result.data
        });
    },


});

Vue.component('modal', {
    template: '#modal-template'
})





function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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


Vue.component('user-form', {
    props: ['userAttr', 'nav'],
    data: function() {
        return {
            userEmail: '',
        }
    },


    watch: {
        userAttr: function (newVal) {
            this.userEmail = newVal.userEmail;
        }
        },

        template:
            '<body id="page-top">'+
                '<nav class="navbar navbar-expand-lg navbar-light fixed-top navbar-fixed-top-dark py-3" id="mainNav">'+
                    '<div class="container">'+
                        '<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"'+
                        'data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"'+
                        'aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>'+
                        '<div class="collapse navbar-collapse" id="navbarResponsive">'+
                            '<ul class="navbar-nav ml-auto my-2 my-lg-0 ">'+
                                '<li class="nav-item"><a class="nav-link js-scroll-trigger" href="/">Главная</a></li>'+
                                '<li class="nav-item"><a class="nav-link js-scroll-trigger" href="#authors">Организаторы</a></li>'+
                                '<li class="nav-item"><a class="nav-link js-scroll-trigger" href="/#reports">Доклады</a></li>'+
                                '<li class="nav-item"><a class="nav-link js-scroll-trigger" href="/seminars">Семинары</a></li>'+
                                '<li v-if="nav.userRole==3"  class="nav-item"><a class="nav-link js-scroll-trigger" href="/tezis">Управление докладами</a></li>'+
                                '<li v-if="nav.userRole==3"  class="nav-item"><a class="nav-link js-scroll-trigger" href="/registred">Пользователи</a></li>'+
                                '<li v-if="nav.firstname==null" class="nav-item"><a class="nav-link js-scroll-trigger" href="#join">Принять участие</a></li>'+
                                '<li class="nav-item"><a v-if="nav.firstname!=null" class="nav-link" href="/logout">Вы вошли как: {{nav.firstname}} {{nav.lastname}} | Выйти</a></li>'+
                                '<li class="nav-item"><a v-if="nav.firstname==null" class="nav-link" href="/login">Войти</a></li>'+
                            '</ul>'+
                        '</div>'+
                    '</div>'+
                '</nav>'+
                '<div style="background: #fff; margin-bottom: 100px;" class="container">' +
                    '<div class="row justify-content-center">' +
                        '<div class="col-lg-6 col-md-6 text-center">' +
                            '<fieldset>' +
                                '<h1 class="display-4 mt-5 mb-5 text-muted" style="padding-top:40px;">Сброс пароля</h1>' +
                                '<div class="form-group">' +
                                    '<label class="text-muted" for="firstname">Логин(e-mail) при регистрации:</label>' +
                                    '<input type="text" name="userEmail" id="userEmail" v-model="userEmail" class="form-control input-lg" placeholder="Email" required="true" autofocus="true"/>' +
                                    '<p class="alert alert-danger" v-show ="$root.userEmailAlert">Укажите Email!</p>' +
                                    '<p class="alert alert-danger" v-show ="(($root.invalidEmail)&&($root.userEmailAlert==false))">Укажите валидный Email!</p>' +
                                '</div>' +
                                '<div class="form-group">' +
                                    '<label class="text-muted" for="firstname">Подтверждаю сброс пароля:</label>' +
                                    '<div class="custom-control custom-checkbox">' +
                                        '<b-form-checkbox type="checkbox" class="form-check-input" id="personalDataAgree"  v-model="personalDataAgree" switch></b-form-checkbox>' +
                                        '<p class="alert alert-danger" v-show ="$root.personalDataAgreeAlert">Небходимо дать согласие на сброс пароля!</p>' +
                                    '</div>' +
                                '</div>' +
                                '<input type="submit" class="btn btn-primary" style="margin: 10px;" value="Запросить сброс пароля" @click="save"/>' +
                            '</fieldset>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</body>',

        methods: {
            save: function () {
                var user = {
                    userEmail: this.userEmail.toLowerCase(),
                };

                if (is_empty(this.userEmail)) {
                    this.$root.userEmailAlert = true;
                } else this.$root.userEmailAlert = false;

                if (!this.personalDataAgree) {
                    this.$root.personalDataAgreeAlert = true;
                } else this.$root.personalDataAgreeAlert = false;

                if (validateEmail(this.userEmail.toLowerCase())) {
                    this.$root.invalidEmail = false
                } else {
                    this.$root.invalidEmail = true;
                }

                if ((!this.$root.userEmailAlert) &&
                    (!this.$root.personalDataAgreeAlert) &&
                    (!this.$root.invalidEmail)
                ) {
                   // alert( "Работает!" + this.userEmail);

                    //userApi.save({}, user);
                    window.location.href = "/reqpassword/"+this.userEmail;
                    this.userEmail = ''
                    this.personalDataAgree = ''

                }
            },
        }
});



var app;

app = new Vue({
    el: '#app',
    template:
        '<div>'+
        '<user-form :userAttr="user" :nav="nav" />' +
        '</div>',
    data: {
        user:[],
        nav:'',
        personalDataAgreeAlert:false,
        userEmailAlert:false,
        invalidEmail: false,
    },
    created: function () {
        axios.get('/nav').then(result => {
            this.nav=result.data,
                window.userId = result.data.id,
                window.userGroup = result.data.userGroup
        });
    },


});

Vue.component('modal', {
    template: '#modal-template'
})


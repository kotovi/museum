

var navbarApi = Vue.resource('/nav');
var role = "ADMIN";
Vue.component('nav-row' , {
    props: ['nav'],

    template:
    '<div>'+
        '<nav style="background: #256c00;" class="navbar  navbar-expand-lg  fixed-top">'+
            '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">'+
                '<span class="navbar-toggler-icon"></span>'+
            '</button>'+
                '<div class="collapse navbar-collapse" id="navbarSupportedContent">'+
                    '<ul class="navbar-nav mr-auto">'+
                        '<a class="btn btn-outline-light mr-2" href="/">Главная</a>'+
                        '<a v-if="nav.userRole > 0" class="btn btn-outline-light mr-2" href="/report">Доклады</a>'+
                        '<div class="dropdown">'+
                            '<button  v-if="nav.userRole > 1" class="btn btn-outline-light dropdown-toggle mr-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Пользователи</button>'+
                            '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'+
                                '<a class="dropdown-item" href="/registred">Зарегистрированные</a>'+
                            '</div>'+
                        '</div>'+
                    '</ul>'+
                    '<a v-if="nav.firstname!=null" class="btn btn-outline-light mr-2" href="/logout">Вы вошли как: {{nav.firstname}} {{nav.secname}} {{nav.lastname}} | Выйти</a>'+
                    '<a v-if="nav.firstname==null" class="btn btn-outline-light mr-2" href="/login">Войти</a>'+
                '</div>'+
        '</nav>'+
    '</div>'
});
var app2;
app2 = new Vue({
    el: '#app-nav',
    template:
        '<div>'+
            '<nav-row :nav="nav" />'+
        '</div>',
    data: {
        nav:'',
        userId:'',
        userGroup:'',
    },

    created: function () {

        var ua = window.navigator.userAgent.toLowerCase(),
            is_ie = (/trident/gi).test(ua) || (/msie/gi).test(ua);
        if (is_ie){
            alert("Внимание! Для корректной работы сайта необходимо использовать браузер Google Chrome, Mozilla Firefox, Opera, Safari. В браузерах семейства Internet Explorer Корректная работа сайта не гарантируется!!!");
        }


        navbarApi.get().then(result =>
                        result.json().then(data =>
                                    (this.nav = data,
                                    window.userId = data.id,
                                     window.userGroup = data.userRole)
                                    ))
    },


});
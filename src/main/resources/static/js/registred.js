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
var registredApi = Vue.resource('/userlist');

Vue.component('agree-row' , {
    props: ['agree','agrees','pageNumber'],
    template:
            '<div class="card mx-auto" style="margin: 25px;">'+
                '<div class="card-header  text-white bg-primary ">'+
                    '<h5>Пользователь #{{this.agrees.indexOf(this.agree)+ 1 + this.pageNumber * 10}}</h5>'+
                '</div>'+
                '<div class="card-body">'+
                    '<ul class="list-group list-group-flush">'+
                        '<li class="list-group-item"><h5 class="card-title">{{agree.firstname}} {{agree.secname}} {{agree.lastname}}</h5></li>'+
                        '<li class="list-group-item"><b>Специальность по сертификату:</b> {{agree.degree}}</li>'+
                        '<li class="list-group-item"><b>Организация:</b> {{agree.organization}}</li>'+
                        '<li class="list-group-item"><b>Адрес организации:</b> {{agree.organizationPostAddress}}</li>'+
                        '<li class="list-group-item"><b>Электронная почта:</b> {{agree.userEmail}}</li>'+
                        '<li class="list-group-item"><b>Телефон:</b> +7 {{agree.phoneNumber}}</li>'+
                        '<li class="list-group-item"><b>Дата регистрации:</b> {{agree.registrationDate}}</li>'+
                    '</ul>'+
                '</div>'+
            '</div>',

});

Vue.component('agrees-list', {
    props: ['agrees', 'size'],
    data: function(){
        return {
            agree: null,
            pageNumber: 0,
            agreesPages:[],
            search:'',
        }
    },
    methods:{
        nextPage(){
            this.pageNumber++;

        },
        prevPage(){
            this.pageNumber--;
        }
    },
    computed:{
        filteredList() {
            const s = this.search.toLowerCase();
            return this.agrees.filter(o=>_.some(o, v =>_.toLower(v).indexOf(s)>-1));

        },
        pageCount(){
            let l = this.filteredList.length,
                s = 9;
            return Math.ceil(l/s);

        },
        paginatedData(){
            const start = this.pageNumber * 9,
                end = start + 9;

            this.agreesPages = this.filteredList.slice(start, end);
            return this.agreesPages;
        }
    },

    template:
        '<div style="position: relative;">'+
        '<div class="row h-100  justify-content-center text-justify">'+
            '<h1 class="display-4 mt-5 mb-5 text-muted" style="padding-top:40px;">Пользователи</h1>'+
            '<h4 class="card-subtitle text-muted mb-1 mt-2 fw-bold">Всего(с учетом поиска): {{this.filteredList.length}}</h4>'+
            '<input style="margin: 20px;" v-model="search" id="search" class="form-control" placeholder="Поиск">'+
            '<div v-show="agrees.length < 1" class="alert"  role="alert" style="margin: 170px; background: #293f50;">' +
                '<h1 class="display-4 mt-5 mb-5 text-muted" style="padding-top:40px;">Зарегистрированных пользователей нет!</h1>' +
            '</div>'+
            '<div class="card-columns">'+
                '<agree-row v-for="agree in paginatedData" :key="agree.id" :agree = "agree" :agrees="paginatedData"  :pageNumber="pageNumber"/>' +
            '</div>'+
            '<div align="center" style="margin: 20px;">'+
                '<button class="btn btn-primary" style=" margin-top: 2px;" :disabled="pageNumber === 0" @click="prevPage"> < Назад</button> {{this.pageNumber}}  <button class="btn btn-primary" style=" margin-top: 2px;" :disabled="pageNumber >= pageCount -1" @click="nextPage">Вперед > </button>'+
            '</div>'+
            '</div>'+
        '</div>',

});

var app;
app = new Vue({
    el: '#app',
    template:
        '<body id="page-top">'+
            '<nav class="navbar navbar-expand-lg navbar-light fixed-top navbar-fixed-top-dark  py-3" id="mainNav">'+
                '<div class="container">'+
                    '<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"'+
                    'data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"'+
                    'aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>'+
                    '<div class="collapse navbar-collapse" id="navbarResponsive">'+
                         '<ul class="navbar-nav ml-auto my-2 my-lg-0 ">'+
                             '<li class="nav-item"><a class="nav-link js-scroll-trigger" href="/">Главная</a></li>'+
                             '<li class="nav-item"><a class="nav-link js-scroll-trigger" href="/#authors">Организаторы</a></li>'+
                             '<li class="nav-item"><a class="nav-link js-scroll-trigger" href="/#reports">Доклады</a></li>'+
                             '<li class="nav-item"><a class="nav-link js-scroll-trigger" href="/seminars">Семинары</a></li>'+
                             '<li v-if="nav.userRole==3"  class="nav-item"><a class="nav-link js-scroll-trigger" href="/registred">Пользователи</a></li>'+
                             '<li v-if="nav.firstname==null" class="nav-item"><a class="nav-link js-scroll-trigger" href="/#join">Принять участие</a></li>'+
                             '<li class="nav-item"><a v-if="nav.firstname!=null" class="nav-link" href="/logout">Вы вошли как: {{nav.firstname}} {{nav.lastname}} | Выйти</a></li>'+
                             '<li class="nav-item"><a v-if="nav.firstname==null" class="nav-link" href="/login">Войти</a></li>'+
                         '</ul>'+
                    '</div>'+
                '</div>'+
            '</nav>'+
            '<agrees-list :agrees="agrees"/> ' +
        '</body>',
    data: {
        agrees:[],
        nav:'',
    },

    created: function () {
        axios.get('/userlist').then(result => {
            this.agrees=result.data
        });
        axios.get('/nav').then(result => {
            this.nav=result.data,
                window.userId = result.data.id,
                window.userGroup = result.data.userGroup
        });
    },
});

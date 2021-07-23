
var app2;
var role = "ADMIN";
Vue.component('nav-row' , {
    props: ['nav'],

    template:
        '<nav class="navbar  navbar-expand-md navbar-dark bg-primary">'+
        '<a class="navbar-brand" href="#">Portal</a>'+
                '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">'+
                    '<span class="navbar-toggler-icon"></span>'+
                '</button>'+
                '<div class="collapse navbar-collapse" id="navbarSupportedContent">'+
                    '<ul class="navbar-nav mr-auto">'+
                        '<li class="nav-item active">'+
                            '<a class="nav-link" href="/">Домой <span class="sr-only">(current)</span></a>'+
                        '</li>'+
                        '<li v-if="nav.userRole==null" class="nav-item active">'+
                            '<a class="nav-link" href="/registration">Регистрация слушателя<span class="sr-only">(current)</span></a>'+
                        '</li>'+
                        '<li v-if="nav.userRole<4" class="nav-item active">'+
                            '<a class="nav-link" href="/courcemaker">Курсы<span class="sr-only">(current)</span></a>'+
                        '</li>'+
                        '<li v-if="nav.userRole==1" class="nav-item active">'+
                            '<a class="nav-link" href="/usermaker">Пользователи<span class="sr-only">(current)</span></a>'+
                        '</li>'+
                        '<li v-if="nav.userRole==1" class="nav-item active">'+
                            '<a class="nav-link" href="/group">Группы<span class="sr-only">(current)</span></a>'+
                        '</li>'+
                        '<li v-if="nav.userRole==1" class="nav-item active">'+
                            '<a class="nav-link" href="/srvconf">Сервер<span class="sr-only">(current)</span></a>'+
                        '</li>'+
                        '<li v-if="nav.userRole<3" class="nav-item active">'+
                            '<a class="nav-link" href="/llist">Все лекции<span class="sr-only">(current)</span></a>'+
                        '</li>'+
                        '<li v-if="nav.userRole==1" class="nav-item active">'+
                            '<a class="nav-link" href="/studentlist">Слушатели<span class="sr-only">(current)</span></a>'+
                        '</li>'+
                        '<li v-if="nav.userRole==4" class="nav-item active">'+
                            '<a class="nav-link" href="/watchlist">Доступные курсы<span class="sr-only">(current)</span></a>'+
                        '</li>'+
                    '</ul>'+

        '<a v-if="nav.firstname!=null" class="btn btn-outline-light" href="/logout">Вы вошли как: {{nav.firstname}} {{nav.lastname}} | Выйти</a>'+
        '<a v-if="nav.firstname==null" class="btn btn-outline-light btn-sm" style="margin: 0px;" href="/login">Войти</a>'+
                '</div>'+

        '</nav>'

});
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

        axios.get('/nav').then(result => {
            this.nav=result.data,
                window.userId = result.data.id,
                window.userGroup = result.data.userGroup
        });

    },
});
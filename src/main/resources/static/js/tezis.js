function getIndex(list,id) {
    for (var i =0; i< list.length; i++) {
        if (list[i].id === id) {
            return i;
        }
    }
    return -1;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function is_empty(x) {
    return (
        (typeof x == 'undefined') ||
        (x == null) ||
        (x == false) ||
        (x.length == 0) ||
        (x == "") ||
        (x.replace(/\s/g,"") == "") ||
        (!/[^\s]/.test(x)) ||
        (/^\s*$/.test(x))
    );
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

var tezisApi = Vue.resource('/tezises{/id}');

Vue.component('tezis-form', {
    props: ['teziss', 'tezisAttr'],
    data: function() {
        return {
            id:'',
            tezisType:'',
            tezisName:'',
            tezisAnnotation:''
        }
    },

    watch:{
        tezisAttr: function(newVal){
            this.id = newVal.id;
            this.tezisName = newVal.tezisName;
            this.tezisAnnotation = newVal.tezisAnnotation;
        }
    },
    template:
            '<div v-if="$root.showInputForm" class="card h-60" >'+
                '<div class="card-header">'+
                    '<h5 v-show="($root.editClicked == false)">Добавление доклада</h5>'+
                    '<h5 v-show="($root.editClicked == true)">Редактирование доклада</h5>'+
                '</div>'+

                '<div class="card-body">'+
                    '<form>'+
                        '<div class="form-row">'+
                            '<div class="form-group col-md">'+
                                '<label for="tezisName">Название доклада</label>'+
                                '<div class="input-group">'+
                                    '<input type="text" class="form-control" id="tezisName" v-model="tezisName" placeholder="Название доклада" :maxlength="3000">'+
                                    '<div v-show="tezisName.length>0" class="input-group-prepend">' +
                                        '<div class="input-group-text" v-text="3000 - tezisName.length">@</div>' +
                                    '</div>'+
                                '</div>'+
                                '<p class="alert alert-danger" v-show ="$root.tezisNameAlert">Укажите название доклада!</p>'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-row">'+
                            '<div class="form-group col-md">'+
                                '<label for="tezisAnnotation">Аннотация доклада</label>'+
                                '<div class="input-group">'+
                                    '<textarea type="text" class="form-control" id="tezisAnnotation" v-model="tezisAnnotation" placeholder="Аннотация длинной до 1000 символов" :maxlength="3000"></textarea>'+
                                    '<div v-show="tezisAnnotation.length>0" class="input-group-prepend">' +
                                        '<div class="input-group-text" v-text="3000 - tezisAnnotation.length">@</div>' +
                                    '</div>'+
                                '</div>'+
                                '<p class="alert alert-danger" v-show ="$root.tezisAnnotationAlert">Укажите аннотацию!</p>'+
                            '</div>'+
                        '</div>'+
                        '<div class="justify-content-center row">'+
                            '<div class=" row col-md-5 ">' +
                                '<input v-if="($root.editClicked == false)" type="button" class="btn btn-primary mx-auto d-block"  value="Создать" @click="save"/>'+
                                '<input v-if="($root.editClicked == true)" type="button" class="btn btn-primary mx-auto d-block" value="Сохранить" @click="save"/>'+
                                '<input  type="button" class="btn btn-primary mx-auto d-block" value="Отмена" @click="cancel"/>'+
                            '</div>'+

                        '</div>'+
                    '</form>'+
                '</div>'+
        '</div>',

    methods: {

        backToRoot: function(){
            window.location.href = '/';
        },
        cancel: function (){
            this.tezisAnnotation='';
            this.tezisName='';
            this.$root.editClicked=false;
            this.$root.showInputForm=false;
        },

        save: function () {

            var tezis = {
                tezisName: capitalizeFirstLetter(this.tezisName),
                tezisAnnotation: capitalizeFirstLetter(this.tezisAnnotation),
            };


            if (is_empty(this.tezisName)) {
                this.$root.tezisNameAlert = true;
            } else this.$root.tezisNameAlert = false;


            if ((!this.$root.tezisNameAlert)
            ) {


                if (this.id) {
                    this.$root.editClicked = false;

                    tezisApi.update({id: this.id}, tezis).then(result =>
                    result.json().then(data => {
                        var index = getIndex(this.teziss, data.id);
                    this.$root.editClicked = false;
                    this.teziss.splice(index, 1, data);

                    this.id='';
                    this.tezisName='';
                    this.tezisAnnotation='';
                        this.$root.showInputForm=false;

                })
                )

                } else {

                    tezisApi.save({}, tezis).then(result =>
                    result.json().then(data => {
                        this.teziss.push(data);
                    this.tezisName='';
                    this.tezisAnnotation='';
                        this.$root.showInputForm=false;

                })
                )
                }
            }
            this.$root.editClicked=false;
            this.$root.showInputForm=false;

            }
        }

});

Vue.component('tezis-row' , {
    props: ['tezis', 'editMethod', 'teziss'],
    template:
        '<div class="card" style="margin: 25px;">'+
            '<div class="card-header  text-white bg-primary ">'+
                '<h5>Доклад #{{this.teziss.indexOf(this.tezis) + 1}}</h5>'+
            '</div>'+
            '<div class="card-body">'+
                '<ul class="list-group list-group-flush">'+
                    '<li class="list-group-item"><b>Название:</b>{{tezis.tezisName}}</li>'+
                    '<li class="list-group-item"><b>Описание:</b>{{tezis.tezisAnnotation}}</li>'+
                    '<li class="list-group-item"><b>Добавлен:</b>{{tezis.tezisAddDate}}</li>'+
                '</ul>'+
            '</div>'+
            '<div class="card-footer">'+
                '<div class="row">'+
                    '<input type = "button" class="btn btn-sm btn-primary" style="margin: 5px;"   value="Изменить" @click="edit" />' +
                    '<input type = "button" class="btn btn-sm btn-primary" style="margin: 5px;"   value="Файлы"  @click="files" />' +
                    '<input type = "button" class="btn btn-sm btn-danger" style="margin: 5px;"  value="x" v-on:click="del"  @click="del" />'+
                '</div>'+
            '</div>'+
        '</div>',

    methods: {
        edit: function(){
            this.editMethod(this.tezis);
            this.$root.showInputForm = true;
            this.$root.editClicked = true;
        },
        del: function() {
            if (this.$root.editClicked == true) {
                alert("Перед удалением необходимо завершить редактирование!");
            } else {
                tezisApi.remove({id: this.tezis.id}).then(result => {
                    if (result.ok) { this.teziss.splice(this.teziss.indexOf(this.tezis), 1) }
            })
            }
        },
        files: function (){
            window.location.href = 'files?tezisId=' + this.tezis.id;
        }
    }

});

Vue.component('teziss-list', {
    props: ['teziss', 'moderators', 'nav'],
    data: function(){
        return {
            tezis: null,
        }
    },

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
                            '<li v-if="nav.userRole==3"  class="nav-item"><a class="nav-link js-scroll-trigger" href="/tezis">Управление докладами</a></li>'+
                            '<li v-if="nav.userRole==3"  class="nav-item"><a class="nav-link js-scroll-trigger" href="/registred">Пользователи</a></li>'+
                            '<li v-if="nav.firstname==null" class="nav-item"><a class="nav-link js-scroll-trigger" href="/#join">Принять участие</a></li>'+
                            '<li class="nav-item"><a v-if="nav.firstname!=null" class="nav-link" href="/logout">Вы вошли как: {{nav.firstname}} {{nav.lastname}} | Выйти</a></li>'+
                            '<li class="nav-item"><a v-if="nav.firstname==null" class="nav-link" href="/login">Войти</a></li>'+
                        '</ul>'+
                    '</div>'+
                '</div>'+
            '</nav>'+
            '<div class="row h-100  justify-content-center text-justify">'+
                '<div class="cols mx-auto d-block w-75">' +
                    '<h1 class="text-muted text-center" style="margin-top: 80px;">Доклады</h1>'+
                    '<input v-if="(($root.editClicked == false)&($root.showInputForm == false))" type="button" class="btn btn-primary  mx-auto d-block"  value="Добавить" @click="createTezis"/>'+
                    '<hr>'+
                    '<tezis-form :teziss="teziss"  :tezisAttr="tezis"  />'+
                    '<div v-if="!$root.showInputForm" class="card-columns">'+
                        '<tezis-row v-for="tezis in teziss" :key="tezis.id" :tezis = "tezis" :editMethod="editMethod" :teziss="teziss"/>' +
                    '</div>'+
                    '<div v-if="((teziss.length <1)&(!$root.showInputForm))" class="alert alert-warning" role="alert" style="margin: 50px;">'+
                        '<p>В систему не добавлен ни один доклад!</p><p> Вы можете создать доклад, нажав на кнопку "Добавить".</p>' +
                    '</div>'+
                    '<hr style="margin-bottom: 40px;">'+
                '</div>'+
        '</div>'+
        '</body>',


    methods: {
        editMethod: function(tezis){
            this.tezis = tezis;
        },
        createTezis: function () {
            this.$root.showInputForm = true;
        }
    }

});

var app;

app = new Vue({
    el: '#app',
    template:
        '<div>'+
            '<teziss-list :teziss="teziss"   :nav="nav"/> '+
        '</div>',
    data: {

        teziss:[],
        desks:[],
        editClicked:false,
        tezisTypeAlert:false,
        deskIdAlert:false,
        tezisNameAlert:false,
        tezisAnnotationAlert:false,
        fileIsEmpty:true,
        fileSizeAlert:false,
        fileTypeAlert:false,
        ext:'',
        randomFileName:'',
        showModal:false,
        nav:'',
        showInputForm:false,
    },

    created: function () {

        axios.get('/tezises').then(result => {
            if(result.data.length>0){
                this.teziss=result.data
            }
        });

        axios.get('/nav').then(result => {
            this.nav=result.data;
        });

    },
});



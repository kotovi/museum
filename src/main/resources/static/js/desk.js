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

var deskApi = Vue.resource('/desks{/id}');

Vue.component('desk-form', {
    props: ['desks', 'deskAttr', 'moderators'],
    data: function() {
        return {
            id:'',
            deskName:'',
            deskDescription:'',
            moderatorId:'',

        }
    },

    watch:{
        deskAttr: function(newVal){
            this.id = newVal.id;
            this.deskName = newVal.deskName;
            this.deskDescription = newVal.deskDescription;
            this.moderatorId = newVal.moderatorId;
            
        }
    },
    template:
        '<div>'+
        '<h1 class="display-4 mt-5 mb-5" style="padding-top:40px;">Секции конференции</h1>'+
        '<div class="card" style="margin: 15px;">'+
        '<h5 v-show="($root.editClicked == false)" class="text-white  card-header" style="background: #293f50;">Добавление секции конференции</h5>'+
        '<h5 v-show="($root.editClicked == true)" class="text-white  card-header" style="background: #293f50;">Редактирование секции конференции</h5>'+
        '<div class="card-body">'+
            '<form>'+
                '<div class="form-desk col-sm-12">'+
                    '<label for="deskName">Название секции</label>'+
                    '<input type="text" class="form-control" id="deskName" v-model="deskName" placeholder="Название секции">'+
                    '<p class="alert alert-danger" v-show ="$root.userDeskNameAlert">Укажите название секции!</p>'+
                '</div>'+
                '<div class="form-desk col-sm-12">'+
                    '<label for="deskDeskription">Аннотация группы</label>'+
                    '<textarea type="text" class="form-control" id="deskDeskription" v-model="deskDescription" placeholder="Аннотация секции "></textarea>'+
                    '<p class="alert alert-danger" v-show ="$root.userDeskDescriptionAlert">Укажите краткую аннотацию секции !</p>'+
                '</div>'+
                '<div class="form-desk col-sm-12">'+
                    '<label for="moderatorId">Куратор секции</label>'+
                    '<select class="custom-select" id="moderatorId"  v-model="moderatorId">'+
                        '<option selected value="0" >Укажите секцию конференции</option>'+
                        '<option v-for="moderator in moderators "  v-bind:value="moderator.id">{{moderator.firstname}} {{moderator.secname}} {{moderator.lastname}} </option>'+
                    '</select>'+
                    '<p class="alert alert-danger" v-show ="$root.moderatorIdAlert">Укажите куратора секции секции !</p>'+
                '</div>'+
                '<div class="form-desk col-sm-12">'+
                    '<input v-if="($root.editClicked == false)" type="button"  class="btn btn-outline-light" style="background: #293f50; margin-top: 20px;" value="Создать" @click="save"/>'+
                    '<input v-if="($root.editClicked == true)"  type="button"  class="btn btn-outline-light" style="background: #293f50; margin-top: 20px;" value="Сохранить" @click="save"/>'+
                    '<input  type = "button" class="btn btn-outline-light" style="background: #293f50; margin-top: 20px; margin-left: 6px;" value="На главную" @click="backToRoot"/>'+
                '</div>'+
            '</form>'+
        '</div>'+
        '</div>'+
        '</div>',

    methods: {
        backToRoot: function(){
            window.location.href = '/';
        },

        save: function () {
            var desk = {
                deskName: capitalizeFirstLetter(this.deskName),
                deskDescription: capitalizeFirstLetter(this.deskDescription),
                moderatorId: this.moderatorId,

            };


            if (is_empty(this.deskName)) {
                this.$root.userDeskNameAlert = true;
            } else this.$root.userDeskNameAlert = false;

            if (is_empty(this.deskDescription)) {
                this.$root.userDeskDescriptionAlert = true;
            } else this.$root.userDeskDescriptionAlert = false;


            if ((!this.$root.userdeskAnnotationAlert) &&
                (!this.$root.userdeskNameAlert)
            ) {

                if (this.id) {
                    this.$root.editClicked = false;
                    deskApi.update({id: this.id}, desk).then(result =>
                    result.json().then(data => {
                        var index = getIndex(this.desks, data.id);
                    this.$root.editClicked = false;
                    this.desks.splice(index, 1, data);
                    this.id = ''
                    this.deskName = ''
                    this.deskDescription = ''
                    this.moderatorId = ''
                    })
                )

                } else {
                    deskApi.save({}, desk).then(result =>
                    result.json().then(data => {
                        this.desks.push(data);
                    this.deskName = ''
                    this.deskDescription = ''
                    this.moderatorId = ''
                    })
                )
                }
            }
        }
    }
});

Vue.component('desk-row' , {
    props: ['desk', 'editMethod', 'desks'],
    template:
        '<tr>'+
        '<td width="10%">{{desk.id}}</td>'+
        '<td width="26%">{{desk.deskName}}</td>'+
        '<td width="30%">{{desk.deskDescription}}</td>'+
        '<td width="34%">'+
            '<input type = "button"   v-on:click="$root.editClicked = true" class="btn btn-outline-light" style="background: #293f50; margin: 2px;" value="Изменить" @click="edit" />' +
            '<input type = "button"   class="btn btn-outline-light" style="background: #293f50; margin: 2px;" value="X" @click="del" />'+
        '</td>'+
        '</tr>',
    methods: {
        edit: function(){
            this.editMethod(this.desk);
        },
        del: function() {
            if (this.$root.editClicked == true) {
                alert("Пееред удалением необходимо завершить редактирование!");
            } else {
                deskApi.remove({id: this.desk.id}).then(result => {
                    if (result.ok) { this.desks.splice(this.desks.indexOf(this.desk), 1) }
            })
            }

        }
    }

});

Vue.component('desks-list', {
    props: ['desks', 'moderators'],
    data: function(){
        return {
            desk: null
        }
    },

    template:
        ' <div style="position: relative;">'+

        '<desk-form :desks="desks" :moderators="moderators" :deskAttr="desk"/>'+
        '<div  v-show="this.$root.editClicked==false" class="card" style="margin: 15px;">'+
            '<h5 class="text-white  card-header" style="background: #293f50;">Секции конференции</h5>'+
                '<div class="card-body">'+
                    '<table class="table">'+
                        '<thead>'+
                            '<tr>'+
                                '<th width="10%" scope="col">id</th>'+
                                '<th width="26%" scope="col">Название секции</th>'+
                                '<th width="30%" scope="col">Аннотация</th>'+
                                '<th width="34%" scope="col">Действие</th>'+
                            '</tr>'+
                        '</thead>'+
                        '<tbody>'+
                            '<desk-row v-for="desk in desks" :key="desk.id" :desk = "desk" ' +
                            ':editMethod="editMethod" :desks="desks"/>' +
                        '</tbody>' +
                    '</table>' +
                 '</div>'+
            '</div>'+
        '</div>',

    methods: {
        editMethod: function(desk){
            this.desk = desk;
        },
    }

});

var app;

app = new Vue({
    el: '#app',
    template:
        '<div>'+
        '<desks-list :desks="desks" :moderators="moderators" /> ' +
        '</div>',
    data: {
        moderators:[],
        desks:[],
        editClicked:false,
        userDeskNameAlert:false,
        userDeskDescriptionAlert:false,



    },

    created: function () {
        deskApi.get({id: this.$root.id}).then(result =>
                result.json().then(data =>
                    data.forEach(desk => {this.desks.push(desk);})
                )
         );

        axios.get('/moderators').then(result => {
            this.moderators=result.data
        });

    },
});

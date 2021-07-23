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



Vue.component('file-form', {
    props: ['files', 'fileAttr' , 'showModal'],
    data: function() {
        return {
            id:'',
            fileName:'',
            fileDescription:'',
            randomFileName:'',
            creatorId:'',
            createDateTime:'',
            isSuccessFileUpload:false,
            isUnsuccessFileUpload:false,
            fileType:''
        }
    },

    watch:{
        fileAttr: function(newVal){
            this.id = newVal.id;
            this.fileName = newVal.fileName;
            this.fileDescription = newVal.fileDescription;
            this.randomFileName = newVal.randomFileName;
            this.creatorId = newVal.creatorId;
            this.createDateTime = newVal.createDateTime;
        }
    },
    template:

        '<div>'+
            '<div v-if="$root.showModal">'+
                '<div class="modal-mask">'+
                    '<div class="modal-wrapper">'+
                        '<div class="modal-container">'+
                            '<div class="modal-title">'+
                                '<button class="close" @click="closeAlarmWindow">&times;</button>'+
                                'Добавление файла'+
                                '<hr>'+
                            '</div>'+
                            '<div v-if="($root.editClicked == false)" class="form-row">'+
                                '<div class="form-group col-md-12">'+
                                    '<label>Прикрепить файл</label>'+
                                    '<div class="custom-file">'+
                                        '<input type="file" class="custom-file-input" id="file" ref="file" v-on:change="handleFileUpload()">'+
                                        '<label class="custom-file-label" for="file">{{fileName}}</label>'+
                                        '<p class="alert alert-danger" v-show ="$root.fileSizeAlert">Размер файла не должен превышать 100МБ</p>'+
                                        '<p class="alert alert-danger" v-show ="$root.fileTypeAlert">Недопустимый тип файла! Загружать можно только .pdf или .mp4! </p>'+
                                        '<p class="alert alert-danger" v-show ="$root.fileNameAlert">Не выбран файл! </p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-row">'+
                                '<div class="form-group col-md-12">'+
                                    '<label for="fileDescription">Описание файла</label>'+
                                    '<div class="input-group">'+
                                        '<textarea type="text" class="form-control" id="fileDescription" v-model="fileDescription" placeholder="Аннотация длинной до 1000 символов" :maxlength="1000"></textarea>'+
                                        '<div v-show="fileDescription.length>0" class="input-group-prepend">' +
                                            '<div class="input-group-text" v-text="1000 - fileDescription.length">@</div>' +
                                        '</div>'+
                                    '</div>'+
                                    '<p class="alert alert-danger" v-show ="$root.fileDescriptionAlert">Укажите аннотацию!</p>'+
                                '</div>'+
                            '</div>'+
                            '<br>'+
                            '<div  class="modal-footer">'+
                                '<button class="btn btn-success" @click="save">Сохранить</button>'+
                                '<button class="btn btn-danger"  @click="closeAlarmWindow">Отмена</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div v-if="($root.showSuccessMessage)">'+
                '<div class="modal-mask">'+
                    '<div class="modal-wrapper">'+
                        '<div class="modal-container">'+
                            '<div v-if="$root.showSuccessMessage" class="modal-title">'+
                                '<button class="close" @click="closeMessageWindow">&times;</button>'+
                                'Файл успешно добавлен!'+
                            '</div>'+
                            '<div  class="modal-footer">'+
                                '<button class="btn btn-danger"  @click="closeMessageWindow">Ок</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>',

    methods: {
        closeMessageWindow(){
            this.$root.showSuccessMessage=false;

        },
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
            this.fileName = this.file.name;
            this.ext = this.fileName.substr(this.fileName.lastIndexOf('.') + 1);
            this.randomFileName = `tezis_${(+new Date).toString(16)}`+ '.'+this.ext;

            console.log('this.fileName: '+ this.fileName );
            console.log('this.ext: '+ this.ext );
            console.log('this.randomFileName: '+ this.randomFileName );
        },

        closeAlarmWindow(){
            this.fileName='';
            this.fileDescription='';
            this.tezisId='';
            this.randomFileName='';
            this.$root.showModal=false;

        },


        save: function () {
            if(!is_empty(this.fileName)){

                if(this.file.size >10485760000){
                    this.$root.fileSizeAlert=true;
                    console.log('Проверка ограничения размера файла не пройдена');
                } else {
                    console.log('Проверка ограничения размера файла пройдена');

                    this.$root.fileSizeAlert=false;
                    this.ext = this.ext.toLowerCase();
                    console.log('Расширение файла: '+this.ext);

                    if (!((this.ext=='mp4') || (this.ext=='pdf') || (this.ext=='m3u8'))) {
                        this.$root.fileTypeAlert=true;
                        console.log('Проверка расширения файла не пройдена');
                    } else{
                        this.$root.fileTypeAlert=false;
                        console.log('Проверка расширения файла пройдена');
                        if(this.ext=='mp4'){
                            this.fileType=1;
                        } else if(this.ext=='pdf'){
                            this.fileType=2;
                        } else if(this.ext=='m3u8'){
                            this.fileType=3;
                        }
                    }
                }

            } else {
                this.$root.fileSizeAlert=false;
                this.$root.fileTypeAlert=false;
            }

            var file = {
                fileName: this.fileName,
                fileDescription: capitalizeFirstLetter(this.fileDescription),
                reportId: tezisId,
                randomFileName: this.randomFileName,
                fileType: this.fileType,

            };

            console.log();
            if (is_empty(this.fileName)) {
                this.$root.fileNameAlert = true;
                console.log('Проверка имени файла не пройдена');
            } else{
                this.$root.fileNameAlert = false;
                console.log('Проверка имени файла  пройдена');
            }
            if (is_empty(this.fileDescription)) {
                this.$root.fileDescriptionAlert = true;
                console.log('Проверка описания файла не пройдена');
            } else {
                console.log('Проверка описания файла пройдена');
                this.$root.fileDescriptionAlert = false;
            }
            console.log('tezisId:' + this.$root.tezisId);
            if (this.$root.tezisId>0) {
                console.log('Проверка tezisId пройдена');
                this.$root.tezisIdAlert = false;
            } else {
                console.log('Проверка tezisId не пройдена');
                this.$root.tezisIdAlert = true;
            }

            if ((!this.$root.fileNameAlert) &&
               //(!this.$root.fileDescriptionAlert)&&
                (!this.$root.tezisIdAlert)&&
                (!this.$root.fileSizeAlert)&&
                (!this.$root.fileTypeAlert)
            ) {
                if(!is_empty(this.fileName)){
                    console.log('имя файла не пустое!');
                    let formData = new FormData();
                    this.ext = this.fileName.substr(this.fileName.lastIndexOf('.') + 1);

                    formData.append('file', this.file, this.randomFileName);

                    axios.post( '/upload',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    ).then (res =>{
                        console.log("res: " + {res});
                        Vue.resource('/file{/id}').save({}, file).then(result =>
                            result.json().then(data => {

                                console.log("files: " + this.files)
                                console.log("data: " + data)
                                this.files.push(data)
                                this.fileName=''
                                this.fileDescription=''
                                this.tezisId=''
                                this.randomFileName=''
                            })
                        );
                        this.$root.showModal=false;
                        this.$root.showSuccessMessage=true;
                    }).catch(function(){
                        this.isUnsuccessFileUpload=true;
                        console.log('Ошибка загрузки файла');
                        alert("Ошибка загрузки файла, попробуйте еще раз!")
                    });
                }
            }
        }
    }

});

Vue.component('file-row' , {
    props: ['file', 'editMethod', 'files'],
    template:
        '<div class="card">'+
            '<div class="card-header  text-white bg-primary ">'+
                '<h5>Файл #{{this.files.indexOf(this.file) + 1}}</h5>'+
            '</div>'+
            '<div class="card-body">'+
                '<ul class="list-group list-group-flush">'+
                    '<li class="list-group-item text-left"><b>Файл:</b><a target="_blank" v-bind:href="`/downloadFile/${file.randomFileName}`"> {{file.fileName}} </a></li>'+
                    '<li class="list-group-item text-left"><b>Описание:</b> {{file.fileDescription}}</li>'+
                    '<li class="list-group-item text-left"><b>Добавлен:</b> {{file.createDateTime}}</li>'+
                '</ul>'+
            '</div>'+
            '<div class="card-footer">'+
                '<input type = "button" class="btn btn-danger  margin: 10px;" value="X" v-on:click="del"  @click="del" />'+
            '</div>'+
        '</div>',

    methods: {
        edit: function(){
            this.editMethod(this.file);
        },
        del: function() {

            Vue.resource('/file{/id}').delete({id: this.file.id}).then(result => {
                if (result.ok) {
                    this.files.splice(this.files.indexOf(this.file), 1) ;
                }
            })

        }
    }

});

Vue.component('file-list', {
    props: ['files', 'tezis', 'nav'],
    data: function(){
        return {
            file: null
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
                '<h1 class="text-muted text-center" style="margin-top:90px;">Файлы доклада "{{tezis.tezisName}}"</h1>'+
                '<div class="justify-content-center row">'+
                    '<div class=" row col-md-3 ">' +
                        '<input type="button" class="btn btn-primary  mx-auto d-block" value="Добавить" @click="addFile"> '+
                        '<input type="button" class="btn btn-primary  mx-auto d-block" value="Доклады" @click="toTezis"> '+
                    '</div>'+
                '</div>'+
                '<file-form :files="files"  :fileAttr="file" />'+
                '<hr>'+
                '<div v-if="files.length > 0" class="card-columns" style="margin: 10px;">'+
                    '<file-row v-for="file in files" :key="file.id" :file = "file" :editMethod="editMethod" :files="files"/>' +
                '</div>'+
                '<div v-else class="alert alert-warning" role="alert" style="margin: 50px;">'+
                    '<p>К докладу не прикреплен ни один файл!</p><p> Вы можете прикрепить один или несколько файлов в формате PDF или MP4, нажав на кнопку "Добавить".</p>' +
                '</div>'+
                '<hr style="margin-bottom: 40px;">'+
            '</div>'+
        '</div>'+

        '</body>',


    methods: {
        toTezis: function(){
            window.location.href = '/tezis';
        },
        editMethod: function(file){
            this.file = file;
        },
        addFile: function(){
            this.$root.showModal=true;
        }
    }

});

var app;

app = new Vue({
    el: '#app',
    template:
        '<div>'+
            '<file-list :files="files" :tezis="tezis" :nav="nav" /> '+
        '</div>',
    data: {

        files:[],
        tezis:'',

        editClicked:false,
        fileNameAlert:false,
        fileDescriptionAlert:false,
        tezisIdAlert:false,
        fileIsEmpty:true,
        fileSizeAlert:false,
        fileTypeAlert:false,
        ext:'',
        randomFileName:'',
        showModal:false,
        tezisId:tezisId,

        showSuccessMessage:false,
        showUnsuccessMessage:false,

        nav:'',
    },

    created: function () {
        
        axios.get('/file/'+this.tezisId).then(result => {
                if(result.data.length>0){
                    this.files=result.data;
                }
        });

        axios.get('/tezises/'+this.tezisId).then(result => {
            this.tezis=result.data;
        });
        axios.get('/nav').then(result => {
            this.nav=result.data;
        });
    },
});

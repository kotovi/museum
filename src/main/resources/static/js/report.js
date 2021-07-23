Vue.component('file-row' , {
    props: ['file'],
    template:
    '<div class="row justify-content-center">'+
            '<a v-if="file.fileType==2" target="_blank" v-bind:href="`/downloadFile/${file.randomFileName}`">{{file.fileName}}</a>'+
            '<button v-else-if="file.fileType==3" class="btn btn-sm btn-primary"  @click="playHls">Смотреть</button>'+

    '</div>',

    methods: {
         playHls: function (){
             this.$root.watchUrl= "/video/"+this.file.fileName;
             this.$root.showFrame=true;
         }
    }
});

Vue.component('tezis-row' , {
    props: ['tezis', 'teziss'],
    template:
        '<div class="card text-center" style="border: 0px;">'+
            '<div class="card-body">'+
                '<h5 class="h5 mb-2">{{tezis.tezisName}}</h5>'+
                '<file-row v-for="file in tezis.files" :key="file.id" :file = "file"/>' +
                '<p v-if="((showInfo)&(tezis.tezisAnnotation.length>1))" class="text-muted mb-0">{{tezis.tezisAnnotation}}</p>'+
                '<button v-if="((!showInfo)&(tezis.tezisAnnotation.length>1))" class="btn btn-sm btn-primary"  v-on:click="showInfo=!showInfo">Подробнее</button>'+
                '<button v-if="((showInfo)&(tezis.tezisAnnotation.length>1))" class="btn btn-sm btn-primary"   v-on:click="showInfo=!showInfo">Скрыть</button>'+
            '</div>'+
        '</div>',
    data: function () {
        return{
            showInfo:false,
        }
    },
    methods: {
    }
});

app2 = new Vue({
    el: '#app-greeting',
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
                    '<hr>'+

                    '<div v-if="this.$root.showFrame">'+
                        '<div class="modal-mask">'+
                            '<div class="modal-video-wrapper">'+
                                '<div class="modal-video-container justify-content-center">'+
                                    '<div class="modal-title">'+
                                        '<button class="close" @click="closeFrame">&times;</button>'+
                                    '</div>'+
                                    '<video style="max-height: 50%;" id="player"  dura=""  poster="" preload="none" controlsList="nodownload" controls crossorigin playsinline poster="">' +
                                    '</video>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+

                    '<div v-if="teziss.length <1" class="alert alert-warning" role="alert" style="margin: 50px;">'+
                        '<p>В систему не добавлен ни один доклад!</p><p> Вы можете создать доклад, нажав на кнопку "Добавить".</p>' +
                    '</div>'+
                    '<div v-else class="card-columns">'+
                        '<tezis-row v-for="tezis in teziss" :key="tezis.id" :tezis = "tezis"  :teziss="teziss"/>' +
                    '</div>'+
                    '<hr>'+
                '</div>'+
            '</div>'+
        '</body>',

    updated: function () {

            if(this.$root.showFrame) {
                console.log("this.$root.watchUrl: " + this.$root.watchUrl);
                this.player = new Plyr('#player');
                this.video = document.querySelector('video');


                //this.player.cleanup;
                this.$root.isFirst = true;

                this.player.on('play', () => {
                    if (this.$root.isFirst) {
                        loadHLS(this.$root.watchUrl, this.video);
                    }
                    this.$root.isFirst = false;
                });
                var hls = [];
                var i = 0;

                function loadHLS(source, video) {
                    hls[i] = new Hls();
                    hls[i].loadSource(source);
                    hls[i].attachMedia(video);
                    video.play();
                    i++;
                }
            }

    },
    methods:{
        closeFrame() {
            this.$root.showFrame = false;
            this.video = document.querySelector('video');
            this.video.pause();
            this.$root.isFirst = true;
            console.log('destroyed');

        },

    },

    data: {
        nav:'',
        userId:'',
        userGroup:'',
        watchUrl:'',
        showFrame:false,
        isHls:false,
        teziss:[],
        isFirst:false,
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
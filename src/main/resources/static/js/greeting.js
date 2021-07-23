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

Vue.directive('phone', {
    bind(el) {
        el.oninput = function(e) {
            if (!e.isTrusted) {
                return;
            }

            let x = this.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            this.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            el.dispatchEvent(new Event('input'));
        }
    }
});

app2 = new Vue({
    el: '#app-greeting',
    template:
        '<body id="page-top">'+
            '<nav class="navbar navbar-expand-lg navbar-light fixed-top navbar-fixed-top py-3" id="mainNav">'+
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


        '<div v-if="showModal">'+
            '<div class="modal-mask">'+
                '<div class="modal-wrapper">'+
                    '<div class="modal-container">'+
                        '<div class="modal-title">'+
                            '<button class="close" @click="confirmAlarm">&times;</button>' +
                            '<p>{{modalHeader}}</p>' +
                        '</div>'+
                        '<br>'+
                            '<p>Для участия в конференции Вам необходимо войти в систему и перейти в раздел "Семинары".</p>' +
                            '<p>В качестве имени пользователя необходимо использовать указанный при регистрации адрес электронной почты.</p>' +
                        '<br>'+
                        '<div class="modal-footer">'+
                            '<button class="btn btn-primary" @click="confirmAlarm">Ок</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+

        '<!-- Masthead-->'+
            '<header class="masthead">'+
                '<div class="container h-100">'+
                    '<div class="row h-100 align-items-center justify-content-center text-center">'+
                        '<div class="col-lg-10 align-self-end">'+
                            '<h1 class="text-uppercase text-white font-weight-bold">XIX фестиваль музеев Иркутской области «Маёвка – 2021»</h1>'+
                            '<h1 class="text-uppercase text-white font-weight-bold">«Музей как центр развития территории»</h1>'+
                            '<hr class="divider my-4"/>'+
                        '</div>'+
                        '<div class="col-lg-8 align-self-baseline">'+
                            '<p class="text-white-75 font-weight-light mb-5">26-28 мая 2021 года, г. Иркутск</p>'+
                            '<a class="btn btn-primary btn-xl js-scroll-trigger" href="#authors">Организаторы</a>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</header>'+
        '<!-- About-->'+
            '<section class="page-section bg-primary" id="authors">'+
                '<div class="container">'+
                    '<div class="row justify-content-center">'+
                        '<div class="col-lg-8 text-center">'+
                            '<h2 class="text-white mt-0">Музеи Иркутской области, Красноярского края и ДНР</h2>'+
                            '<hr class="divider light my-4"/>'+
                            '<a class="btn btn-light btn-xl js-scroll-trigger" href="#reports">Доклады</a>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</section>'+

        '<!-- Services-->'+
            '<section class="page-section" id="reports">'+
                '<div class="container">'+
                    '<h3 class="text-center mb-2">26 мая 2021 года, г. Иркутск</h3>'+
                    '<h3 class="text-center mb-2">Музейная студия ГАУК Иркутский областной краеведческий музей (ул. Карла Маркса, 13, тел.: 200-368)</h3>'+
                    '<hr class="divider my-4"/>'+
                    '<div class="row">'+
                        '<div class="col-lg-4 col-md-6 text-center">'+
                            '<div class="mt-5">'+
                                '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                                '<h4 class="h4 mb-2">Приветственное слово</h4>'+
                                '<h5 class="h5 mb-2">Полунина Олеся Николаевна, зам. министра культуры и архивов Иркутской области</h5>'+
                                '<h5 class="h5 mb-2">Ступин Сергей Геннадьевич, директор ГАУК Иркутский областной краеведческий музей, кандидат философских наук</h5>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-lg-4 col-md-6 text-center">'+
                            '<div class="mt-5">'+
                                '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                                '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                                '<h5 class="h5 mb-2">Роль музеев Иркутской области в развитии территории</h5>'+
                                '<p v-if="showInfo1" class="text-muted mb-0"><b>Докладчик:</b> Ступин Сергей Геннадьевич, директор ГАУК Иркутский ' +
                                'областной краеведческий музей, кандидат философских наук</p>'+
                                '<button v-if="!showInfo1" class="btn btn-primary" v-on:click="showInfo1=!showInfo1">Подробнее</button>'+
                                '<button v-if="showInfo1" class="btn btn-primary" v-on:click="showInfo1=!showInfo1">Скрыть</button>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-lg-4 col-md-6 text-center">'+
                            '<div class="mt-5">'+
                                '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                                '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                                '<h5 class="h5 mb-2">Создание туристического маршрута «Сибирский литературный ' +
                                'треугольник (Енисей – В.П. Астафьев, Ангара – В.Г. Распутин, Катунь ' +
                                '– В.М. Шукшин)»</h5>'+
                                '<p v-if="showInfo2" class="text-muted mb-0"><b>Докладчик:</b> Ярошевская Валентина Михайловна, директор ' +
                                'КГБУК Красноярский краевой краеведческий музей</p>'+
                                '<button v-if="!showInfo2" class="btn btn-primary" style="margin: 10px;" v-on:click="showInfo2=!showInfo2">Подробнее</button>'+
                                '<button v-if="showInfo2" class="btn btn-primary"  style="margin: 10px;" v-on:click="showInfo2=!showInfo2">Скрыть</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="col-lg-4 col-md-6 text-center">'+
                            '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                                '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                                '<h5 class="h5 mb-2">Взаимодействие музейного и общественного сообщества ' +
                                'городов-побратимов Шелехов-Номи (Япония) и Шелехов-Рыльск ' +
                                '(Курская область) при формировании и развитии историко-просветительской программы «Шелеховское наследие»</h5>'+
                                '<p v-if="showInfo3" class="text-muted mb-0"><b>Докладчик:</b> Волкова Наталья Ивановна, директор МКУК Шелеховского ' +
                                'района «Городской музей Г.И.Шелехова»</p>'+
                                '<button v-if="!showInfo3" class="btn btn-primary" v-on:click="showInfo3=!showInfo3">Подробнее</button>'+
                                '<button v-if="showInfo3" class="btn btn-primary" v-on:click="showInfo3=!showInfo3">Скрыть</button>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-lg-4 col-md-6 text-center">'+
                            '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                                '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                                '<h5 class="h5 mb-2">Музей как центр исторической и общественной жизни города Усть-Илимска</h5>'+
                                '<p v-if="showInfo4" class="text-muted mb-0"><b>Докладчик: </b>Труфанова Елена Николаевна, методист по музейно-' +
                                'образовательной деятельности МБУК «Краеведческий музей», г.Усть-Илимск</p>'+
                                '<button v-if="!showInfo4" class="btn btn-primary" v-on:click="showInfo4=!showInfo4">Подробнее</button>'+
                                '<button v-if="showInfo4" class="btn btn-primary" v-on:click="showInfo4=!showInfo4">Скрыть</button>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-lg-4 col-md-6 text-center">'+
                            '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                                '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                                '<h5 class="h5 mb-2">Тулун – родина Г.С. Виноградова. 135 лет со дня рождения Георгия Семеновича Виноградова</h5>'+
                                '<p v-if="showInfo5" class="text-muted mb-0"><b>Докладчик:</b> Шепнякова Ирина Викторовна, директор МБУК города Тулуна ' +
                                '«Краеведческий музей имени П.Ф.Гущина»</p>'+
                                '<p v-if="showInfo5" class="text-muted mb-0"><b>Содокладчик:</b>'+
                                ' Бородина Марина Витальевна, заведующий отделом этнографии и фольклора МБУК города Тулуна «Краеведческий музей имени П.Ф.Гущина»</p>'+
                                '<p v-if="showInfo5" class="text-muted mb-0"><b>Содокладчик:</b>'+
                                ' Вострякова Татьяна Юрьевна, заведующий экспозиционно-выставочным отделом МБУК города Тулуна «Краеведческий музей имени П.Ф.Гущина»</p>'+
                                '<p v-if="showInfo5" class="text-muted mb-0"><b>Содокладчик:</b>'+
                                ' Краснова Инна Викторовна, главный хранитель МБУК города Тулуна «Краеведческий музей имени П.Ф.Гущина»</p>'+
                                '<button v-if="!showInfo5" class="btn btn-primary" v-on:click="showInfo5=!showInfo5">Подробнее</button>'+
                                '<button v-if="showInfo5" class="btn btn-primary" v-on:click="showInfo5=!showInfo5">Скрыть</button>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-lg-4 col-md-6 text-center">'+
                            '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                                '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                                '<h5 class="h5 mb-2">«Усольский иллюзион». Коллекция афиш первого усольского кинотеатра</h5>'+
                                '<p v-if="showInfo6" class="text-muted mb-0"><b>Докладчик:</b> Мельникова Лада Владимировна, главный хранитель фондов ' +
                                'МБУК «Усольский историко-краеведческий музей»</p>'+
                                '<button v-if="!showInfo6" class="btn btn-primary" v-on:click="showInfo6=!showInfo6">Подробнее</button>'+
                                '<button v-if="showInfo6" class="btn btn-primary" v-on:click="showInfo6=!showInfo6">Скрыть</button>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-lg-4 col-md-6 text-center">'+
                            '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                                '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                                '<h5 class="h5 mb-2">«Мастер Кастарма». О коллекции серо-голубых глин из долины р.Кастарма (бассейн р. Уды) в собрании Нижнеудинского краеведческого музея</h5>'+
                                '<p v-if="showInfo7" class="text-muted mb-0"><b>Докладчик:</b>Паздников Игорь Викторович, заместитель директора МКУК Музейно-культурный центр» г. Нижнеудинск</p>'+
                                '<button v-if="!showInfo7" class="btn btn-primary" v-on:click="showInfo7=!showInfo7">Подробнее</button>'+
                                '<button v-if="showInfo7" class="btn btn-primary" v-on:click="showInfo7=!showInfo7">Скрыть</button>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-lg-4 col-md-6 text-center">'+
                            '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                                '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                                '<h5 class="h5 mb-2">Карта памяти – сибиряки от Москвы до Берлина. Коллекция фронтовых писем Бирюсинского краеведческого музея</h5>'+
                                '<p v-if="showInfo8" class="text-muted mb-0"><b>Докладчик:</b>Офицерова Светлана Николаевна, главный хранитель фондов. МКУК «Краеведческий музей» г. Бирюсинска</p>'+
                                '<button v-if="!showInfo8" class="btn btn-primary" v-on:click="showInfo8=!showInfo8">Подробнее</button>'+
                                '<button v-if="showInfo8" class="btn btn-primary" v-on:click="showInfo8=!showInfo8">Скрыть</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<hr class="divider my-4"/>'+
                '<div class="container" style="margin-top: 20px;">'+
                    '<div class="row">'+
                        '<div class="col-lg-4 col-md-6 text-center">'+
                            '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                                '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                                '<h5 class="h5 mb-2">Помощь Монголии в годы Великой Отечественной войны 1941-1945 гг. Документы из коллекции Новонукутского краеведческого музея</h5>'+
                                '<p v-if="showInfo9" class="text-muted mb-0"><b>Докладчик:</b> Лемешева Марианна Николаевна, директор МКУК «Новонукутский краеведческий музей»</p>'+
                                '<button v-if="!showInfo9" class="btn btn-primary" v-on:click="showInfo9=!showInfo9">Подробнее</button>'+
                                '<button v-if="showInfo9" class="btn btn-primary" v-on:click="showInfo9=!showInfo9">Скрыть</button>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-lg-4 col-md-6 text-center">'+
                            '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                                '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                                '<h5 class="h5 mb-2">Краеведческий альманах «Чтобы помнили! Чтобы знали!»</h5>'+
                                '<p v-if="showInfo10" class="text-muted mb-0"><b>Докладчик:</b> Дорофеева Тамара Александровна, директор МКУК«Историко-краеведческий музей Черемховского района»</p>'+
                                '<button v-if="!showInfo10" class="btn btn-primary" v-on:click="showInfo10=!showInfo10">Подробнее</button>'+
                                '<button v-if="showInfo10" class="btn btn-primary" v-on:click="showInfo10=!showInfo10">Скрыть</button>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-lg-4 col-md-6 text-center">'+
                            '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                                '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                                '<h5 class="h5 mb-2">О заполнении музеями Иркутской области форм статистической отчётности: 1) Культура 1; 2) 8 – НК; 3) 4-экспонаты.4) Разовых ' +
                                'форм Мониторинга Национального проекта «Культура»</h5>'+
                                '<p v-if="showInfo11" class="text-muted mb-0"><b>Докладчик:</b> Куклина Надежда Петровна, и. о. заведующего методическим отделом ГАУК Иркутский областной краеведческий музей</p>'+
                                '<button v-if="!showInfo11" class="btn btn-primary" v-on:click="showInfo11=!showInfo11">Подробнее</button>'+
                                '<button v-if="showInfo11" class="btn btn-primary" v-on:click="showInfo11=!showInfo11">Скрыть</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+

                '<div class="container" style="margin-top: 20px;">'+
                    '<div class="row">'+
                        '<div class="col-lg-4 col-md-6 text-center">'+
                            '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                                '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                                '<h5 class="h5 mb-2">Патриотическое воспитание подрастающего поколения на ' +
                                'примере истории малой родины в экспозициях отдела музейных ' +
                                'фондов МКУК «ЦБС Мамско-Чуйского района – ЦРБ»</h5>'+
                                '<p v-if="showInfo12" class="text-muted mb-0"><b>Докладчик:</b> Щербакова Виктория Евгеньевна, заведующий отделом ' +
                                'музейных фондов МКУК «ЦБС Мамско-Чуйского района-ЦРБ»</p>'+
                                '<button v-if="!showInfo12" class="btn btn-primary" v-on:click="showInfo12=!showInfo12">Подробнее</button>'+
                                '<button v-if="showInfo12" class="btn btn-primary" v-on:click="showInfo12=!showInfo12">Скрыть</button>'+
                            '</div>'+
                        '</div>'+
                    '<div class="col-lg-4 col-md-6 text-center">'+
                        '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                            '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                            '<h5 class="h5 mb-2">Новые формы работы музея по патриотическому воспитанию молодежи</h5>'+
                            '<p v-if="showInfo13" class="text-muted mb-0"><b>Докладчик:</b> Фарафонова Татьяна Анатольевна, заведующая отделом ' +
                            'научно-просветительской работы ГУК «Донецкий республиканский краеведческий музей»</p>'+
                            '<button v-if="!showInfo13" class="btn btn-primary" v-on:click="showInfo13=!showInfo13">Подробнее</button>'+
                            '<button v-if="showInfo13" class="btn btn-primary" v-on:click="showInfo13=!showInfo13">Скрыть</button>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-lg-4 col-md-6 text-center">'+
                        '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                            '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                            '<h5 class="h5 mb-2">Мультимедиа как перспективная форма работы с посетителями</h5>'+
                            '<p v-if="showInfo14" class="text-muted mb-0"><b>Докладчик:</b> Бухарев Юрий Витальевич, младший научный сотрудник отдела ' +
                            'компьютерных технологий, печати и научной информации ГУК</p>'+
                            '<button v-if="!showInfo14" class="btn btn-primary" v-on:click="showInfo14=!showInfo14">Подробнее</button>'+
                            '<button v-if="showInfo14" class="btn btn-primary" v-on:click="showInfo14=!showInfo14">Скрыть</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+

            '<div class="container" style="margin-top: 20px;">'+
                '<div class="row">'+
                    '<div class="col-lg-4 col-md-6 text-center">'+
                        '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                            '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                            '<h5 class="h5 mb-2">О концепции реэкспозиции первого этажа отдела истории ГАУК ИОКМ</h5>'+
                            '<p v-if="showInfo15" class="text-muted mb-0"><b>Докладчик:</b>Сосновский Илья Захидович, научный сотрудник отдела истории ' +
                            'ГАУК Иркутский областной краеведческий музей</p>'+
                            '<button v-if="!showInfo15" class="btn btn-primary" v-on:click="showInfo15=!showInfo15">Подробнее</button>'+
                            '<button v-if="showInfo15" class="btn btn-primary" v-on:click="showInfo15=!showInfo15">Скрыть</button>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-lg-4 col-md-6 text-center">'+
                        '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                            '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                            '<h5 class="h5 mb-2">Методическая экскурсия по выставке «Маски времени» в отделе ' +
                            'ГАУК ИОКМ «Окно в Азию»</h5>'+
                            '<p v-if="showInfo16" class="text-muted mb-0"><b>Докладчик:</b> Байбородина Мария Анатольевна, научный сотрудник отдела ' +
                            '«Окно в Азию» ГАУК Иркутский областной краеведческий музей</p>'+
                            '<button v-if="!showInfo16" class="btn btn-primary" v-on:click="showInfo16=!showInfo16">Подробнее</button>'+
                            '<button v-if="showInfo16" class="btn btn-primary" v-on:click="showInfo16=!showInfo16">Скрыть</button>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-lg-4 col-md-6 text-center">'+
                        '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                            '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                            '<h5 class="h5 mb-2">Методическая экскурсия по выставке самоваров в Галерее ' +
                            '«Собрание Спешилова».</h5>'+
                            '<p v-if="showInfo17" class="text-muted mb-0"><b>Докладчик:</b> Василенко Марина Валерьевна,куратор выставочных проектов ' +
                            'Галереи «Собрание Спешилова</p>'+
                            '<button v-if="!showInfo17" class="btn btn-primary" v-on:click="showInfo17=!showInfo17">Подробнее</button>'+
                            '<button v-if="showInfo17" class="btn btn-primary" v-on:click="showInfo17=!showInfo17">Скрыть</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+


            '<hr class="divider my-4"/>'+
            '<h3 class="text-center mb-2">27 мая 2021 года, г. Иркутск</h3>'+
            '<h3 class="text-center mb-2">Отдел Музейная студия ГАУК Иркутский областной краеведческий музей (ул. Карла Маркса, 13, тел. 200-368)</h3>'+
            '<hr class="divider my-4"/>'+

            '<div class="row">'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2">Презентация Книги Памяти, том II.Заларинцы, вернувшиеся с Великой Отечественной войны 1941 – 1945 гг.</h5>'+
                        '<p v-if="showInfo18" class="text-muted mb-0"><b>Докладчик:</b> Алексеева Ирина Леонидовна, директор МБУК «Заларинский ' +
                        'районный краеведческий музей»</p>'+
                        '<p v-if="showInfo18" class="text-muted mb-0"><b>Докладчик:</b> Овчинникова Валентина Владимировна, хранитель фондов МБУК ' +
                        '«Заларинский районный краеведческий музей»</p>'+
                        '<button v-if="!showInfo18" class="btn btn-primary" v-on:click="showInfo18=!showInfo18">Подробнее</button>'+
                        '<button v-if="showInfo18" class="btn btn-primary" v-on:click="showInfo18=!showInfo18">Скрыть</button>'+
                    '</div>'+
                '</div>'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2">Александр Невский – эхо прошлого на Куйтунской земле. К 800-летию святого благоверного великого князя Александра Невского</h5>'+
                        '<p v-if="showInfo19" class="text-muted mb-0"><b>Докладчик:</b> Шамонина Людмила Петровна, директор МКУК «Куйтунский районный краеведческий музей»</p>'+
                        '<button v-if="!showInfo19" class="btn btn-primary" v-on:click="showInfo19=!showInfo19">Подробнее</button>'+
                        '<button v-if="showInfo19" class="btn btn-primary" v-on:click="showInfo19=!showInfo19">Скрыть</button>'+
                    '</div>'+
                '</div>'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2">Как всё начиналось. История освоения Сибири в экспозициях и выставках</h5>'+
                        '<p v-if="showInfo20" class="text-muted mb-0"><b>Докладчик:</b> Рафаэль Раиса Григорьевна, директор МКУК «Историко-художественный музей им. академика М. К. Янгеля»</p>'+
                        '<button v-if="!showInfo20" class="btn btn-primary" style="margin: 10px;" v-on:click="showInfo20=!showInfo20">Подробнее</button>'+
                        '<button v-if="showInfo20" class="btn btn-primary"  style="margin: 10px;" v-on:click="showInfo20=!showInfo20">Скрыть</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+


            '<div class="row">'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2">«Пешком по Кутулику». Пешая экскурсия по историческим местам поселка, связанным с именем Александра Вампилова</h5>'+
                        '<p v-if="showInfo21" class="text-muted mb-0"><b>Докладчик:</b> Попова Тамара Васильевна, заведующий отделом ' +
                        '«Мемориальный музей А. Вампилова» МБУК «Краеведческий музей Аларского района»</p>'+
                        '<button v-if="!showInfo21" class="btn btn-primary" v-on:click="showInfo21=!showInfo21">Подробнее</button>'+
                        '<button v-if="showInfo21" class="btn btn-primary" v-on:click="showInfo21=!showInfo21">Скрыть</button>'+
                    '</div>'+
                '</div>'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2">Гобелен «Летний сон» из собрания МКУК «Осинский районный историко-краеведческий музей»</h5>'+
                        '<p v-if="showInfo22" class="text-muted mb-0"><b>Докладчик:</b> Очирова Ольга Баировна, старший научный сотрудник МКУК ' +
                        '«Осинский районный историко-краеведческий музей»</p>'+
                        '<button v-if="!showInfo22" class="btn btn-primary" v-on:click="showInfo22=!showInfo22">Подробнее</button>'+
                        '<button v-if="showInfo22" class="btn btn-primary" v-on:click="showInfo22=!showInfo22">Скрыть</button>'+
                    '</div>'+
                '</div>'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2">История мемориальной коллекции А. С. Шаракшанэ</h5>'+
                        '<p v-if="showInfo23" class="text-muted mb-0"><b>Докладчик:</b>  Арзаева Афталина Гармаевна, старший научный сотрудник ' +
                        'ОГБУК «Национальный музей Усть-Ордынского Бурятского округа»</p>'+
                        '<button v-if="!showInfo23" class="btn btn-primary" style="margin: 10px;" v-on:click="showInfo23=!showInfo23">Подробнее</button>'+
                        '<button v-if="showInfo23" class="btn btn-primary"  style="margin: 10px;" v-on:click="showInfo23=!showInfo23">Скрыть</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+

            '<div class="row">'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2">Собирательская деятельность Музея истории города Иркутска им. А.М. Сибирякова за четверть века</h5>'+
                        '<p v-if="showInfo24" class="text-muted mb-0"><b>Докладчик:</b> Рубаненко Любовь Николаевна, зам. директора по учёту, ' +
                        'хранению и реставрации МБУК «Музей истории города Иркутска им. А.М. Сибирякова»</p>'+
                        '<button v-if="!showInfo24" class="btn btn-primary" v-on:click="showInfo24=!showInfo24">Подробнее</button>'+
                        '<button v-if="showInfo24" class="btn btn-primary" v-on:click="showInfo24=!showInfo24">Скрыть</button>'+
                    '</div>'+
                '</div>'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2">Коллекция Ангарского керамического завода в фондах МБУК «МИГИ им. А.М. Сибирякова»</h5>'+
                        '<p v-if="showInfo25" class="text-muted mb-0"><b>Докладчик:</b> Чернявская Ольга Александровна, старший научный сотрудник ' +
                        'филиала МБУК «МИГИ им. А.М.Сибирякова» «Музей городского быта»</p>'+
                        '<button v-if="!showInfo25" class="btn btn-primary" v-on:click="showInfo25=!showInfo25">Подробнее</button>'+
                        '<button v-if="showInfo25" class="btn btn-primary" v-on:click="showInfo25=!showInfo25">Скрыть</button>'+
                    '</div>'+
                '</div>'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2">Роль дарителей в формировании коллекции Ангарского музея часов</h5>'+
                        '<p v-if="showInfo26" class="text-muted mb-0"><b>Докладчик:</b>  Бартанова Баирма Владимировна, главный хранитель МБУК ' +
                        'Ангарского городского округа «Городской музей»</p>'+
                        '<p v-if="showInfo26" class="text-muted mb-0"><b>Содокладчик:</b>  Сметнева Наталья Владимировна, заведующий Музеем часов ' +
                        'МБУК Ангарского городского округа «Городской музей»</p>'+
                        '<button v-if="!showInfo26" class="btn btn-primary" style="margin: 10px;" v-on:click="showInfo26=!showInfo26">Подробнее</button>'+
                        '<button v-if="showInfo26" class="btn btn-primary"  style="margin: 10px;" v-on:click="showInfo26=!showInfo26">Скрыть</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+

            '<div class="row">'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2">Сохранение и популяризация историко-культурного наследия Верхнего Приленья через проектную деятельность Усть-Кутского исторического музея</h5>'+
                        '<p v-if="showInfo27" class="text-muted mb-0"><b>Докладчик:</b> Тирская Зинаида Мифодьевна, директор МКУК «Усть-Кутский исторический музей» Усть-Кутского муниципального образования</p>'+
                        '<button v-if="!showInfo27" class="btn btn-primary" v-on:click="showInfo27=!showInfo27">Подробнее</button>'+
                        '<button v-if="showInfo27" class="btn btn-primary" v-on:click="showInfo27=!showInfo27">Скрыть</button>'+
                    '</div>'+
                '</div>'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2">Проект музея истории города Черемхово «Здравствуйте! Это мы, ваши потомки» – победитель Фонда президентских грантов 2020</h5>'+
                        '<p v-if="showInfo28" class="text-muted mb-0"><b>Докладчик:</b> Комарова Елена Леонидовна, хранитель музейных предметов МБУК «Музей истории г. Черемхово»</p>'+
                        '<button v-if="!showInfo28" class="btn btn-primary" v-on:click="showInfo28=!showInfo28">Подробнее</button>'+
                        '<button v-if="showInfo28" class="btn btn-primary" v-on:click="showInfo28=!showInfo28">Скрыть</button>'+
                    '</div>'+
                '</div>'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2">Музейное кино. О видеопроектах музея истории г. Черемхово</h5>'+
                        '<p v-if="showInfo29" class="text-muted mb-0"><b>Докладчик:</b>  Горбунова Елена Алексеевна, директор МБУК «Музей истории г.Черемхово»</p>'+
                        '<button v-if="!showInfo29" class="btn btn-primary" style="margin: 10px;" v-on:click="showInfo29=!showInfo29">Подробнее</button>'+
                        '<button v-if="showInfo29" class="btn btn-primary"  style="margin: 10px;" v-on:click="showInfo29=!showInfo29">Скрыть</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+

            '<div class="row">'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2">Новые формы работы МКУК «Районный историко-краеведческий музей» – залог успеха музея</h5>'+
                        '<p v-if="showInfo30" class="text-muted mb-0"><b>Докладчик:</b> Лебедева Татьяна Спартаковна, директор МКУК «Районный ' +
                        'историко-краеведческий музей» с. Кимильтей Зиминского района</p>'+
                        '<button v-if="!showInfo30" class="btn btn-primary" v-on:click="showInfo30=!showInfo30">Подробнее</button>'+
                        '<button v-if="showInfo30" class="btn btn-primary" v-on:click="showInfo30=!showInfo30">Скрыть</button>'+
                    '</div>'+
                '</div>'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2">Музей часов – пространство без границ</h5>'+
                        '<p v-if="showInfo31" class="text-muted mb-0"><b>Докладчик:</b> Скугарева Оксана Алексеевна, менеджер по культурно-массовому ' +
                        'досугу МБУК Ангарского городского округа «Городской музей»</p>'+
                        '<p v-if="showInfo31" class="text-muted mb-0"><b>Содокладчик:</b> Славнова Юлия Анатольевна, научный сотрудник МБУК ' +
                        'Ангарского городского округа «Городской музей»</p>'+
                        '<button v-if="!showInfo31" class="btn btn-primary" v-on:click="showInfo31=!showInfo31">Подробнее</button>'+
                        '<button v-if="showInfo31" class="btn btn-primary" v-on:click="showInfo31=!showInfo31">Скрыть</button>'+
                    '</div>'+
                '</div>'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2">Практика работы с волонтёрами в условиях музея под открытым ' +
                        'небом на примере АЭМ «Ангарская деревня им. О. Леонова»</h5>'+
                        '<p v-if="showInfo32" class="text-muted mb-0"><b>Докладчик:</b>  Ильмурзина Татьяна Андреевна, зав. научно-просветительским ' +
                        'отделом АЭМ «Ангарская деревня им. О. Леонова»</p>'+
                        '<p v-if="showInfo32" class="text-muted mb-0"><b>Содокладчик:</b>  Бондарева Дарья Константиновна, зав. научно-экспозиционным ' +
                        'отделом АЭМ «Ангарская деревня им. О. Леонова», к.и.н</p>'+
                        '<button v-if="!showInfo32" class="btn btn-primary" style="margin: 10px;" v-on:click="showInfo32=!showInfo32">Подробнее</button>'+
                        '<button v-if="showInfo32" class="btn btn-primary"  style="margin: 10px;" v-on:click="showInfo32=!showInfo32">Скрыть</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+

            '<div class="row">'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2">Деятельность Бодайбинского городского краеведческого музея ' +
                        'имени В. Ф. Верещагина в рамках проекта «Военный альбом»</h5>'+
                        '<p v-if="showInfo33" class="text-muted mb-0"><b>Докладчик:</b> Канакова Александра Викторовна, зав. отделом (сектором) ' +
                        'музея МКУК «Бодайбинский городской краеведческий музей имени В.Ф. Верещагина»</p>'+
                        '<button v-if="!showInfo33" class="btn btn-primary" v-on:click="showInfo33=!showInfo33">Подробнее</button>'+
                        '<button v-if="showInfo33" class="btn btn-primary" v-on:click="showInfo33=!showInfo33">Скрыть</button>'+
                    '</div>'+
                '</div>'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2">Методическая экскурсия по экспозиции иконописи в отделе ' +
                        'сибирского искусства ГБУК Иркутский областной художественный ' +
                        'музей им. В.П. Сукачева</h5>'+
                        '<p v-if="showInfo34" class="text-muted mb-0"><b>Докладчик:</b> Буханцова Ирина Николаевна - хранитель фонда иконописи ГБУК ' +
                        'ИОХМ им. В. П. Сукачёва</p>'+
                        '<button v-if="!showInfo34" class="btn btn-primary" v-on:click="showInfo34=!showInfo34">Подробнее</button>'+
                        '<button v-if="showInfo34" class="btn btn-primary" v-on:click="showInfo34=!showInfo34">Скрыть</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+

            '<hr class="divider my-4"/>'+
            '<h3 class="text-center mb-2">28 мая 2021 года, г. Иркутск</h3>'+
            '<h3 class="text-center mb-2">Музей пожарной охраны ГУ МЧС России по Иркутской обл. (ул. Тимирязева,33А)</h3>'+
            '<h3 class="text-center mb-2">ИОГАУК Архитектурно-этнографический музей «Тальцы» (47-ой км. Байкальского тракта)</h3>'+
            '<hr class="divider my-4"/>'+

            '<div class="row">'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2">Методическая экскурсия по экспозиции музея пожарной охраны ГУ МЧС России по Иркутской области (ул. Тимирязева,33А)</h5>'+
                        '<p v-if="showInfo35" class="text-muted mb-0"><b>Докладчик:</b> Молчан Татьяна Алексеевна-директор музея ГУ МЧС России по Иркутской области</p>'+
                        '<button v-if="!showInfo35" class="btn btn-primary" v-on:click="showInfo35=!showInfo35">Подробнее</button>'+
                        '<button v-if="showInfo35" class="btn btn-primary" v-on:click="showInfo35=!showInfo35">Скрыть</button>'+
                    '</div>'+
                '</div>'+
                '<div class="col-lg-4 col-md-6 text-center">'+
                    '<div class="mt-5">'+
        '<i class="fa-4x fas fa-university text-primary mb-4"></i>'+
                        '<h4 class="h4 mb-2">ДОКЛАД</h4>'+
                        '<h5 class="h5 mb-2"> Методическая экскурсия по новым экспозициям ИОГАУК АЭМ «Тальцы»</h5>'+
                        '<p v-if="showInfo36" class="text-muted mb-0"><b>Докладчик:</b> Колганова Елена Юрьевна, заместитель директора по науке ИОГАУК АЭМ «Тальцы»</p>'+
                        '<button v-if="!showInfo36" class="btn btn-primary" v-on:click="showInfo36=!showInfo36">Подробнее</button>'+
                        '<button v-if="showInfo36" class="btn btn-primary" v-on:click="showInfo36=!showInfo36">Скрыть</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+


        '</div>'+
            '</section>'+
        '<section v-if="nav.firstname==null" class="page-section bg-primary" id="join">'+
            '<div class="container" style="width: 80%;">'+
                '<div class="row justify-content-center">'+
                    '<h2 class="text-white mt-0">Регистрация участника</h2>'+
                '</div>'+
                '<div class="row justify-content-center" style="margin-top: 20px;">'+
                    '<form>'+
                        '<div class="form-row">'+
                            '<div class="form-group col-md-4">'+
                                '<label class="text-white" for="lastname">Фамилия</label>'+
                                '<div class="input-group">'+
                                    '<input type="text" class="form-control" id="lastname" v-model="lastname" placeholder="Фамилия" :maxlength="30">'+
                                    '<div v-show="lastname.length>0" class="input-group-prepend">' +
                                        '<div class="input-group-text" v-text="30 - lastname.length">@</div>' +
                                    '</div>'+
                                '</div>'+
                                '<p class="alert alert-danger" v-show ="$root.userLastnameAlert">Укажите Фамилию!</p>'+
                            '</div>'+
                            '<div class="form-group col-md-4">'+
                                '<label class="text-white" for="firstname">Имя</label>'+
                                '<div class="input-group rounded">'+
                                    '<input type="text" class="form-control" id="firstname" v-model="firstname" placeholder="Имя" :maxlength="30">'+
                                    '<div v-show="firstname.length>0" class="input-group-prepend">' +
                                        '<div class="input-group-text" v-text="30 - firstname.length">@</div>' +
                                    '</div>'+
                                '</div>'+
                                '<p class="alert alert-danger" v-show ="$root.userFirstnameAlert">Укажите Имя!</p>'+
                            '</div>'+
                            '<div class="form-group col-md-4">'+
                                '<label class="text-white" for="secname">Отчество</label>'+
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
                            '<label class="text-white" for="organization">Организация</label>'+
                                '<div class="input-group">'+
                                    '<input type="text" class="form-control" id="organization" v-model="organization" placeholder="Организация" :maxlength="130">'+
                                    '<div v-show="organization.length>0" class="input-group-prepend">' +
                                        '<div class="input-group-text" v-text="130 - organization.length">@</div>' +
                                    '</div>'+
                                '</div>'+
                                '<p class="alert alert-danger" v-show ="$root.userOrganizationAlert">Укажите Организацию!</p>'+
                            '</div>'+
                            '<div class="form-group col-md-6">'+
                                '<label class="text-white" for="degree">Специальность</label>'+
                                '<div class="input-group">'+
                                    '<input type="text" class="form-control" id="degree" v-model="degree" placeholder="Специальность" :maxlength="130">'+
                                    '<div v-show="degree.length>0" class="input-group-prepend">' +
                                        '<div class="input-group-text" v-text="130 - degree.length">@</div>' +
                                    '</div>'+
                                '</div>'+
                                '<p class="alert alert-danger" v-show ="$root.degreeAlert">Необходимо указать специальность!</p>'+
                             '</div>'+
                        '</div>'+

                        '<div class="form-row">'+
                            '<div class="form-group col-md-12">'+
                                '<label class="text-white" for="organizationPostAddress">Почтовый адрес организации(с указанием страны, субъекта)</label>'+
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
                                '<label class="text-white" for="userEmail">Email</label>'+
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
                                '<label  class="text-white" for="phoneNumber">Контактный телефон(без кода страны)</label>'+
                                '<input type="tel" class="form-control" id="phoneNumber" name="phone" v-model="phoneNumber" placeholder="(555) 555-5555" :maxlength="14" v-phone pattern="[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}" required>'+
                                '<p class="alert alert-danger" v-show ="$root.userPhoneNumberAlert">Необходимо указать контактный телефон в международном формате!</p>'+
                            '</div>'+
                        '</div>'+

                        '<div class="form-row">'+
                            '<div class="form-group col-md-6">'+
                                '<label class="text-white" for="userEmail">Пароль(не менее 10 символов)</label>'+
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
                                '<label class="text-white" for="passwordConfirm">Подтверждение пароля</label>'+
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

                                '<div class="custom-control custom-checkbox" >' +
                                    '<input type="checkbox" class="form-check-input" id="personalDataAgree"   v-model="personalDataAgree" switch></input>'+
                                    '<label  class="text-white" for="custom-control custom-checkbox">Даю согласие на обработку персональных данных</label>'+
                                '</div>'+
                                '<p class="alert alert-danger" v-show ="$root.personalDataAgreeAlert">Небходимо дать согласие на обработку персональных данных!</p>'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-row">'+
                            '<div  class="form-group col-md-6">'+

                            '<div class="custom-control custom-checkbox" >' +
        '<input type="checkbox" class="form-check-input" id="userAgree"   v-model="userAgree" switch></input>'+
        '<label  class="text-white" for="custom-control custom-checkbox">Принимаю пользовательское соглашение</label>'+
        '</div>'+
        '<p class="alert alert-danger" v-show ="$root.userAgreeAlert">Небходимо принять порльзовательское соглашение!</p>'+
        '</div>'+
        '</div>'+
                    '</form>'+
                '</div>'+
        '<div class="row justify-content-center">'+
        '<input v-if="($root.editClicked == false)" type="button"  class="btn btn-light btn-xl js-scroll-trigger" style=" margin-top: 20px;" value="Зарегистрироваться" @click="save"/>'+
        '</div>'+
            '</div>'+
        '</section>'+
        '</body>',

    data: {
        nav:'',
        userId:'',
        userGroup:'',
        userAgree:'',
        showInfo1:false,
        showInfo2:false,
        showInfo3:false,
        showInfo4:false,
        showInfo5:false,
        showInfo6:false,
        showInfo7:false,
        showInfo8:false,
        showInfo9:false,
        showInfo10:false,
        showInfo11:false,
        showInfo12:false,
        showInfo13:false,
        showInfo14:false,
        showInfo15:false,
        showInfo16:false,
        showInfo17:false,
        showInfo18:false,
        showInfo19:false,
        showInfo20:false,
        showInfo21:false,
        showInfo22:false,
        showInfo23:false,
        showInfo24:false,
        showInfo25:false,
        showInfo26:false,
        showInfo27:false,
        showInfo28:false,
        showInfo29:false,
        showInfo30:false,
        showInfo31:false,
        showInfo32:false,
        showInfo33:false,
        showInfo34:false,
        showInfo35:false,
        showInfo36:false,








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
        userAgreeAlert:false,
        existEmail: false,


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
    },
    created: function () {
        axios.get('/nav').then(result => {
            this.nav=result.data,
                window.userId = result.data.id,
                window.userGroup = result.data.userGroup
        });
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

    methods: {
        confirmAlarm: function (){
            this .showModal=false;
        },
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
                this .userPasswordAlert = true;
            } else this .userPasswordAlert = false;

            if (is_empty(this.passwordConfirm)) {
                this .userPasswordConfirmAlert = true;
            } else this .userPasswordConfirmAlert = false;

            if (this.passwordConfirm!==this.password) {
                this .passwordMismatchAlert = true;
            } else this .passwordMismatchAlert = false;

            if (this.password.length <10) {
                this .passwordLenghAlert = true;
            } else this .passwordLenghAlert = false;





            if (is_empty(this.firstname)) {
                this .userFirstnameAlert = true;
            } else this .userFirstnameAlert = false;

            if (is_empty(this.lastname)) {
                this .userLastnameAlert = true;
            } else this .userLastnameAlert = false;

            if (is_empty(this.secname)) {
                this .userSecnameAlert = true;
            } else this .userSecnameAlert = false;

            if (is_empty(this.organization)) {
                this .userOrganizationAlert = true;
            } else this .userOrganizationAlert = false;

            if (is_empty(this.degree)) {
                this .degreeAlert = true;
            } else this .degreeAlert = false;

            if (is_empty(this.organizationPostAddress)) {
                this .organizationPostAddressAlert = true;
            } else this .organizationPostAddressAlert = false;

            if (is_empty(this.userEmail)) {
                this .userEmailAlert = true;
            } else this .userEmailAlert = false;

            if (is_empty(this.phoneNumber)) {
                this .userPhoneNumberAlert = true;
            } else this .userPhoneNumberAlert = false;

            if (!this.personalDataAgree) {
                this .personalDataAgreeAlert = true;
            } else this.personalDataAgreeAlert = false;

            if (!this.userAgree) {
                this .userAgreeAlert = true;
            } else this.userAgreeAlert = false;

            if (validateEmail(this.userEmail.toLowerCase())) {
                this.invalidEmail = false
            } else {
                this.invalidEmail = true;
            }

            axios.get("/checkUser/"+this.userEmail.toLowerCase()).then(responce => {

                if(responce.data.userExist==1) {
                    this.existEmail = true;

                } else
                if(responce.data.userExist==0)  {
                    this.existEmail = false;
                    if ((!this.userFirstnameAlert) &&
                        (!this.userLastnameAlert) &&
                        (!this.userSecnameAlert) &&
                        (!this.userOrganizationAlert) &&
                        (!this.degreeAlert) &&
                        (!this.organizationPostAddressAlert) &&
                        (!this.userEmailAlert) &&
                        (!this.userPhoneNumberAlert) &&
                        (!this.personalDataAgreeAlert) &&
                        (!this.invalidEmail) &&
                        (!this.passwordLenghAlert) &&
                        (!this.passwordMismatchAlert) &&
                        (!this.userPasswordAlert) &&
                        (!this.existEmail) &&
                        (!this.userAgreeAlert) &&
                        (!this.userPasswordConfirmAlert)
                    ) {
                        userApi.save({}, user).then (response => {
                            this.modalHeader = capitalizeFirstLetter(this.lastname) +' '+capitalizeFirstLetter(this.firstname)+' '+capitalizeFirstLetter(this.secname)+', Вы успешно зарегистрированы!';
                            this.id='';
                            this.firstname ='';
                            this.lastname = '';
                            this.secname = '';
                            this.organization = '';
                            this.degree = '';
                            this.organizationPostAddress = '';
                            this.userEmail = '';
                            this.phoneNumber = '';
                            this.personalDataAgree = '';
                            this.password = '';
                            this.passwordConfirm = '';
                            this.showModal=true;
                            this.userFirstnameAlert=false;
                            this.userLastnameAlert=false;
                            this.userSecnameAlert=false;
                            this.userOrganizationAlert=false;
                            this.degreeAlert=false;
                            this.organizationPostAddressAlert=false;
                            this.userEmailAlert=false;
                            this.userPhoneNumberAlert=false;
                            this.personalDataAgreeAlert=false;
                            this.invalidEmail=false;
                            this.passwordLenghAlert=false;
                            this.passwordMismatchAlert=false;
                            this.userPasswordAlert=false;
                            this.existEmail=false;
                            this.userPasswordConfirmAlert=false;
                        }, response => {
                            alert("Сервер временно не доступен, попробуйте еще раз!");
                        })
                    }
                }
            });
        },
    }

});

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
                        '<li v-if="nav.userRole==3"  class="nav-item"><a class="nav-link js-scroll-trigger" href="/tezis">Управление докладами</a></li>'+
                        '<li v-if="nav.userRole==3"  class="nav-item"><a class="nav-link js-scroll-trigger" href="/registred">Пользователи</a></li>'+
                        '<li v-if="nav.firstname==null" class="nav-item"><a class="nav-link js-scroll-trigger" href="/#join">Принять участие</a></li>'+
                        '<li class="nav-item"><a v-if="nav.firstname!=null" class="nav-link" href="/logout">Вы вошли как: {{nav.firstname}} {{nav.lastname}} | Выйти</a></li>'+
                        '<li class="nav-item"><a v-if="nav.firstname==null" class="nav-link" href="/login">Войти</a></li>'+
                    '</ul>'+
                '</div>'+
            '</div>'+
        '</nav>'+
        '<div class="row flex-column h-100  justify-content-center text-justify" style="width: 85%; margin-top: 70px; margin-bottom: 70px;">' +
            '<h1 class="display-4 card-subtitle text-muted mt-4 mb-4" style="padding-top: 50px;">Пользовательское cоглашение</h1>' +
            '<p class="card-text">Настоящее Пользовательское Соглашение (Далее Соглашение) регулирует отношения между Государственное автономное учреждение культуры Иркутский областной ' +
        'краеведческий музей (далее Конференция или Администрация) с одной стороны и пользователем сайта с другой.' +
            'Сайт Конференция не является средством массовой информации.</p>' +
        
            '<p class="card-text">Используя сайт, Вы соглашаетесь с условиями данного соглашения.' +
            'Если Вы не согласны с условиями данного соглашения, не используйте сайт Конференция!</p>' +
        
            '<h4 class="card-subtitle text-muted mb-1 mt-2 fw-bold">Предмет соглашения</h4>' +
            '<h5 class="card-subtitle text-muted mb-1 mt-2">Администрация предоставляет пользователю право на размещение на сайте следующей информации:</h5>' +
            '<p class="card-text">' +
                '<li class="list-unstyled"> - Текстовой информации;</li>' +
                '<li class="list-unstyled"> - Аудиоматериалов;</li>' +
                '<li class="list-unstyled"> - Видеоматериалов;</li>' +
                '<li class="list-unstyled"> - Фотоматериалов;</li>' +
                '<li class="list-unstyled"> - Ссылок на материалы, размещенные на других сайтах.</li>' +
            '</p>' +
            '<p class="card-text">' +
                '<h4 class="card-subtitle text-muted mb-1 mt-2 fw-bold">Права и обязанности сторон</h4>' +
            '</p>' +
            '<h4 class="card-subtitle text-muted mb-1 mt-2">Пользователь имеет право:</h4>' +
            '<p class="card-text">' +
                '<li class="list-unstyled"> - Осуществлять поиск информации на сайте;</li>' +
                '<li class="list-unstyled"> - Получать информацию на сайте;</li>' +
                '<li class="list-unstyled"> - Создавать информацию для сайта;</li>' +
                '<li class="list-unstyled"> - Использовать информацию сайта в личных некоммерческих целях.</li>' +
            '</p>' +
            '<h4 class="card-subtitle text-muted mb-1 mt-2">Администрация имеет право:</h4>' +
            '<p class="card-text">' +
                '<li class="list-unstyled"> - По своему усмотрению и необходимости создавать, изменять, отменять правила;</li>' +
                '<li class="list-unstyled"> - Ограничивать доступ к любой информации на сайте;</li>' +
                '<li class="list-unstyled"> - Создавать, изменять, удалять информацию;</li>' +
                '<li class="list-unstyled"> - Удалять учетные записи;</li>' +
                '<li class="list-unstyled"> - Отказывать в регистрации без объяснения причин.</li>' +
            '</p>' +
            '<h4 class="card-subtitle text-muted mb-1 mt-2">Пользователь обязуется:</h4>' +
            '<p class="card-text">' +
                '<li class="list-unstyled"> - Обеспечить достоверность предоставляемой информации;</li>' +
                '<li class="list-unstyled"> - Обеспечивать сохранность личных данных от доступа третьих лиц;</li>' +
                '<li class="list-unstyled"> - Обновлять Персональные данные, предоставленные при регистрации, в случае их изменения;</li>' +
                '<li class="list-unstyled"> - Не распространять информацию, которая направлена на пропаганду войны, разжигание национальной, расовой или религиозной ненависти и вражды, а также иной информации, за распространение которой предусмотрена уголовная или административная ответственность;</li>' +
                '<li class="list-unstyled"> - Не нарушать работоспособность сайта;</li>' +
                '<li class="list-unstyled"> - Не создавать несколько учётных записей на Сайте, если фактически они принадлежат одному и тому же лицу;</li>' +
                '<li class="list-unstyled"> - Не передавать в пользование свою учетную запись и/или логин и пароль своей учетной записи третьим лицам;</li>' +
                '<li class="list-unstyled"> - Не регистрировать учетную запись от имени или вместо другого лица за исключением случаев, предусмотренных законодательством РФ;</li>' +
                '<li class="list-unstyled"> - Не размещать материалы рекламного, эротического, порнографического или оскорбительного характера, а также иную информацию, размещение которой запрещено или противоречит нормам действующего законодательства РФ;</li>' +
                '<li class="list-unstyled"> - Не использовать скрипты (программы) для автоматизированного сбора информации и/или взаимодействия с Сайтом и его Сервисами.</li>' +
            '</p>' +
            '<h4 class="card-subtitle text-muted mb-1 mt-2">Администрация обязуется:</h4>' +
            '<p class="card-text">' +
                '<li class="list-unstyled"> - Поддерживать работоспособность сайта за исключением случаев, когда это невозможно по независящим от Администрации причинам.</li>' +
            '</p>' +
            '<h4 class="card-subtitle text-muted mb-1 mt-2">Ответственность сторон:</h4>' +
            '<p class="card-text">' +
                '<li class="list-unstyled"> - Пользователь лично несет полную ответственность за распространяемую им информацию;</li>' +
                '<li class="list-unstyled"> - Администрация не несет никакой ответственности за услуги, предоставляемые третьими лицами;</li>' +
                '<li class="list-unstyled"> - В случае возникновения форс-мажорной ситуации (боевые действия, чрезвычайное положение, стихийное бедствие и т. д.) Администрация не гарантирует сохранность информации, размещённой Пользователем, а также бесперебойную работу информационного ресурса.</li>' +
            '</p>' +
            '<h4 class="card-subtitle text-muted mb-1 mt-2">Условия действия Соглашения:</h4>' +
            '<p class="card-text">Данное Соглашение вступает в силу при любом использовании данного сайта.' +
            'Соглашение перестает действовать при появлении его новой версии.' +
            'Администрация оставляет за собой право в одностороннем порядке изменять данное соглашение по своему усмотрению.' +
            'Администрация не оповещает пользователей об изменении в Соглашении.</p>' +
        '</div>'+
    '</body>',
    data: {

        nav:'',
    },

    created: function () {

        axios.get('/nav').then(result => {
            this.nav=result.data,
window.userId = result.data.id,
window.userGroup = result.data.userGroup
        });
    },
});

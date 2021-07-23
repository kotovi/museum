<#macro page>
    <!DOCTYPE html>
    <html lang="ru" style="height:100%; position:relative;">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="Иван Котов" />
        <title>МАЁВКА – 2021</title>
        <!-- Favicon-->
        <link rel="icon" type="image/x-icon" href="assets/img/favicon.ico" />
        <!-- Font Awesome icons (free version)-->
        <script src="https://use.fontawesome.com/releases/v5.15.1/js/all.js" crossorigin="anonymous"></script>
        <!-- Google fonts-->
        <script src="/js/public/sockjs.min.js"></script>
        <script src="/js/public/stomp.js"></script>
        <script src="/js/public/lodash.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css" />
        <!-- Third party plugin CSS-->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" rel="stylesheet" />
        <!-- Core theme CSS (includes Bootstrap)-->
        <link href="css/styles.css" rel="stylesheet" />


        <link rel="stylesheet" type="text/css"  href="/css/plyr.css" />
        <link rel="stylesheet" type="text/css"  href="/css/date.css" />

        <script src="/js/public/vue.js"></script>
        <script src="/js/public/vue-resource.js"></script>
        <script src="/js/public/jquery-3.2.1.slim.min.js"></script>
        <script src="/js/public/popper.min.js"></script>
        <script src="/js/public/bootstrap.min.js"></script>
        <script src="/js/public/axios.min.js"></script>

        <script src="/js/public/polyfill.min.js"></script>
        <script src="/js/public/bootstrap-vue.min.js"></script>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Third party plugin JS-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js"></script>
        <!-- Core theme JS-->
        <script src="js/scripts.js"></script>

        <script>
            var ua = window.navigator.userAgent.toLowerCase(),
                is_ie = (/trident/gi).test(ua) || (/msie/gi).test(ua);
            if (is_ie){
                alert("Внимание! Для корректной работы сайта необходимо использовать браузер Google Chrome, Mozilla Firefox, Opera, Safari. В браузерах семейства Internet Explorer Корректная работа сайта не гарантируется!!!");
            }
            $(function () {
                $(document).scroll(function () {
                    var $nav = $(".navbar-fixed-top");
                    $nav.toggleClass('navbar-scrolled', $(this).scrollTop() > $nav.height());
                });
            });
        </script>

    </head>

    </html>
</#macro>

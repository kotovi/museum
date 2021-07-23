<#import "parts/common.ftl" as c>

<@c.page>
</@c.page>

<body xmlns="http://www.w3.org/1999/html">
    <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light fixed-top navbar-fixed-top-dark py-3" id="mainNav">
        <div class="container">
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                    data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                    aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto my-2 my-lg-0">
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="/">Главная</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="/#authors">Организаторы</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="/#reports">Доклады</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="/#contact">Принять участие</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="/login">Войти</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <section class="page-section" id="login">
        <div style="background: #fff; margin-bottom: 100px;" class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6 col-md-6 text-center">
                    <form action="login" method="post">
                        <fieldset>
                            <h1 class="display-4 mt-5 mb-5 text-muted"> Вход</h1>
                            <#if Session?? && Session.SPRING_SECURITY_LAST_EXCEPTION??>
                                <div class="alert alert-danger" role="alert">
                                    <p> Не верный логин или пароль!</p>
                                    <p> Не получается Войти? Для восстановления доступа перейдите по <a href="/passwordrequest">ССЫЛКЕ</a>.</p>
                                    <p> Если Вы не можете получить письмо с данными для восстановления пароля, можно обратиться к <a href="mailto:kotov.irk@gmail.com">разработчику</a>.</p>
                                </div>
                            </#if>
                            <div class="form-group">
                                <label class="text-muted" for="firstname">Логин(e-mail):</label>
                                <input type="text" name="username" id="username" class="form-control input-lg"
                                   placeholder="Имя пользователя" required="true" autofocus="true"/>
                            </div>
                            <div class="form-group">
                                <label class="text-muted" for="firstname">Пароль:</label>
                                <input type="password" name="password" id="password" class="form-control input-lg"
                                   placeholder="Пароль" required="true"/>
                            </div>
                            <input type="submit" class="btn btn-primary" style="margin: 10px;" value="Войти"/>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </section>
        </div>

    </body>


<#import "parts/footer.ftl" as f>
<@f.page></@f.page>
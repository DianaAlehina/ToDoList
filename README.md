# ToDoList

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Доп. информация
Проект был реализован, как тестовое задание Angular в Совкомбанк.

Сделать приложение todo-list с авторизацией пользователя. В качестве сервера нужно использовать https://dummyjson.com/docs. Разделы auth и todos. Ссылка на дизайн в figma
# Требования:
1. Приложение состоит из двух страниц: авторизация и список задач. Список задач должен быть доступен только для авторизованного пользователя.
2. При старте приложения, angular должен проверять есть ли token в local storage. При его наличии надо авторизовать по нему пользователя и при успешной авторизации, выводить его имя, фамилию и аватар.
3. Если bearer token отсутствует или недействителен, то показывать форму входа по логину и паролю, список пользователей с логином и паролем для теста доступен по ссылке https://dummyjson.com/users. В ответ придет токен, который надо сохранять в local storage и цеплять к запросам в headers: ‘Authorization’: ‘Bearer TOKEN’.
4. После успешной авторизации надо подгружать список задач с сервера для данного пользователя по userId и сохранять их в state приложения
5. Должна быть возможность добавлять, редактировать, удалять задачи.
6. Опции редактирования: изменение текста, установка флага о завершении задачи.
7. Должна быть возможность сортировки по id и завершено/не завершено
8. Сделать функционал выхода из приложения, при котором надо удалять из local storage
токен авторизации и возвращать на стартовую страницу
9. Кнопки и инпуты должны менять свое отображение в зависимости от действий
пользователя
10. Должна быть валидация инпутов по минимальной длине символов - 4

# Дополнительно:
Сделать возможность переключения режима приложения оффлайн: посты для пользователя сохраняются в local storage; онлайн – работа с постами идет через сервер

Добавить angular animations при удалении и добавлении задачи

Сделать адаптивным

Подключить ESLint и сделать прекоммит хук который будет проверять код перед тем как создать коммит

# Стэк:
TS, Angular, NgRx, RxJs, Tailwind CSS / Scss / SASS

# Ограничения:
Для работы с формами нужно использовать реактивные формы

Нельзя использовать готовые библиотеки компонентов

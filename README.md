# Rick & Morty

## Допущения в проекте

1. Загрузка полного списка в цикле в хранилище производится путем простейшего увеличения номера страницы, хотя по идее - раз имеются полноценные ссылки на следующие страницы - следовало бы использовать именно их. Но в целях упрощения конфигурации в api-файле решил сделать именно так, тем более что это соответствует логике построения запросов на api-сервере;

2. Порядок сортировки нескольких полей принят за постоянный - ПОЛ -> ИМЯ -> ПРОИСХОЖДЕНИЕ. По-хорошему надо было бы сделать возможность изменять порядок путем, к примеру, перетаскивания кнопок фильтров SortButton внутри панели PanelSorts между собой;

3. Анимацию списка через `transition-group` хотел добавить, но тормоза дикие, особенно при изменении ширины экрана в том же devTools, и, кроме того, в силу большого количества элементов плавность сортировки в некоторых случаях почти незаметна;

## TODO

1. Полагаю, лучше перенести сортировку из HomeView в store, чтобы при перезагрузке списка достаточно было вызвать просто loadCharacters без параметров, а все операции с фильтрациями и сортировками производились на стороне хранилища автоматически;

2. Надо отображать вместо картинки какой-нибудь спиннер, пока картинка загружается из сети.

## Запуск

```js
npm install
```

### Compiles and hot-reloads for development

```js
npm run serve
```

### Compiles and minifies for production

```js
npm run build
```

### Lints and fixes files

```js
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

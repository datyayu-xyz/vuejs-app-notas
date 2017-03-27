## Intro
- review
- Disclaimer

## Que vamos a crear
Esta vez crearemos una aplicacion para tomar notas. Algo bastante simple pero que a la vez pone en practica los conceptos que hemos revisado en posts anteriores.

Para esta app, tendremos en cuenta 5 objetivos que nuestra app debe poder lograr:
- Crear notas
- Guardar notas
- Mostrar lista de notas
- Mostrar notas individuales
- Borrar notas

Aqui una vista previa de como quedara nuestra app despues de que la completemos:

## Preparacion
Antes de meternos en Vue de lleno, preparemos lo necesario para que nuestra app se vea bien.

Primero tenemos que crear nuestro `index.html` que sera la pagina donde correra nuestra aplicacion.

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejemplo</title>
</head>
<body>
    <div id="app">
        <!-- Aqui iran nuestros templates -->
    </div>
</body>
</html>
```

Nada fuera de lo comun, una estructura de html bastante basica y con la cual ya deberias de estar familiarizado. Lo unico a resaltar aqui es el `div` con el id `app`. Aqui sera donde montaremos nuestra aplicacion de Vue.

#### Bootstrap
Tambien anadiremos bootstrap para que nuestra aplicacion tenga un buena apariencia sin tener que complicarnos de mas.
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejemplo</title>

    <!-- Agrega este link -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">

    <!-- Estilos adicionales -->
    <style>
        .card {
            margin: 1em 0;
        }

        li {
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div id="app" class="container">
        <!-- Aqui iran nuestros templates -->
    </div>
</body>
</html>
```

Este archivo de css que enlazamos es de [la version 4 de bootstrap](https://v4-alpha.getbootstrap.com/), la cual aun esta en alpha pero igual recomiendo que te vayas familiarizando con ella pues es el futuro de bootstrap.

Tambien te abras dado cuenta de que agregue un par de estilos adicionales y la clase `container` al div `#app`. Esto solo es para mejorar un poco el aspecto de la aplicacion conforme la vayamos desarrollando.

#### Javascript

Por ultimo antes de empezar a trabajar en la aplicacion. Enlaceremos Vue directamente de su cdn.

```html
<script src="https://unpkg.com/vue"></script>
```

Y tambien aprovecharemos para enlazar nuestro propio javascript, que sera donde pondremos nuestra instancia de Vue.

```html
<script src="./app.js"></script>
```

De manera que al final tendremos algo como:
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejemplo</title>

    <!-- Agrega este link -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">

    <!-- Estilos adicionales -->
    <style>
        .card {
            margin: 1em 0;
        }

        li {
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div id="app" class="container">
        <!-- Aqui iran nuestros templates -->
    </div>

    <!-- Scripts -->
    <script src="https://unpkg.com/vue"></script>
    <script src="./app.js"></script>
</body>
</html>
```

Puedes copiar esto directamente en tu index.html y con esto estamos listos para iniciar.


## Creando la instancia de Vue.
Lo primero que ocupamos hacer es crear una instancia de Vue. Esta contendra toda la aplicacion y la iremos ampliando en cada paso.

En un archivo `app.js`, instanciamos Vue de la siguiente manera:

```js
new Vue({
  el: '#app'
})
```

Simplemente creamos la instancia y le decimos que sea montada en el elemento con el id app (mediante el selector `#app`).

Para asegurarnos que la instancia haya sido montada correctamente podemos mostrar un pequeno `hola mundo`.

```js
new Vue({
  el: '#app',
  data: {
      msg: 'hola mundo'
  }
})
```
```html
<div id="app" class="container">
  {{ msg }}
</div>
```

A nuestra instancia de Vue le agregamos una variable (`msg`) que contiene un mensaje (`hola mundo`) y en el html lo mostramos usando interpolacion simple (`{{ msg }}`).

Si todo salio bien, deberias tener algo como esto:
![](IMAGE_HERE)

Tal vez veas un pequeno flasheo de `{{ msg }}` antes de que sea remplazado por `hola mundo`. No te preocupes por ello, esto es debido a que estamos usando Vue via cdn y en modo de desarrollo, en produccion ese "flash" no ocurre.

## Creando una nueva nota
Una vez creada nuestra instancia de Vue, empezaremos creando el formulario para crear una nota.

```html
<div class="form-group">
    <label>Titulo</label>
    <input type="text" class="form-control">
</div>

<div class="form-group">
    <label>Nota</label>
    <textarea class="form-control" rows="5"></textarea>
</div>

<button class="btn btn-primary"> Guardar </button>
```

Aqui tenemos dos campos (`titulo` y `nota`), los cuales permitiran al usuario introducir el texto que ellos deseen.

Para poder acceder a estos valores desde Vue, los enlazaremos usando `v-model`.
```js
new Vue({
  el: '#app',

  data: {
    titulo: '',
    texto: ''
  }
})
```
```html
<div class="form-group">
    <label>Titulo</label>
    <input v-model="titulo" type="text" class="form-control">
    {{ titulo }}
</div>

<div class="form-group">
    <label>Nota</label>
    <textarea v-model="texto" class="form-control" rows="5"></textarea>
    {{ texto }}
</div>

<button class="btn btn-primary"> Guardar </button>
```

Lo que hicimos aqui es agregar dos variables a nuestra instancia de Vue (`titulo` y `texto`). Despues las enlazamos en nuestro template usando `v-model`, de esta manera cualquier cambio que realicemos a los inputs de texto actualizara automaticamente el valor de la variable.

Tambien mostramos el valor actual de cada uno inmediatamente debajo de cada input para asegurarnos de que este funcionando propiamente.

![](IMAGE_HERE)


## Guardando la nota
Ya que enlazamos el formulario con la instancia de Vue, lo siguiente es poder guardar la nota al hacer click en `Guardar`.

Para esto, empezaremos por agregar otro variable a nuestra instancia de Vue:
```js
new Vue({
  el: '#app',

  data: {
    titulo: '',
    texto: '',
    notas: []
  }
})
```

Aqui agregamos `notas` como variable y esta contendra la lista de notas que vayamos creando.

Lo siguiente es reaccionar el click del boton.

```html
<button @click="guardarNota" class="btn btn-primary"> Guardar </button>
```
```js
new Vue({
  //...

  methods: {
    guardarNota: function() {
      var nota = {
        id: Date.now(),
        titulo: this.titulo,
        texto: this.texto
      }

      this.notas.push(nota)

      this.texto = ''
      this.titulo = ''

      console.log(this.notas)
    }
  }
})
```
En el template agregamos una directiva `@click="guardarNota"`. Esta le dice a Vue que escuche por el evento `click` y cuando eso ocurra ejecute el metodo `guardarNota`, el cual declaramos dentro de la instancia de Vue.

```js
guardarNota: function() {
  var nota = {
    id: Date.now(),
    titulo: this.titulo,
    texto: this.texto
  }

  this.notas.push(nota)

  //...
}
```
En el metodo lo que hacemos es crear primero un objeto `nota` que contendra los datos que introdujo el usuario en los inputs y ademas un id para poder identificarla. Despues agregamos esa nota a la lista de notas usando `this.notas.push(nota)`.

```js
guardarNota: function() {
  //...

  this.texto = ''
  this.titulo = ''

  console.log(this.notas)
}
```
Por ultimo limpiamos los inputs, igualandolos a `''` o un string vacio, y mostramos en la consola la lista de notas guardadas para comprobar que se vayan agregando.

Si todo funciona correctamente, deberias poder ver la lista crecer conforme vas creando notas.

#### Observer
Probablemente al mostrar la lista de notas en la consola veas algo como `[Object, Object, __ob__: Observer]`. Este `__ob__: Observer` es una propiedad especial que Vue le agrega a nuestras variables para poder saber cuando las modificamos y reaccionar en base en ello. Lo mas seguro es que nunca tengas que meterte con esta propiedad y, ya que no afecta nuestra logica, es seguro ignorarla.


## Mostrar lista de notas
- cards
- v-for

## Routing
- disclaimer (not real routing)
- uso de `template`
- v-if
- togglear

## Mostrar nota individual
- html
- `mostrarNota`
- pasando argumentos @click


## conclusion
- comentario
- vue-cli

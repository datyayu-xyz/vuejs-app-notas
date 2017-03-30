new Vue({
    el: '#app',

    data: {
        titulo: '',
        texto: '',
        notas: [],
        notaActivaId: null,
        creandoNota: false,
        pantalla: 'lista',
    },

    computed: {
        notaActiva: function() {
            var vm = this;

            return vm.notas.find(function(nota) {
                return nota.id === vm.notaActivaId;
            })
        }
    },

    methods: {
        crearNota: function() {
            this.titulo = '';
            this.texto = '';
            this.pantalla = 'nueva';
        },

        guardarNota: function() {
            if (!this.titulo || !this.texto) {
                alert('La nota requiere de un titulo y contenido!')
                return;
            }

            var nota = {
                id: Date.now(),
                titulo: this.titulo,
                texto: this.texto,
            };

            this.notas.push(nota);
            this.pantalla = 'lista';
        },

        cancelarNota: function() {
            this.areaActiva = '';
            this.pantalla = 'lista';
        },

        mostrarNota: function(id) {
            this.notaActivaId = id;
            this.pantalla = 'nota';
        },

        ocultarNota: function() {
            this.notaActivaId = null;
            this.pantalla = 'lista';
        },

        borrarNota: function() {
            this.notas = this.notas.filter(nota => nota.id !== this.notaActivaId)
            this.notaActivaId = null;
            this.pantalla = 'lista';
        }
    },
});

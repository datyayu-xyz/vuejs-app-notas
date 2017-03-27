new Vue({
    el: '#app',

    data: {
        titulo: '',
        texto: '',
        notas: [],
        notaActivaId: null,
        creandoNota: false,
        mostrandoNota: false,
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
            this.creandoNota = true;
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
            this.creandoNota = false;
        },

        cancelarNota: function() {
            this.areaActiva = '';
            this.creandoNota = false;
        },

        mostrarNota: function(id) {
            this.notaActivaId = id;
            this.mostrandoNota = true;
        },

        ocultarNota: function() {
            this.notaActivaId = null;
            this.mostrandoNota = false;
        },

        borrarNota: function() {
            this.notas = this.notas.filter(nota => nota.id !== this.notaActivaId)
            this.notaActivaId = null;
            this.mostrandoNota = false;
        }
    },
});

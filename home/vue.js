// VUE es un framework de JS
// Usamos plantilla CDN


/* <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script> ESTE SCRIPT LO PONEMOS ANTES DE NUESTRO MAIN.JS PARA QUE TOME LAS CLASES DE VUE

<div id="app">{{ message }}</div> LO PONEMOS EN EL HMTL ENGLOBANDO TODO LO QUE QUIERO QUE SE TRABAJE CON VUE (TODO EL BODY) LO QUE QUEDE FUERA DE ESTE DIV VA A FUNCIONAR PERO SIN VUE

<script> VA EN NTA HOJA DE JS, CREATEAPP ES UNA PROPIEDAD DEL OBJETO VUE. SE PUEDE PONER COMO VUE.CREATEAPP O DESESTRUCTURANDO CREATEAPP COMO ACA
  const { createApp } = Vue

  createApp({                     LE PASA UN ARGUMENTO QUE ES UN OBJETO (es una funcion pero le pasa un objeto)
    data() {                      DATA ES UN METODO DEL OBJETO QUE VA A DEVOLVER OTRO OBJETO, ESE OBJETO TENDRA LAS PROPIEDADES Q USAREMOS. 
      return {                     EN DATA IRAN LAS PROPIEDADES QUE VAN A SER REACTIVAS
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')  =======>   DESPUES DE QUE SE EJECUTO EL CREATE.APP RECIEN AHI HACE EL .MOUNT QUE SERIA DÓNDE VOY A PONER LA APP DE VUE O SEA,
    VOY  A PONER LA APLICACION DE VUE EN EL ELEMENTO QUE TENGA ID APP

</script> */


// DESESTRUCTURANDO CREATE APP:

const { createApp } = Vue

createApp({
    data(){
        return {
            eventos: [],
            categ: [],
            filteredEvents: [],
            checked: [],
            search: "",
        }

    }, 
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")  
        .then(response => response.json())
        .then(data => {
            this.eventos = data.events
            this.filteredEvents = [...this.eventos]
            this.createCategories()
                    //con el this hago referencia a todo el objeto que creó la ap de vue y le asigno data
        })
    },
    methods:{
         createCategories: function() {
            let categories = this.eventos.map((event) => event.category);
            let set = new Set(categories);
            this.categ = Array.from(set);
          },
          filterCrossed: function () {
            let filteredSearch = this.eventos.filter(evento => evento.name.toLowerCase().includes(this.search.toLowerCase()))
            let filteredChecks = filteredSearch.filter(evento => this.checked.includes(evento.category) || this.checked.length === 0)
            this.filteredEvents = filteredChecks
          },
      
    }
}).mount('#app')

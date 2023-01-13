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
    data() {
        return {
            percentages: [],
            capacities: [],
            events: [],
            pastEvents: [],
            upcomingEvents: [],
            highestPercentage: undefined,
            indexHighestEvent: undefined,
            lowestPercentage: undefined,
            indexLowestEvent: undefined,
            highestCapacity: undefined,
            indexOfMaxCap: undefined
        }

    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then(response => response.json())
            .then(data => {
                this.events = data.events
                this.upcomingEvents = data.events.filter(evt => evt.date > data.currentDate)
                this.pastEvents = data.events.filter(evt => evt.date < data.currentDate)
                console.log(this.upcomingEvents)
                this.percentages = this.pastEvents.map(evt => evt.assistance / evt.capacity * 100)
                this.capacities = data.events.map(evt => evt.capacity)
                this.highestPercentage = Math.max(...this.percentages)
                this.indexHighestEvent = this.percentages.indexOf(this.highestPercentage)
                this.lowestPercentage = Math.min(...this.percentages)
                this.indexLowestEvent = this.percentages.indexOf(this.lowestPercentage)
                this.highestCapacity = Math.max(...this.capacities)
                this.indexOfMaxCap = this.capacities.indexOf(this.highestCapacity)
            })
    },
    methods: {
        multiplicar: function (dato1, dato2){
            let resultado = dato1 * dato2
            return resultado.toLocaleString()
          },

          porcentaje: function (dato1, dato2){
            let resultado = dato1 / dato2 * 100
            return resultado.toFixed(2).toLocaleString()
          }
    }
}).mount('#app')

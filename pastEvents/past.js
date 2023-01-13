
const { createApp } = Vue

createApp({
    data(){
        return {
            pastEvents: [],
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
          this.pastEvents = data.events.filter(event => event.date < data.currentDate)
            this.filteredEvents = [...this.pastEvents]
            this.createCategories()
                    //con el this hago referencia a todo el objeto que creó la ap de vue y le asigno data
        })
    },
    methods:{
         createCategories: function() {
            let categories = this.pastEvents.map((event) => event.category);
            let set = new Set(categories);
            this.categ = Array.from(set);
          },
          filterCrossed: function () {
            let filteredSearch = this.pastEvents.filter(evento => evento.name.toLowerCase().includes(this.search.toLowerCase()))
            let filteredChecks = filteredSearch.filter(evento => this.checked.includes(evento.category) || this.checked.length === 0)
            this.filteredEvents = filteredChecks
          },
      
    }
}).mount('#app')



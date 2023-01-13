const { createApp } = Vue

createApp({
    data(){
        return {
            evento: [],
        }

    }, 
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")  
        .then(response => response.json())
        .then(data => { this.evento = this.searchEvents (data.events)
           
        })
    },
    methods:{
        searchEvents : function (data) {
            let cadenaParametroUrl = location.search
            let parametros = new URLSearchParams(cadenaParametroUrl) 
            let id = parametros.get("id")
            return data.find(event => event._id === id )
        }

    }
}).mount('#app')
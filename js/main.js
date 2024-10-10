const buscador=document.querySelector("#buscador")
const botones=document.querySelector("#botones")
const galeria=document.querySelector("#galeria")




//events



//funciones


const crearBotones=()=>{
    const categorias=["naturaleza", "animales", "paisajes"]

    categorias.forEach((item)=>{
    botones.innerHTML+=`<button>${item}</button>`
    })
}
crearBotones()

const buscadorImagenes=()=>{
    


}
buscadorImagenes(categorias)
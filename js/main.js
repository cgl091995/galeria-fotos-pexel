

const buscador=document.querySelector("#buscador")
const botones=document.querySelector("#botones")
const galeria=document.querySelector("#galeria")




const urlBase = "https://api.pexels.com/v1/";
 

document.addEventListener("click", (ev)=>{
  if(ev.target.matches("button")){
  const tag=ev.target.id
  console.log(tag)
  mostrarImagenes(ev.target.categoria)
  
  
  
  }
})

    

/*
acceder a los id de las fotos de pexel para pintar imágenes
crear evento imagen para desplegar las imágenes relacionadas
*/



const obtenerDatos=async(url)=>{
    try{
        const getDatos=await fetch((`${urlBase}/${url}`), {
            method: 'GET',
            headers: {
              'Authorization': 'HLPK8STnCB3O3T8g0yYjcPmv1hNDPDFT0UJP9Qmg3SmtcPTJrE6EGXwq'
            }
          })
                     
            if (getDatos.ok) {
                let image = await getDatos.json()
                
                return image
            
            } else{
                throw(Error("Este es el mensaje de Error")) 
            }
        
      } catch (error){
        throw error.message
      }
      
}

    
const pintarBotones=async()=>{
     const arrayBotones=[
    
        {  
             categoria: "paisaje",
             id: "957024" 

        },
         {
             categoria: "animales",
             id:"1108099",
         },
        {
             categoria: "edificios",
             id:"22922026"
             
         }
    ] 
    try{
        arrayBotones.forEach(async({categoria, id})=>{
        const image= await obtenerDatos(`photos/${id}`)
        
          botones.innerHTML+=
          `<div>
          <button id="${categoria}">${categoria}</button>
          <img src=${image.src.small} alt=""></img>
          </div>`
          
        })
        
         
    }
    catch (error){
        
        
    }
}
pintarBotones()



const mostrarImagenes=async(categoria, id)=>{

  try{
      const image = await obtenerDatos(`search?query=${categoria}`) 
      
      galeria.innerHTML+=
      `
      <section>
      <img src=${image.src.medium} alt=""></img>
      </section>
      `
      
      
      
        

  }
  catch (error){
        
       
  } 

}
mostrarImagenes()


//`${urlBase}/search?query=${categoria}`
    





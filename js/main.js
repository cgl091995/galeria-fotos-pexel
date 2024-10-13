document.addEventListener("DOMContentLoaded", (ev) => {

  /*---------------------------- 
           VARIABLES 
  ----------------------------*/ 
  
  //elementos del dom seleccionados
  const buscador=document.querySelector("#buscador")
  const botonBusqueda=document.querySelector("#botonBusqueda")
  const botones=document.querySelector("#botones")
  const galeria=document.querySelector("#galeria")
  const orientacion=document.querySelector("#orientacion")
  const fragment=document.createDocumentFragment()
  const botonPaginacion=document.querySelector("#botonPaginacion")
  //variables globales 
  let orientacionValue= ""
  let categoria=""
  let totalResultados=50
  let numeroPagina=1
  let fotosPorPagina=12
  let keyword=""
  
  const urlBase = "https://api.pexels.com/v1/";
  
  
  /*---------------------------- 
           EVENTOS 
  ----------------------------*/
  
  
  document.addEventListener("click", (ev)=>{
    if(ev.target.matches("#botones button")){
      categoria=ev.target.id
      console.log(`valor actual categoria: ${categoria}`)
      mostrarImagenes(`search?query=${categoria}&orientation=${orientacionValue}&page=${numeroPagina}&per_page=${fotosPorPagina}`)
      
    }
  })
  
  orientacion.addEventListener("change",(ev)=>{
      orientacionValue=ev.target.value
      
      mostrarImagenes(`search?query=${categoria}&orientation=${orientacionValue}&page=${numeroPagina}&per_page=${fotosPorPagina}`)
  })
  
  document.addEventListener("click", (ev)=>{
    if(ev.target.matches(`#botonPaginacion button`)){
      if(ev.target.id == "back" && numeroPagina > 1){
         numeroPagina--
      }
    
  
      if(ev.target.id == "next"){
      numeroPagina++
      }
      mostrarImagenes(`search?query=${categoria}&orientation=${orientacionValue}&page=${numeroPagina}&per_page=${fotosPorPagina}`) 
      pagNumber.innerHTML=""
        
        const texto=document.createElement("P")
        texto.textContent= `pag.${numeroPagina}`
        fragment.append(texto)
        pagNumber.append(fragment)
    }
  })

  document.addEventListener('keydown', (ev)=> {
    if(ev.key==="Enter" && document.activeElement === buscador){
      categoria=buscador.value
      ev.preventDefault();
      console.log(buscador.value)
      mostrarImagenes(`search?query=${categoria}&orientation=${orientacionValue}&page=${numeroPagina}&per_page=${fotosPorPagina}`)
    }
  })
   
  document.addEventListener("click", (ev)=>{
    if (ev.target.matches(`#botonBusqueda`)) {
      categoria=buscador.value
      ev.preventDefault();
      console.log(buscador.value)
      mostrarImagenes(`search?query=${categoria}&orientation=${orientacionValue}&page=${numeroPagina}&per_page=${fotosPorPagina}`)
    }
  })
      
  document.addEventListener('click', (ev) => {
    if (ev.target.tagName === 'IMG') {
      window.open(ev.target.src, '_blank');
      }
  });
  /*---------------------------- 
           FUNCIONES 
  ----------------------------*/
  
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
               categoria: "paisajes",
               id: "957024" 
  
          },
           {
               categoria: "animales",
               id:"12475794",
           },
          {
               categoria: "edificios",
               id:"22922026"
               
           }
      ] 
      try{
          arrayBotones.forEach(async({categoria, id})=>{
            const image= await obtenerDatos(`photos/${id}`)
            //console.log(image)
            botones.innerHTML+=`<article>
            <div><img src=${image.src.small} alt=""></img></div>
            <button id="${categoria}">${categoria}</button>
            </article>`
            
          })
          
           
      }
      catch (error){
          console.log(error)
          
      }
  }
  
  const mostrarImagenes=async(url)=>{
    
    try{
        const resp = await obtenerDatos(url) 
        const {photos}=resp
        //console.log(photos)
        galeria.innerHTML=""      //espacio en blanco
        photos.forEach(async({src,alt,photographer})=>{
        const caja=document.createElement("FIGURE")
        const foto=document.createElement("IMG")
        foto.src= `${src.medium}`
        foto.alt=`${alt}`
        const pie=document.createElement("FIGCAPTION")
        pie.textContent=`Fotografía de ${photographer}`
        
        caja.append(foto, pie)
        fragment.append(caja)
        galeria.append(fragment)
  
        })
    }
  
    catch (error){
      console.log(error)
      galeria.innerHTML=""      //espacio en blanco
        
        const caja=document.createElement("FIGURE")
        const texto=document.createElement("P")
        texto.textContent= `No se han encontrado resultados`
        
        caja.append(texto)
        fragment.append(caja)
        galeria.append(fragment)
  
        
              
    } 
  }
  
  /*---------------------------- 
           INVOCACIONES 
  ----------------------------*/
  pintarBotones()
  
  
  })
  
  
      
  
  
  
  
  
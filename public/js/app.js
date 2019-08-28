const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const forecastMsg = document.querySelector('#forecast')
const locationMsg = document.querySelector('#location')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    forecastMsg.textContent = 'Yükleniyor ...'
    locationMsg.textContent = ''

    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{
        response.json().then((data)=>{
           if(data.error){
                
                forecastMsg.textContent = data.error
                locationMsg.textContent = ''
           }else{
                
                forecastMsg.textContent = data.forecast
                locationMsg.textContent = data.location
           }
        })
    })
})
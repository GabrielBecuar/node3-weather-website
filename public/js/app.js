const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading.. '
    

    fetch('http://localhost:3000/weather?address='+ location).then((Response)=>{
    Response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        }else{
            console.log(data.location)
            console.log(data.forecast)

            messageOne.textContent = 'Location: '+ data.location
            messageTwo.textContent = 'Weather: ' + data.forecast
        }
    })
})

})
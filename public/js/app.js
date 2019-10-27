console.log("Client side js loaded")

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })

})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent='Loading ...'
//const messageOne = document.querySelector('.className')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
    console.log('/weather?address='+location)


    messageTwo.textContent=''
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if ( data.error ) {
                messageOne.textContent="error: "+JSON.stringify(data.error)
            } else {
                messageOne.textContent="location:"+data.location
                messageTwo.textContent="forecast:"+data.forecastData
            }
        })
    })

})

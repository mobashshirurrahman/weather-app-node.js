console.log("Client side javascript loaded!");



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    messageOne.textContent="Loading..."
    messageTwo.textContent = ""
    const location = search.value;
    fetch("http://localhost:3000/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if (data.error){
                messageOne.textContent = data.error;
                messageOne.style.backgroundColor = "tomato";
                messageOne.style.padding = '8px'
               return console.log("ddd",data.error)
            }
            messageOne.style.backgroundColor = "white";
                messageOne.style.padding = '0px'
            messageOne.textContent= data.geocode;
            messageTwo.textContent = data.forcast;
            console.log("data ",data);
        })
    })

    
    // console.log(location);

})

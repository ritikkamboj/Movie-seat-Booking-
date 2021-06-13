const container=document.querySelector('.container');
const seats= document.querySelectorAll('.row .seat:not(.occupied)');
// seats goes to nodelist which is just like array in js 
// also we have to select that seat in nodelist , which are unoccupied , see the line above carefully (it's interesting )
 
const count=document.getElementById('count');
const total= document.getElementById('total');
const movieSelect=document.getElementById('movie');


populateUI();
let ticketPrice=+movieSelect.value;
// console.log( ticketPrice);

//save selected movie index na dprice 
function setMovieData(movieIndex,moviePrice)
{
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}



// update total and count 

function updateSelectedCount(){

    const selectedSeats=document.querySelectorAll('.row .seat.selected');
    // console.log(selectedSeats);
    
    //we know by printing selectedSeats , we get nodelist , but the thing is that we require some array 
    //so we have to do is 
    //copy selected seats into arr
    //Map through array
    //return a new Array

    const seatsIndex=[...selectedSeats ].map(function(seat){
        //toh yaha pe hame un seats ke index chahiye ,jo selct ho rakhi hai , uske liye hume pehle seats fetch karni padegi DOM mein se 
        //that's why we write seats
        return[...seats].indexOf(seat)
    })
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

    // console.log(seatsIndex);
    const selectedSeatsCount=selectedSeats.length;

    // console.log(selectedSeatsCount); // yaha bhi isne clearly count ni diya , but also gives some extra information 

    count.innerText=selectedSeatsCount;
    
    // console.log(count.innerText);  // ab diya isne clearly only number of selcted seats 

    total.innerText=selectedSeatsCount* ticketPrice;


}

//get data from local storage and populate UI
//pehlr setItem kara tha as you see above ,ab get kaare hai use 
function populateUI(){
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);
    if(selectedSeats!==null && selectedSeats.length>0)
    {
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }

        })
    }
    const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex!==null)
    {
        movieSelect.selectedIndex=selectedMovieIndex;
        //yaha hoga kya ki jab hum , koi hor movie select karenge tab seat ke according rate and no of seats niche line mein toh print hojega par , jab hum koi hor movie select kaenge tab bhi 
        //rate and number of seats update hojenge , par par par yaha reload karne pe ,uske baad rate or seats ki value zero hojaengi

    }
}
// movie selected event
movieSelect.addEventListener('change',e => {

    ticketPrice=+e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();


})
 
//now coming on seats , we can use foreach concept , but we go with ( see below );

container.addEventListener('click' ,e =>
{
    // console.log(e.target);
    if((e.target.classList.contains('seat')) && (!e.target.classList.contains('occupied')))
    {
        // console.log(e.target);
        e.target.classList.toggle('selected');

        updateSelectedCount();

    }



})
//initial count and total set
updateSelectedCount(); //yeh tab ki karwayi ki ja rahi hai , jab reload karenge 

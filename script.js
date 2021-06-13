const container=document.querySelector('.container');
const seats= document.querySelectorAll('.row .seat:not(.occupied)');
// seats goes to nodelist which is just like array in js 
// also we have to select that seat in nodelist , which are unoccupied , see the line above carefully (it's interesting )
 
const count=document.getElementById('count');
const total= document.getElementById('total');
const movieSelect=document.getElementById('movie');


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
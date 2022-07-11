//ajax handle post request of data

$(document).ready(function () {
   $('form').on('submit', function () {
       const car = $('form input');
       const cars_list = {car: car.val()};

       //ajax
       $.ajax({
           type: 'POST',
           url: '/add/car',
           data: cars_list,
           success: function (response){
               //react framework
               console.log(response);
               location.reload();
           },
           error: function (error){
               console.log(error);
               location.reload();
           }
       });
       return false;
   });
});
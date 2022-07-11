//ajax handle post request of data

$(document).ready(function () {
    //post to list request
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

   //delete list item request
    $('li').on('click', function () {
        const car = $(this).text().replace(/ /g, "-");
        $.ajax({
           type: 'DELETE',
           url: '/delete/car/' + car,
            success: function (response){
               console.log(response);
               location.reload();
            },
            error: function (error){
               console.log(error);
               location.reload();
            }
        });
    });
});
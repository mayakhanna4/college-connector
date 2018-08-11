/*global $*/
var authId;

$(function() {
  $('#logInButton').ready(function() {
    console.log("submitted");
    $.ajax({
      type: "POST",
      url: "https://www.bigparser.com/APIServices/api/common/login",
      data: JSON.stringify({
        "emailId": "collegeconnector2017@gmail.com",
        "password": "kosek123",
        "loggedIn": true
      }),
      success: function(body) {
        console.log(body.authId);
        authId = body.authId;
      },
      dataType: "json",
      contentType: "application/json"
    })
  })
  $('#searchButton').click(function() {
      var toSearch = $('#searchTerm').val();
      console.log(toSearch)
      console.log("submitted");
      $.ajax({
          type: "POST",
          url: "https://www.bigparser.com/APIServices/api/query/table",
          headers: {
            authId: authId
          },
          data: JSON.stringify({
            "gridId": "58d6f8871984570570d3ac1b",
            "viewId": null,
            "selectColumnsStoreName": [],
            "rowCount": 50,
            "tags": [],
            "keywords": [toSearch]
          }),
          success: function(body) {
            $('#dataT').empty();
            $('#dataT').append('<tr><th>Name</th> <th>Year Graduated from TJ</th><th>Colleges attended</th><th>Major</th><th>Employers</th><th>Email</th><th>Phone Number</th><th>LinkedIn</th></tr>');
            $.each(body.rows, function(index, item) {
                
                $('#dataT').append('<tr>'+'<td>'+item.data[1]+'</td>'+'<td scope="row">'+item.data[2]+'</td>'+'<td scope="row">'+item.data[3]+'</td>'+'<td scope="row">'+item.data[4]+'</td>'+'<td scope="row">'+item.data[5]+'</td>'+'<td scope="row">'+item.data[6]+'</td>'+'<td scope="row">'+item.data[7]+'</td>'+'<td scope="row">'+item.data[8]+'</td>'+'</tr>');
 
              }
            )

        },
        dataType: "json",
        contentType: "application/json"
      })
  })
})

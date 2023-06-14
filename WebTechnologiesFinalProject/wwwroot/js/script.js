 
// JOSE MARTINEZ ///////////////////////////////////////
//add jquery 
 


let reader = new FileReader() ;
window.addEventListener('load', function() {
const image_input = document.querySelector("#image-input");

//check if exists 
if(image_input){
image_input.addEventListener("change", function() {
 
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#comment-display-image").style.backgroundImage = `url(${uploaded_image})`;
    document.querySelector("#comment-display-image").className="";
  });
  reader.readAsDataURL(this.files[0]);
});
}//end of exists
});



//Get Hardcode data from local storage and from hardcode.js
function database_getInformation() {

var data_users = localStorage.getItem('users');
if(data_users){
   var users =  JSON.parse(data_users) ;
}else{
// Put the object into storage
   localStorage.setItem('users', JSON.stringify(hardcode_users));
}    

}

//Get information needed for login page 
function  login_getInitialInformation() {
    database_getInformation();
    login_validateifLogin();
}


//if logged in redirect to index
function login_validateifLogin() {
    var user = localStorage.getItem('user');
    if (user) {
        window.location.href = "index.html";
        
    }
}

//funtion to logout
//This logout does not go to the login page because of the requirement to stay in the same page
function login_logout() {
    localStorage.removeItem('user');
    location.reload();
    //window.history.back();
}

//function to redeirect to login page
function login_redirectToLoginPage() {
    window.location.href = "login.html";
}  

//Function utility to show a button if user is logged in or not
function login_showLoginLogOutButton(){
    var user = login_getUser();
    let loginHelp = document.getElementById('loginHelp') ;
    if (user) {
        loginHelp.innerHTML =`<p id="link-logout" class="btn btn-primary" onclick="login_logout();">Logout</p>`;
    }else {
        loginHelp.innerHTML='<p id="link-login" class="btn btn-primary" onclick="login_redirectToLoginPage();">Login</p>';
    }
}

//Vaidate user
function login_validateUser(email, password) {
    var users = JSON.parse(localStorage.getItem('users'));
    var user = users.find(function (user) {
        return user.email === email && user.password === password;
    });
    if (user) {
        return user;
    } else {
        return false;
    }
}

 

    

//validate user from API ajax
    function login_validateUserFromAPIWeb (email,password )
    {
    
         var user = null;
            $.ajax({
                url: 'https://localhost:7147/api/users',
                type: 'GET',
                dataType: 'json',
                async: false,
                success: function (data) {

                    user = data.find(function (user) {
                        return user.email === email && user.password === password;
                    });
                }
            });
            return user;
            
        
}
 


//validate user

//get the user
function login_getUser() {
    var user = JSON.parse(localStorage.getItem('user'));
    return user;
}


 
//validations
function login_validate() {

    var email = document.getElementById("iemail").value;
    var password = document.getElementById("ipassword").value;
    //recibir promesa  ?
      
    let login_error = document.getElementById('login-error') ;
 
    var user = login_validateUserFromAPIWeb(email, password);

    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        login_error.innerHTML = "";
        login_error.className = "" ;
        window.location.href = "login.html";
        
       
    } else {
        login_error.innerHTML = "Invalid email or password";
        login_error.className = "alert alert-danger";
        return false;
    }
 
    

}

//Validate signup
function signup_validate(){
   return signup_createAndValidateUser();
}


//Validate if user already exist
function singup_validateUserCreation(email){
    //GET USER FROM API WEB 
    var users =login_getAllUsers_API_Ajax();
    var user = users.find(function (user) {
        return user.email === email;
    });
    if (user) {
        
        return true;
    } else {
        
        return false;
    }
}

//Create user from API web Ajax
function signup_createUserFromAPIWeb (name,email,password,shippingAddress)
{
    var user =null;
    var userObj ={
        name: name,
        email: email,
        password: password ,
        shippingAddress: shippingAddress
    };
    $.ajax({
        url: 'https://localhost:7147/api/Users',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json ; charset=utf-8',
        async: false,
        data: JSON.stringify(userObj),
        success: function (data) {
            user = data;
        },
        error: function (error) {
            console.log(error);
        }
    });
    return user;
}

//Create user and validate if user already exist
function signup_createAndValidateUser(){
    
    var email = document.getElementById("iemail").value;
    var password = document.getElementById("ipassword").value;
    var name = document.getElementById("iname").value;
    var shipAddress= document.getElementById("ishipping").value;
    let signup_error = document.getElementById('signup-error') ;
    if (singup_validateUserCreation(email)){
        signup_error.innerHTML = "Email already exists";
        signup_error.className = "alert alert-danger";
         
       return false;
    }else{
       if (signup_validateAllFieldForm()){  
       
        //Create user from API web
        var user = signup_createUserFromAPIWeb(name,email,password,shipAddress);
        if(user)
        {
                signup_error.innerHTML = "Account created successfully";
                signup_error.className = "alert alert-success" ;
                document.getElementById("signupForm").reset();
                return false; 
        }
        else {
                signup_error.innerHTML = "Error creating account";
                signup_error.className = "alert alert-danger";
                return false;
            }

       }
        else {
            return false;
        }
    }
}

//Validate all fields in the form
function signup_validateAllFieldForm(){
    var email = document.getElementById("iemail").value;
    var password = document.getElementById("ipassword").value;
    var name = document.getElementById("iname").value;
    let signup_error = document.getElementById('signup-error') ;
    if (email === "" || password === "" || name === ""){
        signup_error.innerHTML = "All fields are required";
        signup_error.className = "alert alert-danger";
        return false;
    }else{
        return true;
    }
}
 


//Function Write comments_writeCommentWithImageAndRate_API_Ajax
function comments_writeCommentWithImageAndRate_API_Ajax(){
    var userId = login_getUser().userId;
    var idProduct = comments_getParametrIdProductoFromUrl();
    var comment = document.getElementById("icomment").value;
    var rate =  document.getElementById("rateValue").textContent;
    //substract base64 data:image/png;base64, from reader.result 
     //if reader.result not empty 
     if(reader.result  && reader.result.length > 0){
        var image =reader.result.replace(/^data:.+;base64,/, "");
        
        }
        else{
            var image =null;
        }
 
    var commentObject = {
        productId : idProduct,
        userId: userId,
        commentText: comment,
        rating: rate,
        imageString: image
    };
    //POST to api 
    $.ajax({
        url: 'https://localhost:7147/api/Comments',
        type: 'POST',
        async: false,
        dataType: "json",
        contentType: "application/json ; charset=utf-8",
        data: JSON.stringify(commentObject),
        success: function (data) {
            
    
        },
        error: function (error) {
            console.log(error);
            alert(`${error} error`)
        }
    });
    return false;
   


}
   

 
 //Function to create a image from Json
function comments_getImgTagIfExisteInParameterJson(parameter){
    if (parameter){
        return `<img src="data:image/png;base64,${parameter}" class="card-img-top w-10 userimage" alt="...">`;
    }else{
        return "";
    }
}

//Function to get From API WEB the Comments 
function comments_getCommentsFromAPIWebUsingAjax(){
    var comments = [];
    $.ajax({
        url: 'https://localhost:7147/api/Comments',
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            comments = response;
            localStorage.setItem('comments', JSON.stringify(comments));
        },
        error: function (error) {
            console.log(error);
        }
    });
    return comments;
}

     

//Function to only get comments from the product selected
function comments_getCommentsbyIdProduct(idProduct) {
     
    var comments =comments_getCommentsFromAPIWebUsingAjax(); 
    var commentsbyIdProduct = comments.filter(function (comment) {
        return comment.productId == idProduct;
    });
    console.log(idProduct);
    return commentsbyIdProduct;
}
  
 
//Function to get the parameter from the url
function comments_getParametrIdProductoFromUrl(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var product = url.searchParams.get("id");
   
    return product;
}

//Function to display comments
function comments_displayComments(){
     
    var comments=comments_getCommentsbyIdProduct(comments_getParametrIdProductoFromUrl());
    var html = "";
    
   


    comments.forEach(function (comment) {
         //get user 
        var user = login_getUserById_API_Ajax(
            comment.userId)
        html += `
        <div class="card mb-3">
            <div class="card-body">
            <div class="d-flex flex-start align-items-center">
                    <img class="rounded-circle shadow-1-strong me-3" src="https://cdn.pixabay.com/photo/2017/01/10/03/54/avatar-1968236_960_720.png" alt="avatar" width="60" height="60">
                    <div>
                      <h6 class="fw-bold text-primary mb-1">${user.name}</h6>
                      <p class="text-muted small mb-0">
                      ${user.email}
                      </p>
                    </div>
                  </div>
                  <div class="row">
                  <div class="col-1 d-flex flex-column p-2">
                  <p  id="rateProduct-number" class="card-text align-self-end">${comment.rating}</p>
                  </div>
                <div class="col-6 p-0"> 
                  ${comments_displayFillRateStarAndEmptyOthers(comment.rating.toLocaleString(
                    undefined,{ minimumFractionDigits: 2 }))}
                </div>  
          
                </div>
                <p class="card-text">${comment.commentText}</p>
            
              
                ${comments_getImgTagIfExisteInParameterJson(comment.image)}
               
            </div>
        </div>
        `;
    });
    if (html==""){
        document.getElementById('cards').innerHTML = comments_ifNotComments();;
    }else{
    document.getElementById("cards").innerHTML = html;
    }
}

 
 //Function to display starts from rate number
function comments_displayFillRateStarAndEmptyOthers(rate){
 
    var html = "";
    for (var i = 0; i < rate; i++) {
        html += `<span class="fa fa-star star-active"></span>`;
    }
    for (var i = 0; i < 5-rate; i++) {
        html += `<span class="fa fa-star star-inactive"></span>`;
    }
    return html;
     
}

//check if product has and order API Ajac 
function checkIfProductHasAndOrder(idProduct){
 //get user from local
 //check if exists  login_getUser
    if (login_getUser()!=null){
        var userID = login_getUser().userId;
    }else{
        var userID=0;
    }


     
    var orders = orders_getOrdersFromAPIWebUsingAjax(); 
    var ordersbyIdProduct = orders.filter(function (order) {
        //check if order is from user
        if (order.userId == userID) {
        //read all order lines
        var orderLineItems = order.orderLineItems;
        var orderLineItemsbyIdProduct = orderLineItems.filter(function (orderLineItem) {
            return orderLineItem.productId == idProduct;
        }
        );
        if (orderLineItemsbyIdProduct.length>0){
            return true;
        }else{
            return false;
        }
      }else 
        {
            return false;
        }

    });

    if (ordersbyIdProduct.length>0){
        return true;
    }
    else{
        return false;
}




}
 


 


function orders_getOrdersFromAPIWebUsingAjax(){
    var orders = [];
    $.ajax({
        url: 'https://localhost:7147/api/Orders',
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            orders = response;
           // localStorage.setItem('orders', JSON.stringify(orders));
        },
        error: function (error) {
            console.log(error);
        }
    });
    return orders;
}



//Function to validate button to review
function comments_validateReview(){
     
    if (!login_userExists()){
        document.getElementById("btnReview").disabled = true;
    }else {
       if (!checkIfProductHasAndOrder(comments_getParametrIdProductoFromUrl())) {
           document.getElementById("btnReview").disabled = true;
        }
    };
 
}

 
//Function check if user exists 
function login_userExists(){
    var data_users = localStorage.getItem('users');
    if(data_users){
        var users =  JSON.parse(data_users) ;
        return true;
    }else{
        return false;
    }
}

//Function to reset rating value of selected starts
function reset_ratingValue(){
    var rate = document.getElementById("rateValue");
    rate.textContent="0";
    comments_modalSelectedStar();
    rate.textContent="0";
    var rateValue = document.getElementById("selected_rating_h");
    rateValue.value="";
}




//Function to load every time the page is loaded
function comments_onload(){
    comments_displayComments();
    comments_createListenerForStars();
    comments_validateReview();
    window.onbeforeunload = function() {
        comments_displayComments();
      };
}

//Function to create listener for stars in modal
function comments_createListenerForStars(){
     
    var stars = document.querySelectorAll('[id^="rating-star"]');
    stars.forEach(function(star){
        star.addEventListener("click", function(){
             
            var rate = document.getElementById("rateValue");
            var rateValue = document.getElementById("selected_rating_h");
            rateValue.value =rate.textContent ;
             
            
        });
    });
}

//Function to handle the click on the stars
function comments_modalSelectedStar(){

    var previous_value = $("#selected_rating").val();
	
	var selected_value = $(this).attr("data-attr");
	$("#selected_rating").val(selected_value);
	
	$(".selected-rating").empty();
	$(".selected-rating").html(selected_value);
	
	for (i = 1; i <= selected_value; ++i) {
	$("#rating-star-"+i).toggleClass('btn-warning');
	$("#rating-star-"+i).toggleClass('btn-default');
	}
         	
	for (ix = 1; ix <= previous_value; ++ix) {
	$("#rating-star-"+ix).toggleClass('btn-warning');
	$("#rating-star-"+ix).toggleClass('btn-default');
	}
	
    
}


//Function to handle the click on the stars
jQuery(document).ready(function($){
	 
	$(".btnrating").on('click',(function(e) {
	
        var previous_value = $("#selected_rating").val();
	
	var selected_value = $(this).attr("data-attr");
	$("#selected_rating").val(selected_value);
	
	$(".selected-rating").empty();
	$(".selected-rating").html(selected_value);
	
	for (i = 1; i <= selected_value; ++i) {
	$("#rating-star-"+i).toggleClass('btn-warning');
	$("#rating-star-"+i).toggleClass('btn-default');
	}
         	
	for (ix = 1; ix <= previous_value; ++ix) {
	$("#rating-star-"+ix).toggleClass('btn-warning');
	$("#rating-star-"+ix).toggleClass('btn-default');
	}
	
	}));
	
		
});

function hideModal(){
    $('#reviewScreen').modal('hide');
    comments_writeCommentWithImageAndRate_API_Ajax();
    var myToastEl = document.getElementById('liveToast');
    var myToast = bootstrap.Toast.getOrCreateInstance(myToastEl);
    //myToast.show();
    window.location.reload();
}

//get phrase if no comments
function comments_ifNotComments(){
     
       return  ` <div class="alert alert-light" role="alert">
       <h4 class="alert-heading">No comments</h4>
       <div class="d-flex">
           <img src="images/icons/info-circle.svg">
           <p class="ms-2 my-0">Become the first to comment.</p>
       </div>
   </div>`
     
}


function getOrdersofUserEmail(email){
    var orders = JSON.parse(localStorage.getItem('orderHistory'));
    var ordersbyUserEmail = orders.filter(function (order) {
        return order.user.email==email;
    });
    return ordersbyUserEmail;
}


function comments_getOrdersContainsProduct(orders,idProduct){

   
    var ordersWithProducts = orders.filter(function (order) {
        return order.cart.some(function (cart) {
           
            return cart.product.id==idProduct;
        });
    } 

    );
    return ordersWithProducts;
}

 

//get user by id from API Ajax
function login_getUserById_API_Ajax(id){
    var user = null;
    $.ajax({
        url: "https://localhost:7147/api/Users/"+id,
        type: "GET",
        async: false,
        success: function (data) {
            user = data;
        },
        error: function (error) {
            console.log(error);
        }
    });
    return user;
}

//get all users  from API Ajax
function login_getAllUsers_API_Ajax(){
    var users = null;
    $.ajax({
        url: "https://localhost:7147/api/Users",
        type: "GET",
        async: false,
        success: function (data) {
            users = data;
        },
        error: function (error) {
            console.log(error);
        }
    });
    return users;
}






 


// END JOSE MARTINEZ ///////////////////////////////////////
// SMIT MEHTA /////////////////

function Login_ChangeUserByIdFromAPIWebAjax(id,user){
    var result = false;
    var userObject =
    {
        
        name: user.name ,
        email: user.email,
        password: user.password,
        shipAddress: user.shipAddress
    }

    $.ajax({
        url: "https://localhost:7147/api/Users/"+id,
        type: "PUT",
        async: false,
        contentType: "application/json ; charset=utf-8",
        data: JSON.stringify(userObject),
        success: function (data) {
            result = true;
        },
        error: function (error) {
            console.log(error);
            result = false;
        }
    });
    return result;



}

function change_password(){
    passwordChanged = document.getElementById("ipassword").value;
    confirmedPassword = document.getElementById("cpassword").value;
     emailId = document.getElementById("iemail").value;
     var allUsers = login_getAllUsers_API_Ajax();
    
    //checking if the the user exist  and getting its index
    objIndex = allUsers.findIndex((obj => obj.email == emailId));
    if(objIndex != -1 && passwordChanged == confirmedPassword && passwordChanged != "")
    {
        allUsers[objIndex].password = passwordChanged;
        Login_ChangeUserByIdFromAPIWebAjax(allUsers[objIndex].userId,allUsers[objIndex]);
        document.getElementById('login-error').innerHTML = "Password Changed Successfully"
        document.getElementById('login-error').className = "alert alert-success"
    }
    
    else if(passwordChanged != confirmedPassword)
    {
        document.getElementById('login-error').innerHTML = "Password is not matching"
        document.getElementById('login-error').className = "alert alert-danger"
    }
    //else if passwordChanged is empty
    else if(passwordChanged == "")
    {
        document.getElementById('login-error').innerHTML = "Password is empty"
        document.getElementById('login-error').className = "alert alert-danger"
    }
    else{
        document.getElementById('login-error').innerHTML = "User Don't Exist"
        document.getElementById('login-error').className = "alert alert-danger"
        }
}
 
function change_profile(){
    nameChanged = document.getElementById("iname").value;
     addressChanged = document.getElementById("iaddress").value;
     
     var User = JSON.parse(localStorage.getItem('user'));
   
     if(User)
     {
    var allUsers = login_getAllUsers_API_Ajax();
    //get userID from localstorage 

       

    //checking if the the user exist  and getting its index
    objIndex = allUsers.findIndex((obj => obj.userId == User.userId));
    if(objIndex != -1 && nameChanged != "" && addressChanged != "")
    {
        allUsers[objIndex].name = nameChanged;
        allUsers[objIndex].shipAddress = addressChanged;
        Login_ChangeUserByIdFromAPIWebAjax(allUsers[objIndex].userId,allUsers[objIndex]);
        document.getElementById('login-error').innerHTML = "Profile Updated Successfully"
        document.getElementById('login-error').className = "alert alert-success"
    }
// //checking if both fields are added  and getting its index for the users
//    if(nameChanged && addressChanged){
//         decodedUsers.name = nameChanged;
//         decodedUsers.shipAddress = addressChanged
//         //console.log(decoded);
//         objIndex = allDecodedUsers.findIndex(allDecodedUsers =>allDecodedUsers.email == decodedUsers.email);

//         allDecodedUsers[objIndex].name = nameChanged;
//         allDecodedUsers[objIndex].shipAddress = addressChanged;
//         localStorage.setItem('user', JSON.stringify(decodedUsers));
//         localStorage.setItem('users', JSON.stringify(allDecodedUsers));
//         alert("Profile Updated")
//         window.location.href = "index.html";

// }
else if  (nameChanged == '' || addressChanged == ''){
    document.getElementById('login-error').innerHTML = "Both fields required"
    document.getElementById('login-error').className = "alert alert-danger"

}
}else{
    document.getElementById('login-error').innerHTML = "NOT LOGGED IN"
    document.getElementById('login-error').className = "alert alert-danger"
}

}

function validate_ifLoggedIN(){
    database_getInformation()
    var user = localStorage.getItem('user');
    if(!user){
        window.location.replace("login.html");

    }
}
///// End SMIT MEHTA.//////
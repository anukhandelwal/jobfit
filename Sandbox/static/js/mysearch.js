function read_form_content(){

    console.log('Inside Read Form Content');

    var skills=["Administration and Management","Clerical","Economics and Accounting","Sales and Marketing","Customer and Personal Service",
    "Personnel and Human Resources","Production and Processing","Food Production","Computers and Electronics","Engineering and Technology",
    "Design","Building and Construction","Mechanical","Mathematics","Physics","Chemistry","Biology","Psychology","Sociology and Anthropology",
    "Geography","Medicine and Dentistry","Therapy and Counseling","Education and Training","English Language","Foreign Language","Fine Arts",
    "History and Archeology","Philosophy and Theology","Public Safety and Security","Law and Government","Telecommunications",
    "Communications and Media","Transportation"];
    //console.log(skills);
    var user_input={};
    var user_skill_value={};
    for (var skill in skills){
        var num=parseInt(skill)+1;
        var element_name = "radio"+num;
        var skill_value=func(element_name);
        user_skill_value[skills[skill]]=skill_value;
    }
    
    // Remove this later on
    /*document.getElementById("name").value="Aiyana"
    document.getElementById("phone").value="9088721993"
    document.getElementById("email").value="aiyanalizmathew@gmail.com" */
   
    var first_name=document.getElementById("firstNameInput").value;
    var last_name=document.getElementById("lastNameInput").value;
    var email=document.getElementById("emailInput").value;
    var phone=document.getElementById("phoneInput").value;
    var education_level =document.getElementById("eduLevelInput").value;
    var exp_level =document.getElementById("yearsInput").value;
    var currentTitle =document.getElementById("lastJobInput").value;
    
    var name = first_name + " " + last_name; 

    var datetime = Date();
    user_input={ 
                  "Name": name ,
                  "Email":email,
                  "Phone":phone,
                  "Datetime_Insert":datetime,
                  "Skills":user_skill_value, 
                  "Education Level":education_level, 
                  "Work Experience Level":exp_level,
                  "Title":currentTitle }
    
    document.getElementById("USERINPUT").value=JSON.stringify(user_input);
    console.log('In ReadformContent - writing data');
    console.log(document.getElementById("USERINPUT").value);
    console.log('EXIT Read Form Content');
}


function func(element_name){
    var score=document.getElementsByName(element_name);
    console.log(score);
    var val=0;
    if (score[0].checked){
        val=1*1.4;
    }
    else if(score[1].checked){
        val=2*1.4;
    }
    else if(score[2].checked){
        val=3*1.4;
    }
    else if(score[3].checked){
        val=4*1.4;
    }
    else if(score[4].checked){
        val=5*1.4;
    }
    return val;

}



function validateContact()
{ 
   console.log("Inside validate Contact");

   if( document.contactform.firstNameInput.value == "" )
   {
     alert( "Please provide your First Name!" );
     document.contactform.firstNameInput.focus() ;
     return false;
   }
   if( document.contactform.lastNameInput.value == "" )
   {
     alert( "Please provide your Last Name!" );
     document.StudentRegistration.lastNameInput.focus() ;
     return false;
   }
   
   if( document.contactform.emailInput.value == "" )
   {
     alert( "Please provide your Email Address!" );
     document.contactform.emailInput.focus() ;
     return false;
   }
   if( document.contactform.phoneInput.value == "" )
   {
     alert( "Please provide your Phone Number!" );
     document.contactform.phoneInput.focus() ;
     return false;
   }
   
   console.log("Complete with validate Contact");
   HandleSubmit();
   
   //return( true );
}

function HandleSubmit() 
{
	//Inside fucntion
  console.log("Inside HandleSubmit");

  //Step1: Capture user input from all form fields 
  //read_form_content();
  console.log('Inside Read Form Content');

    var skills=["Administration and Management","Clerical","Economics and Accounting","Sales and Marketing","Customer and Personal Service",
    "Personnel and Human Resources","Production and Processing","Food Production","Computers and Electronics","Engineering and Technology",
    "Design","Building and Construction","Mechanical","Mathematics","Physics","Chemistry","Biology","Psychology","Sociology and Anthropology",
    "Geography","Medicine and Dentistry","Therapy and Counseling","Education and Training","English Language","Foreign Language","Fine Arts",
    "History and Archeology","Philosophy and Theology","Public Safety and Security","Law and Government","Telecommunications",
    "Communications and Media","Transportation"];
    //console.log(skills);
    var user_input={};
    var user_skill_value={};
    for (var skill in skills){
        var num=parseInt(skill)+1;
        var element_name = "radio"+num;
        var skill_value=func(element_name);
        user_skill_value[skills[skill]]=skill_value;
    }
    
    // Remove this later on
    /*document.getElementById("name").value="Aiyana"
    document.getElementById("phone").value="9088721993"
    document.getElementById("email").value="aiyanalizmathew@gmail.com" */

   
    var first_name=document.getElementById("firstNameInput").value;
    var last_name=document.getElementById("lastNameInput").value;
    var email=document.getElementById("emailInput").value;
    var phone=document.getElementById("phoneInput").value;
    var education_level =document.getElementById("eduLevelInput").value;
    var experience_level =document.getElementById("yearsInput").value;
    var currentTitle =document.getElementById("lastJobInput").value;
    
    //CONVERT EDUCATIN AND Experience to approariate normalized levels 
    var ed_Level = 0;

    if (education_level == "Less than High School Diploma") {
      ed_Level = 1;
    } else if (education_level == "High School Diploma or GED") {
      ed_Level = 2;
    } else if (education_level == "Post Secondary Certificate") {
      ed_Level = 3;
    } else if (education_level == "Some College Course") {
      ed_Level = 4;
    } else if (education_level == "Associate's Degree") {
      ed_Level = 5;
    } else if (education_level == "Bachelors's Degree") {
      ed_Level = 6;
    } else if (education_level == "Post-Baccalaureate Certificate") {
      ed_Level = 7;
    } else if (education_level == "Master's Degree") {
      ed_Level = 8;
    } else if (education_level == "Post-Master's Certificate") {
      ed_Level = 9;
    } else if (education_level == "First Professional Degree") {
      ed_Level = 10;
    } else if (education_level == "Doctoral Degree") {
      ed_Level = 11;
    } else if (education_level == "Post-Doctoral Training") {
      ed_Level = 12;
    } 

    var exp_level = 0;
    if (experience_level == 0) {
      exp_level = 1;
    } else if (experience_level > 0 && experience_level <= 1) {
      exp_level = 5;
    } else if (experience_level > 1 && experience_level <= 2) {
      exp_level = 6;
    } else if (experience_level > 2 && experience_level <= 4) {
      exp_level = 7;
    } else if (experience_level > 4 && experience_level <= 6) {
      exp_level = 8;
    } else if (experience_level > 6 && experience_level <= 8) {
      exp_level = 9;
    } else if (experience_level > 8 && experience_level <= 10) {
      exp_level = 10;
    } else if (experience_level > 10) {
      exp_level = 11;
    }

    var name = first_name + " " + last_name; 

    var datetime = Date();
    user_input={ 
                  "Name": name ,
                  "Email":email,
                  "Phone":phone,
                  "Datetime_Insert":datetime,
                  "Skills":user_skill_value, 
                  "Education Level":ed_Level, 
                  "Work Experience Level":exp_level,
                  "Title":currentTitle }
    
    document.getElementById("USERINPUT").value=JSON.stringify(user_input);
    console.log('In ReadformContent - writing data');
    console.log(document.getElementById("USERINPUT").value);
    console.log('EXIT Read Form Content');


	//document.getElementById("name").value="Ana Sunder"
   //document.getElementById("phone").value="9088721993"
   //document.getElementById("email").value="aruna.amaresan@gmail.com"

   //var name=document.getElementById("name").value;
   //var phone=document.getElementById("phone").value;
   //var email=document.getElementById("email").value;

   
   /* name = "Ana Sunder";
   phone = "9088721993";
   email = "aruna.amaresan@gmail.com";

   var datetime = Date();
   var user_input={"Name":name,
               "Email":email,
	            "Phone":phone,
	            "Datetime_Insert":datetime } //,
	            //"Skills":user_skill_value} */

	var currentURL = window.location.origin

	//Step 2: Create an object with all the fields 
	//document.getElementById("USERINPUT").value=JSON.stringify(user_input);

    var resultInfo = document.getElementById("USERINPUT").value;

    //STEPS 3: LIBRARY CALLED JQUERU AND SPECIFIY IT IS A POST REQUEST
    console.log(resultInfo); 
    //$.post(currentURL + '/Predict_Score_Users', user_input);
    $.post(currentURL + '/Predict_Score_Users', {'data': resultInfo}, function(response) { 
    		window.location = currentURL + '/result';
    })

}
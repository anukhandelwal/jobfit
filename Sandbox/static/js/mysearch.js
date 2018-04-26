function read_form_content(){
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
    document.getElementById("name").value="Ana Sunder"
    document.getElementById("phone").value="9088721993"
    document.getElementById("email").value="aruna.amaresan@gmail.com"
   
    //var name=document.getElementById("name").value;
    //var phone=document.getElementById("phone").value;
    //var email=document.getElementById("email").value;

    var datetime = Date();
    user_input={"Name":name,
                "Email":email,
                "Phone":phone,
                "Datetime_Insert":datetime,
                "Skills":user_skill_value}
    
    document.getElementById("USERINPUT").value=JSON.stringify(user_input);
    console.log(document.getElementById("USERINPUT").value);
}


function func(element_name){
    var score=document.getElementsByName(element_name);
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

read_form_content()
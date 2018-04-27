// Function to list the top 10 titles and their job descriptions
function updateInfo(){
    d3.json("/result_output",function(error,response){
        if(error) {console.warn(error);}
        //console.log(response);
        var title=[];
        
        for(var item in response){
            title.push(response[item]["Title"]);
        }
        //console.log(title);

        var HTML= "<ol>";
        for(var i in title){
            var desc=response[i]["Description"];
            //console.log(desc);
            var edu=response[i]["Education"];
            //console.log(edu);
            var exp=response[i]["Work Experience"];
            //console.log(exp);
            var tech=response[i]["Technology"];
            tech=tech.replace("[","");
            tech=tech.replace("]","");
            tech=tech.replace(/'/g , " ");
            var arr=tech.split(",");
            //console.log(arr);
            //console.log(typeof(arr));
            //console.log(typeof(tech));
            var core=response[i]["CoreTasks"];
            var acore=core.replace(/,/g , " ");
            acore=acore.replace("[","");
            acore=acore.replace("]","");
            
            var corearr=acore.split("'");
           
            var coreDiv="<div><h6>Core Task:</h6><p><ul>";
            for(var j=1;j<corearr.length;j=j+2){
                if((corearr[j]!="\n")){
                    coreDiv=coreDiv+"<li>"+corearr[j]+"</li>";
                    //console.log(corearr[j])
                }
                
            }//i=1;i<corearr.length;i=i+2)
            coreDiv=coreDiv+"</ul></p></div>";

            //console.log(core);
            var descDiv="<div><h6>Description:</h6><p>"+desc+"</p></div>"
            var eduDiv="<div><h6>Required Education:</h6><p>"+edu+"</p></div>"
            var expDiv="<div><h6>Required Experience:</h6><p>"+exp+"</p></div>"
            
            var techDiv="<div><h6>Technical Skills:</h6><p><ul>";
            for(tec in arr){
                techDiv=techDiv+"<li>"+arr[tec]+"</li>";
                
            }
            techDiv=techDiv+"</ul></p></div>";
            
            HTML=HTML+"<li><a href='#"+i+"' data-toggle='modal' data-target='#"+i+"'>"+title[i]+"</a>";
        
            HTML=HTML+"<div class='modal fade' id='"+i+"'tabindex='-1' role='dialog' aria-hidden='true'><div class='modal-dialog' role='document'>"+
          "<div class='modal-content'><div class='modal-header'><h5 class='modal-title' id='"+i+"'>"+title[i]+"</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'>"+
          "<span aria-hidden='true'>&times;</span></button></div><div class='modal-body'>"+descDiv+eduDiv+expDiv+techDiv+coreDiv+"</div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>"+
              "</div></div></div></div></li>"
        //console.log(HTML);
        }
        HTML=HTML+"</ol>";
        document.getElementById("best_fit").innerHTML=HTML;
        document.getElementById("best_job").innerHTML="<small><strong>"+ response[0]["Title"] +"</strong> is your Perfect Job Title</small>";
    });
}

// Function to plot the Bar Graph
function PlotBarChart(){
    console.log("Bar Chart")
    d3.json("/results_bar_plot", function(error,response){
        if(error){console.warn(error)}
        //console.log(response)
        var data=[{
            x:response["x"],
            y:response["y"],
            type:"bar",
            marker:{color:"blue"}
        }];
        var layout={
                    xaxis:{
                       tickangle:60
                    },
                    yaxis:{
                        title:"Salary($)"
                    },
                    height:"100%",
                    margin:{
                        b:150,
                    }
                }
        

    Plotly.newPlot("result_bar_plot",data,layout)
    })
}

// Function to generate a random color for line graph
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to plot the LineChart

function plot_line(){
    d3.json('/results_line_plot', function(error, response){
        if (error) return console.warn(error);
        var keys=Object.keys(response);
        var data=[];
        for(var i=0;i<Object.keys(response).length;i++){
            //console.log(response[keys[i]]);
            var trace_var=response[keys[i]];
            var linecolor=getRandomColor();
            console.log(linecolor);
            var trace={
                type: 'scatter',
                x: trace_var["x"],
                y: trace_var["y"],
                mode: 'lines+markers',
                marker: {
                color: linecolor,
                size: 8
                },
                line: {
                color: linecolor,
                width: 3
                },
                name: trace_var["Title"], 
            }
            data.push(trace);
        }
          
        var layout = {
            xaxis: {
                nticks: 3,
                title:"Year"
            },
            yaxis:{
                range:[0,250000],
                title:"Salary"
            },
            margin: {
                t: 50, //top margin
                l: 40, //left margin
                r: 20, //right margin
                b: 50 //bottom margin
            },
            showlegend:true
        };
        
        Plotly.newPlot('line_salary', data, layout);
    }); 
}

// Adding dropdown for the map filters
function addDropDown(){
    console.log("Adding Dropdown");
    d3.json("/results_map_plot",function(error,response){
        if(error){console.warn(error)}
        //console.log(response);
        var labels=[];
        for(var item in response){
            labels.push(item)
        }
        //console.log(labels);
        var dropdown_select = d3.select("#selTitle");
        for(var i=0;i<labels.length;i++){
            dropdown_select.append("option").attr("value",labels[i]).text(labels[i]);
        }
        PlotMap(labels[0]);
    })
}

function PlotMap(selectedvalue){
    //console.log(selectedvalue);
    d3.json("/results_map_plot",function(error,response){
        if(error){console.warn(error)}
        console.log(response[selectedvalue]);
        var flag=0;
        try{
            var title=response[selectedvalue][0]["Title"];
            flag=1;
        }
        catch(error){
            var title=selectedvalue;
        }
        if(flag==1){
            document.getElementById("result_map").innerHTML="";
            var states=[];
            var salary=[];
            for(i=0;i<response[selectedvalue].length;i++){
                states.push(response[selectedvalue][i]["State"])
                salary.push(response[selectedvalue][i]["Salary"])
            };
            var colors= ['#FED976','#FEB24C','#FD8D3C','#FC4E2A','#E31A1C','#BD0026','#800026'];
            var data = [{
                type: 'choropleth',
                locationmode: 'USA-states',
                locations: states,
                z: salary,
                text: title,
                colorscale:[
                [0, "#FED976"], 
                [0.142, "#FEB24C"], 
                [0.284, "#FD8D3C"], 
                [0.426, "#FC4E2A"], 
                [0.568, "#E31A1C"], 
                [0.710, "#BD0026"], 
                [1, "#800026"]],

                marker: {
                    line:{
                        color: 'rgb(255,255,255)',
                        width: 2
                    }
                }
            }];
    
            var layout = {
                showlegend: true,
                geo:{
                scope: "usa",
                showland: true,
                landcolor: "rgb(242, 240, 247)",
                showlakes: true,
                lakecolor: "white",
                resolution: 50,
                autosize: true,
    
                }
            };
    
            Plotly.newPlot("result_map", data, layout)
        }
        else{
            document.getElementById("result_map").innerText="Sorry! We donot have the data for the title selected"
        }
    })
}

// Function to Plot All Results
function PlotResults()
{   
    addDropDown();
    PlotBarChart();
    plot_line();
    PlotMap();
    updateInfo();
}
PlotResults()

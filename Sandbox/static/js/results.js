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
        var layout={title:"Salary vs Title",
                    xaxis:{
                       tickangle:60
                    },
                    yaxis:{
                        title:"Salary($)"
                    }}
        

    Plotly.newPlot("result_bar_plot",data,layout)
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
                // colorbar: {
                //     title: 'Popular Event Count',
                //     thickness: 5,
                //     titleside:'top',
                //     tickmode : 'array',
                //     tickvals : rank_list,
                //     ticktext : ['Rock','Pop','Alternative','Metal','Hip-Hop/Rap','Country','Dance/Electronic'],
                //     ticks : 'outside'
                // },
                marker: {
                    line:{
                        color: 'rgb(255,255,255)',
                        width: 2
                    }
                }
            }];
    
            var layout = {
                title: 'Salary by State',
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
// LineChart
//d3.json(/Salary_State_Year)
function plot_line(){
    Plotly.d3.json('/Salary_State_Year', function(error, rows){
        var title=[];
        var salary_15=[];
        //var genre=[];
        var salary_17=[];
        //console.log(rows);
        var rank=[];
       
        //console.log("ROws");
        //console.log(rows);
         
          if (error) return console.warn(error);
          for(i=0;i<5;i++){
              var tit_dic={};
              //console.log(rows[i].Job_Title);
              tit_dic["title"]=rows[i].Job_Title;
              tit_dic["x"]=["2015","2017"];
              tit_dic["y"]=[rows[i].Salary_2015,rows[i].Salary_2017]
              //console.log(tit_dic);
              title.push(tit_dic);
    
            
             /*s=rows[i].Salary_2015;
              
              salary_15.push(s);
              s2=rows[i].Salary_2017;
              
              salary_17.push(s2);*/
            }
            //console.log(title);
        //console.log(title);
        //console.log(salary_15);
        //console.log(salary_15);
       
     
    var trace1 = {
        type: 'scatter',
        x: title[0]["x"],
        y: title[0]["y"],
        mode: 'lines+markers',
        marker: {
          color: 'rgb(128, 0, 128)',
          size: 8
        },
        line: {
          color: 'rgb(128, 0, 128)',
          width: 3
        },
        name: title[0]["title"],
        
      };
      
    var trace2 = {
        type: 'scatter',
        x: title[1]["x"],
        y: title[1]["y"],
        mode: 'lines+markers',
        marker: {
          color: 'rgb(55, 128, 191)',
          size: 8
        },
        line: {
          color: 'rgb(55, 128, 191)',
          width: 3
        },
        name:title[1]["title"],
       
      };
      var trace3 = {
        type: 'scatter',
        x: title[3]["x"],
        y: title[3]["y"],
        mode: 'lines+markers',
        marker: {
          color: 'rgb(55, 128, 100)',
          size: 8
        },
        line: {
          color: 'rgb(55, 128, 100)',
          width: 3
        },
        name:title[3]["title"],
       
      };
      
      var layout = {
          title:"Salary Variance from 2015 to 2017",
        width: 500,
        height: 500,
        xaxis: {
            nticks: 3,
            title:"Year"
          },
        yaxis:{
            range:[0,250000],
            title:"Salary"
        }
      };
      
      var data = [trace1, trace2,trace3];
      //console.log(data);
      Plotly.newPlot('line_salary', data, layout);
      }); 
    }
//For Info Box
function updateInfo(){
    d3.json("/result/output",function(error,response){
        if(error) {console.warn(error);}
        console.log(response);
        var title=[];
        
        for(var item in response){
            title.push(response[item]["Title"]);
        }
        console.log(title);

        var HTML= "<ul>";
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
                    console.log(corearr[j])
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
        HTML=HTML+"</ul>";
        document.getElementById("best_fit").innerHTML=HTML;
    }

);
}
function PlotResults()
{
    addDropDown();
    PlotBarChart();
    PlotMap();
    plot_line();
    updateInfo();
}
PlotResults()
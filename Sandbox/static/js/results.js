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
    console.log(selectedvalue);
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
        console.log(labels);
        var dropdown_select = d3.select("#selTitle");
        for(var i=0;i<labels.length;i++){
            dropdown_select.append("option").attr("value",labels[i]).text(labels[i]);
        }
        PlotMap(labels[0]);
    })
}
function PlotResults()
{
    addDropDown();
    PlotBarChart();
    PlotMap();
}
PlotResults()
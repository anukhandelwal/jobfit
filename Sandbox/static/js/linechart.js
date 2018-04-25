//d3.json(/Salary_State_Year)
Plotly.d3.json('/Salary_State_Year', function(error, rows){
    var title=[];
    var salary_15=[];
    //var genre=[];
    var salary_17=[];
    //console.log(rows);
    var rank=[];
   
    console.log("ROws");
    console.log(rows);
     
      if (error) return console.warn(error);
      for(i=0;i<5;i++){
          var tit_dic={};
          console.log(rows[i].Job_Title);
          tit_dic["title"]=rows[i].Job_Title;
          tit_dic["x"]=["2015","2017"];
          tit_dic["y"]=[rows[i].Salary_2015,rows[i].Salary_2017]
          console.log(tit_dic);
          title.push(tit_dic);

        
         /*s=rows[i].Salary_2015;
          
          salary_15.push(s);
          s2=rows[i].Salary_2017;
          
          salary_17.push(s2);*/
        }
        console.log(title);
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
  console.log(data);
  Plotly.newPlot('line_salary', data, layout);
  }); 
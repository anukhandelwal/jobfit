var trace1 = {
    x: ["Word processors and typists",
      "Computer operators",
      "Data entry keyers",
      "Electrical and electronic equipment assemblers",
      "Switchboard operators, including answering service",
      "Legal secretaries",
      "Executive secretaries and executive administrative assistants",
      "Sewing machine operators",
      "Postal service mail sorters and processors",
      "Structural metal fabricators and fitters"
      ],

    y:[74.9, 51.5, 203.8, 218.9, 93.2, 194.7, 685.3, 153.9, 106.7, 77],
    name: '2016',
    type: 'bar',
    hoverinfo:"none"
  };
  console.log(trace1);

  var trace2 = {
    x: ["Word processors and typists",
    "Computer operators",
    "Data entry keyers",
    "Electrical and electronic equipment assemblers",
    "Switchboard operators, including answering service",
    "Legal secretaries",
    "Executive secretaries and executive administrative assistants",
    "Sewing machine operators",
    "Postal service mail sorters and processors",
    "Structural metal fabricators and fitters"
    ],
    y: [50.1,39.7, 160.6, 173.3, 74.7, 157.5, 566.2, 128.2, 89.1, 65.2],
    name: '2026',
    type: 'bar',
    text: ["-33.1%","-22.8%","-21.2%","-20.8%","-19.9%","-19.1%","-17.4%","-16.7%","-16.5%","-15.3%"],
    textposition: 'auto',
    hoverinfo:"text"
    
  };




  
  var data = [trace1, trace2];
  
  var layout = {
    //title: 'Occupations with the largest job declines,2016 and projected 2026(in thousands)',
   
    xaxis: {title: 'Title'},
    yaxis: {title: 'No.of Employees'},
    width: "100%",
    height: "100%",
    barmode: 'group',
    margin:{
      b:150,
    }
    
  };
  
  Plotly.newPlot('dec_bar', data, layout,{displayModeBar: false});

var gtrace1 = {
    x: ["Home health aides",
      "Personal care aides",
      "Software developers, applications",
      "Medical assistants",
      "Market research analysts and marketing specialists",
      "Medical secretaries",
      "Financial managers",
      "Combined food preparation and serving workers",
      "Registered nurses",
      "Management analysts" ],
    y:[912,
        2016,
        831,
        634,
        595,
        574,
        580,
        3452,
        2955,
        806
        ],
    name: '2016',
    type: 'bar',
    hoverinfo:"none"
  };
  console.log(gtrace1);
 

  var gtrace2 = {
    x:  ["Home health aides",
    "Personal care aides",
    "Software developers, applications",
    "Medical assistants",
    "Market research analysts and marketing specialists",
    "Medical secretaries",
    "Financial managers",
    "Combined food preparation and serving workers",
    "Registered nurses",
    "Management analysts" ],
    y: [1342,
        2793,
        1086,
        818,
        733,
        703,
        689,
        4032,
        3393,
        921
        ],
    name: '2026',
    type: 'bar',
    text: ["+47.3%","+38.6%","+30.7%","+29.0%","+23.2%","+22.5%","+18.7%","+16.8%","+14.8%","+14.3%"],
    textposition: 'auto',
    hoverinfo:"text"
    
  };

  

  
  var gdata = [gtrace1, gtrace2];
  
  var glayout = {
    //title: 'Occupations with the most job growth,2016 and projected 2026(in thousands)',
   
    xaxis: {title: 'Title'},
    yaxis: {title: 'No.of Employees'},
    width: "100%",
    height:"100%",
    barmode: 'group',
    margin:{
      b:150,
    }
  };
  
  Plotly.newPlot('grow_bar', gdata, glayout,{displayModeBar: false});

 
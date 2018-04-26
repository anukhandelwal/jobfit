var trace1 = {
    x: ["Secretaries and administrative assistants, except legal, medical, and executive", "Team assemblers", "Executive secretaries and executive administrative assistants", "Inspectors, testers, sorters, samplers, and weighers", "Electrical and electronic equipment assemblers", "Data entry keyers", "Tellers", "Postal service mail carriers", "Legal secretaries", "Correctional officers and jailers"],
    y:[2536, 1130, 685, 520, 218, 203, 502, 316, 194, 450],
    name: '2016',
    type: 'bar',
    hoverinfo:"none"
  };
  console.log(trace1);
  
  var trace2 = {
    x: ["Secretaries and administrative assistants, except legal, medical, and executive", "Team assemblers", "Executive secretaries and executive administrative assistants", "Inspectors, testers, sorters, samplers, and weighers", "Electrical and electronic equipment assemblers", "Data entry keyers", "Tellers", "Postal service mail carriers", "Legal secretaries", "Correctional officers and jailers"],
    y: [2371, 985, 566, 465, 173, 160, 460, 278, 157, 415],
    name: '2026',
    type: 'bar',
    text: ["-6.5%","-12.8%","-17.4%","-10.7%","-20.8%","-21.2%","-8.3%","-12.1%","-19.1%","-7.7%"],
    textposition: 'auto',
    hoverinfo:"text"
    
  };
 //
 //


  
  var data = [trace1, trace2];
  
  var layout = {
    title: 'Highest Declining Jobs(2016-2026)',
   
    xaxis: {title: 'Title'},
    yaxis: {title: 'No.of Employees'},
    width: "100%",
    height: "100%",
    barmode: 'group',
    
  };
  
  Plotly.newPlot('dec_bar', data, layout,{displayModeBar: false});

var gtrace1 = {
    x: ["Personal care aides",
        "Combined food preparation and serving workers, including fast food",
        "Registered nurses",
       " Home health aides",
        "Software developers, applications",
        "Janitors and cleaners, except maids and housekeeping cleaners",
        "General and operations managers",
        "Laborers and freight, stock, and material movers, hand",
        "Medical assistants",
        "Waiters and waitresses"
        ],
    y:[2016,
        3452,
        2955,
        911,
        831,
        2384,
        2263,
        2628,
        634,
        2600
        ],
    name: '2016',
    type: 'bar'
  };
  console.log(gtrace1);
  
  var gtrace2 = {
    x:  ["Personal care aides",
    "Combined food preparation and serving workers, including fast food",
    "Registered nurses",
   " Home health aides",
    "Software developers, applications",
    "Janitors and cleaners, except maids and housekeeping cleaners",
    "General and operations managers",
    "Laborers and freight, stock, and material movers, hand",
    "Medical assistants",
    "Waiters and waitresses"
    ],
    y: [2793,
        4032,
        3393,
        1342,
        1086,
        2621,
        2468,
        2828,
        818,
        2783
        ],
    name: '2026',
    type: 'bar',
    text: ["+38.6%","+16.8%","+14.8%","+47.3%","+30.7%","+9.9%","+9.1%","+7.6%","+29.0%","+7.0%"],
    textposition: 'auto',
    
  };
 

  
  var gdata = [gtrace1, gtrace2];
  
  var glayout = {
    title: 'Highest Growing Jobs(2016-2026)',
   
    xaxis: {title: 'Title'},
    yaxis: {title: 'No.of Employees'},
    width: "100%",
    height:"100%",
    barmode: 'group'
  };
  
  Plotly.newPlot('grow_bar', gdata, glayout,{displayModeBar: false});

 
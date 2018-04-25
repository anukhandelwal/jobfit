var trace1 = {
    x: ["Secretaries and administrative assistants, except legal, medical, and executive", "Team assemblers", "Executive secretaries and executive administrative assistants", "Inspectors, testers, sorters, samplers, and weighers", "Electrical and electronic equipment assemblers", "Data entry keyers", "Tellers", "Postal service mail carriers", "Legal secretaries", "Correctional officers and jailers"],
    y:[2536, 1130, 685, 520, 218, 203, 502, 316, 194, 450],
    name: '2016',
    type: 'bar'
  };
  console.log(trace1);
  
  var trace2 = {
    x: ["Secretaries and administrative assistants, except legal, medical, and executive", "Team assemblers", "Executive secretaries and executive administrative assistants", "Inspectors, testers, sorters, samplers, and weighers", "Electrical and electronic equipment assemblers", "Data entry keyers", "Tellers", "Postal service mail carriers", "Legal secretaries", "Correctional officers and jailers"],
    y: [2371, 985, 566, 465, 173, 160, 460, 278, 157, 415],
    name: '2026',
    type: 'bar'
  };
 

  
  var data = [trace1, trace2];
  
  var layout = {
    title: 'Highest Declining Jobs(2016-2026)',
   
    xaxis: {title: 'Title'},
    yaxis: {title: 'No.of Employees'},
    width: "100%",
    height: "100%",
    barmode: 'group'
  };
  
  Plotly.newPlot('bar', data, layout);

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
    type: 'bar'
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
  
  Plotly.newPlot('grow_bar', gdata, glayout);
  

var map = d3.geomap.choropleth()
    .geofile('/json/countries/USA.json')
    .projection(d3.geo.albersUsa)
    .column('2012')
    .unitId('fips')
    .scale(1000)
    .legend(true);

d3.csv('/Data/JobSalaryState.csv', function(error, data) {
    d3.select('#map')
        .datum(data)
        .call(map.draw, map);
});
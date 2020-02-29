const m = {
    width: 800,
    height: 600
}

const svg = d3.select("body").append('svg')
    .attr('width', m.width)
    .attr('height', m.height)

const g = svg.append('g')

d3.json('nygeo.json').then(function(map) {
    d3.csv('data.csv').then(function(data){

        const albersProj = d3.geoAlbers()
            .scale(70000)
            .rotate([73.9, 1.6])
            .center([0, 42.313])
            .translate([m.width/2, m.height/2]);

        const geoPath = d3.geoPath()
        .projection(albersProj)

        g.selectAll('path')
            .data(map.features)
            .enter()
            .append('path')
                .attr('fill', '#ccc')
                .attr('d', geoPath)
                .attr('stroke', 'black')
        g.selectAll('.circle')
             .data(data)
             .enter()
             .append('circle')
                 .attr('cx', function(d) {
                     let scaledPoints = albersProj([d['longitude'], d['latitude']])
                     return scaledPoints[0]
                 })
                 .attr('cy', function(d) {
                     let scaledPoints = albersProj([d['longitude'], d['latitude']])
                     return scaledPoints[1]
                 })
                 .attr('r', 2)
                 .attr('fill', 'steelblue')
                 .on( "click", function(){
                    d3.select(this)
                      .attr("opacity",1)
                      .attr('fill', 'red')
                      .transition()
                      .duration(3000)
                      .attr("cx", 0)
                      .attr("cy", 0)
                      .attr("opacity", 0 )
                      .on("end",function(){
                        d3.select(this).remove();
                      })
                    })

        
    })
})

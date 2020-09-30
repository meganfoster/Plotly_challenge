d3.json("../samples.json").then((data) => {
   
    // Create Dropdown Options   
    var select = document.getElementById("selDataset"); 
    var options = data.names; 
    var patient_data = data.samples;
    var meta_data = data.metadata;
  
    for(var i = 0; i < options.length; i++) {
        var opt = options[i];

        var el = document.createElement("option");
        el.text = opt;
        el.value = opt;

        select.add(el);
    }

    // Display the default plot
        // Isolate selected patient
        var patient = data.samples[0]
        console.log(patient)
        
        // Identify and Display Demographic Info
        var panel_info = Object.entries(data.metadata[0])
        console.log(panel_info)

        d3.select(".panel-body")
            .selectAll("div")
            .data(panel_info)
            .enter()
            .append("div")
            .text(function(d){
                return `${d[0]}: ${d[1]}`;
            });

        // Slice the first 10 OTUs for plotting
        sliced_sample_values = patient.sample_values.slice(0, 10);
        sliced_otu_ids = patient.otu_ids.slice(0, 10);
        sliced_otu_ids = sliced_otu_ids.map(String)
        sliced_otu_labels = patient.otu_labels.slice(0, 10);
        console.log(sliced_sample_values)
        console.log(sliced_otu_ids)
        console.log(sliced_otu_labels)

        var barids = []
        
        for (var i = 0; i < 10; i++) {
            barID = `OTU ${sliced_otu_ids[i]}`
            barids.push(barID)
        }
        console.log(barids)

        // Reverse the array to accommodate Plotly's defaults
        reversed_SVs = sliced_sample_values.reverse();
        reversed_barids = barids.reverse();
        reversed_labels = sliced_otu_labels.reverse();

        // Trace1 for the Data
        var trace1 = {
        x: reversed_SVs,
        y: reversed_barids,
        text: reversed_labels,
        // name: "Greek",
        type: "bar",
        orientation: "h"
        };

        // data
        var bar_data = [trace1];

        // Apply the group bar mode to the layout
        var layout = {
       
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", bar_data, layout);

        // Create a bubble chart
        sample_values = patient.sample_values;
        otu_ids = patient.otu_ids;
        otu_labels = patient.otu_labels;
        console.log(sample_values)
        console.log(otu_ids)
        console.log(otu_labels)

        // Trace1 for the Data
        var trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                color: otu_ids,
                size: sample_values
            },
            type: "bubble",
            text: otu_labels
            };
        
            // data
            var bubble_data = [trace2];
        
            // Apply the group bar mode to the layout
            var layout = {
            xaxis: {
                title: "OTU ID"
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
            };
        
            // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bubble", bubble_data, layout);
    // };

    // On change to the DOM, call getData()
    d3.selectAll("#selDataset").on("change", getData);

    // Function called by DOM changes
    function getData() {
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");
        console.log(dataset)

        for(var i = 0; i < options.length; i++) {
            var opt = options[i];

            if (dataset == opt) {
                index = i;
            }
        }
        console.log(index)

        // var new_patient = data.samples[index]
        console.log(patient_data[index])

        // Isolate selected patient
        var patient = patient_data[index]
        console.log(patient)
        
        // Identify and Display Demographic Info
        var panel_info = Object.entries(meta_data[index])
        console.log(panel_info)

        // Clear the Demographic Info
        var arr = [];
        d3.select(".panel-body")
            .selectAll("div")
            .data(arr)
            .exit()
            .remove();

        // Fill in the selected patient's demograpic info
        d3.select(".panel-body")
            .selectAll("div")
            .data(panel_info)
            .enter()
            .append("div")
            .text(function(d){
                return `${d[0]}: ${d[1]}`;
            });

        // Slice the first 10 OTUs for plotting
        sliced_sample_values = patient.sample_values.slice(0, 10);
        sliced_otu_ids = patient.otu_ids.slice(0, 10);
        sliced_otu_ids = sliced_otu_ids.map(String)
        sliced_otu_labels = patient.otu_labels.slice(0, 10);
        console.log(sliced_sample_values)
        console.log(sliced_otu_ids)
        console.log(sliced_otu_labels)

        var barids = []
        
        for (var i = 0; i < 10; i++) {
            barID = `OTU ${sliced_otu_ids[i]}`
            barids.push(barID)
        }
        console.log(barids)

        // Reverse the array to accommodate Plotly's defaults
        reversed_SVs = sliced_sample_values.reverse();
        reversed_barids = barids.reverse();
        reversed_labels = sliced_otu_labels.reverse();

        // Trace1 for the Greek Data
        var trace1 = {
        x: reversed_SVs,
        y: reversed_barids,
        text: reversed_labels,
        // name: "Greek",
        type: "bar",
        orientation: "h"
        };

        // data
        var data = [trace1];

        // Apply the group bar mode to the layout
        var layout = {
        // title: "Greek gods search results",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", data, layout);

        // Create a bubble chart
        sample_values = patient.sample_values;
        otu_ids = patient.otu_ids;
        otu_labels = patient.otu_labels;
        console.log(sample_values)
        console.log(otu_ids)
        console.log(otu_labels)

        // Trace1 for the Greek Data
        var trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                color: otu_ids,
                size: sample_values
            },
            type: "bubble",
            text: otu_labels
            };
        
            // data
            var data = [trace2];
        
            // Apply the group bar mode to the layout
            var layout = {
            xaxis: {
                title: "OTU ID"
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
            };
        
            // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bubble", data, layout);

    }

  });
  
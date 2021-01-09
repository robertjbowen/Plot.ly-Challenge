// Created by Robert J. Bowen
// 9 January 2021
// Note: Because this file uses D3.json to import the data, if running locally, you will need to run index.html from a local host server or you will receive a fetch error. 

// Requirement 6: Update all of the plots any time that a new sample is selected
function optionChanged(subjectID) {
	console.log(subjectID);

// Requirement 1: Use D3 fetch to read the JSON file	
	d3.json("data/samples.json").then(data => {
		console.log(data);
  

// Extract the data set 
		let names = data.names;
		let demographics = data.metadata;
		let samples = data.samples;

//Convert the test subject id numbers from the names array into html select list options and append them to the select list
		names.forEach((name) => {
			let selectList =  d3.select("#selDataset").append("option").text(name)                       
		});

		let subjectInfo = displayDemographics(subjectID, demographics);		// calls the funtion to display the test subject demographics
		buildPlots(subjectID, samples, subjectInfo);						// calls the funtion to display the three data plots
	});
}

// Requirements 2,3, and Advanced Challenge Assignment: Build Plots
function buildPlots(sampleID, samples, sampleDem){
	let sampleInfo = samples.filter(sample => sample.id == sampleID)[0];	// filter the samples array for the selected test subject id
	let vals = sampleInfo.sample_values;									// extracts the sample values data for the test subject
	let otu_ids = sampleInfo.otu_ids;										// extracts the otu ids data for the test subject
	let otu_labels = sampleInfo.otu_labels;									// extracts the otu labels data for the test subject
	let otuIDs = []															// creates a blank array to hold modified otu ids
	for (ids in otu_ids) {otuIDs.push("OTU " + otu_ids[ids])}				// loops through each out id and appends the text "OTU " and adds the new id to the otuIDs array


// Requirement 2: Create a horizontal barchart with a dropdown menu to display the top 10 OTUs found in that individual
	Plotly.newPlot("bar", [{												// Creates a new plot.ly plot at location id bar in index.html
		x: vals.slice(0, 10).reverse(),										// takes the first 10 elements in the vals array, reverses their order and assings them to the 'x' coordinate values
	    y: otuIDs.slice(0, 10).reverse(),									// takes the first 10 elements in the otuIDs array, reverses their order and assings them to the 'y' coordinate values
	    text: otu_labels.slice(0, 10).reverse(),							// takes the first 10 elements in the otu_labels array, reverses their order and assings them as the hover text information
	    type: "bar",														// Sets the plot type as a bar chart
	    orientation: "h"}],													// sets the orientation of the plot to horizontal
	    {title: "Top 10 OTUs Found"}										// formats the chart title
	);

// Requirement 3: Create a bubblechart that displays each sample
	Plotly.newPlot("bubble", [{												// Creates a new plot.ly plot at location id bubble in index.html
		x: otu_ids,															// assigns the otu_ids array as the 'x' coordinate values
	    y: vals,															// assigns the vals array as the 'y' coordinate values
	    mode: 'markers',													// sets the data to be displayed as markers
  		marker: {color: otu_ids, size: vals},								// assigns data variables to determine color and size values of the markers
	    text: otu_labels}],													// assigns the otu_labels array as the hover text information
	    {title: "Operational Taxonomic Units Found"}						// formats the chart title
	);

// Advanced Challenge Assignment: Create a Gauge Chart to plot the weekly washing frequency of the individual
	Plotly.newPlot('gauge', [{												// Creates a new plot.ly plot at location id gauge in index.html
		domain: { x: [0, 1], y: [0, 1] },
		value: sampleDem.wfreq,												// assigns the washing frequency value as the data value to be displayed
		title: { text: "Weekly Washing Frequency" },						// formats the chart title
		type: "indicator",													// sets the chart type as an indicator
		mode: "gauge+number",												// sets the plot as a gauge and number format
		gauge: {
      		axis: { range: [null, 9] },										// sets the fixed of the range to be between 0 and 9
      		steps: [
        		{ range: [0, 3], color: "lightblue" },						// divides the gauge into three ranges and assigns a different color to each
        		{ range: [3, 6], color: "blue" },
        		{ range: [6, 9], color: "darkblue" }
      		]}}],
      	{width: 600, height: 500, margin: { t: 0, b: 0 }}					// formats the display dimensions of the plot
    );
};

// Requirements 4&5: Display each key-value pair from the metadata JSON object
function displayDemographics (sampleID, demographics) {
	let demoInfo = demographics.filter(sample => sample.id == sampleID)[0];	// filter the demographics array for the selected id
	let list =  d3.select("#sample-metadata");								// create reference to the list element in index.html
	list.html("");															// clear the old list
	for (i in demoInfo) { list.append("p").text(i + ": " + demoInfo[i])}	// append metadata to the list
	console.log(demoInfo);
	return demoInfo;														// returns the demographic info variable to be passed to the buildplots function
};

optionChanged(940);															// initializes the page by calling the optionChanged function for subject id '940'

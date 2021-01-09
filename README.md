# Plot.ly-Challenge

## Link: https://robertjbowen.github.io/Plot.ly-Challenge/

<p>
    <img src="https://github.com/robertjbowen/Plot.ly-Challenge/blob/main/images/Picture1.png"/>
    <br>
    <em>Interactive Dashboard</em>
</p>

***

The purpose of this challenge is to build an interctive dashboard by importing JSON data using D3.json and display the data using JavaScript Plot Library Plot.ly to render plots within an html framework. The data displayed must be selectable based on subject id numbers displayed as a list within the html interface.

***

### Documents in this repository are:

1. index.html - This is the html code to generate the interactive dashboard web page.


2. static/js directory - Folder containing the javascript project code for automatic table and date search capabilities
	
	* app.js - javasrcipt file containg functions and event triggers to read samples.json, extract the data into arrays, and generate the html code to display the plots 


3. data directory - folder containing the samples.json data file


4. images directory - contains images of the WebPage outputs for display in this ReadMe

***

### Design concept:

1. The index.html generates an empty shell dashboard with empty element blocks with the body of the code. The dashboard is initialized automatically by app.js calling the 'optionChanged' function and passing it an intial value of '940' (the first subject id in the sample data set).

<p>
    <img src="https://github.com/robertjbowen/Plot.ly-Challenge/blob/main/images/Picture7.png"/>
    <br>
    <em>Calls 'optionChanged' Function to Intialize Interactive Dashboard</em>
</p>

***
2. The interactive dashboard is designed to update all plots whenever the user selects a new sample id from a drop down list this is accomplished through an 'onchange' function within the body of the index.html file with the id "selDataset". This runs the javascript function 'optionChanged' within app.js and passes the new subject id value whenever it is changed by the user. The subject id value is selected from a drop down menu of all ids within the dataset which is created by the 'optionChanged' function.

<p>
    <img src="https://github.com/robertjbowen/Plot.ly-Challenge/blob/main/images/Picture13.png"/>
    <br>
    <em>index.html 'onchange' function</em>
</p>

***
3. The 'optionChanged' function is the primary function of the app and calls all other functions.

<p>
    <img src="https://github.com/robertjbowen/Plot.ly-Challenge/blob/main/images/Picture6.png"/>
    <br>
    <em>app.js 'onchange' function</em>
</p>

	a. The 'optionChanged' function takes the input of the subject id number and imports the samples.json data set using the d3.json library. The data set is a dictionary with three key values (names, metadata, and samples) and the values of 153 samples. 

<p>
    <img src="https://github.com/robertjbowen/Plot.ly-Challenge/blob/main/images/Picture9.png"/>
    <br>
    <em>app.js data import using d3.json</em>
</p>

	b. The data values for each of the three primary keys are read into array variables (names, demographics, and samples) for use by subsequent functions.

<p>
    <img src="https://github.com/robertjbowen/Plot.ly-Challenge/blob/main/images/Picture14.png"/>
    <br>
    <em>app.js extracting the data to arrays</em>
</p>

	c. The function generates the select list used later to call the function by iterating through the "names" array and creating an html "option" element for each value which it then appends to the html select list object in index.html.

<p>
    <img src="https://github.com/robertjbowen/Plot.ly-Challenge/blob/main/images/Picture10.png"/>
    <br>
    <em>app.js generating the select list</em>
    <br>
    <img src="https://github.com/robertjbowen/Plot.ly-Challenge/blob/main/images/Picture2.png"/>
    <br>
    <em>Rendered Select List in the Dashboard</em>
</p>
  
	d. The 'optionChanged function calls the other functions( displayDemographics and buildPlots) passing the extracted data values and the subject id values to each.

<p>
    <img src="https://github.com/robertjbowen/Plot.ly-Challenge/blob/main/images/Picture11.png"/>
    <br>
    <em>app.js calls to other functions</em>
</p>

***
4. The 'displayDemographics' function takes the inputs of the subject id number and the demographics array as inputs. The function filters the demographics array to retreive only the data pertaining to the subject id number. The function then creates a reference to the 'sample-metadata' id of the panel element in index.html. The function clears any old  items if they exist, and then iterates through the filtered array items creating a "p" elements that display the key-value pairs for each item and append them to the html element. The function then concludes by returning the filtered demographic data (demoInfo) to a variable called (subjectInfo) for use by the 'buildPlots' function.  

<p>
    <img src="https://github.com/robertjbowen/Plot.ly-Challenge/blob/main/images/Picture8.png"/>
    <br>
    <em>app.js 'displayDemographics' function</em>
    <br>
    <img src="https://github.com/robertjbowen/Plot.ly-Challenge/blob/main/images/Picture15.png"/>
    <br>
    <em>Rendered Demographic Info in the Dashboard</em>
</p>

***
5. The 'buildPlots' function takes the inputs of the subject id number, the samples array, and subjectInfo array as inputs. Just like the 'displatDemographics' function did for the demographics array, this function filters the samples array. The samples data contains three seperate sets of data (sample_values, otu_ids, and otu_values) which are extracted into individual arrays. The values in the otu_ids array are integers and have the text "OTU " appended to the beginings and are saved as strings so the the bar plot will display the values as text rather than treating them as a coordinate values. The function then calls plots to build a bar chart, a bubble chart, and uses the wfreq key value from the demographics data to generate a gauge chart. (Explainations of the functions of each line in the plot rendering is included in the app.js notes)

<p>
    <img src="https://github.com/robertjbowen/Plot.ly-Challenge/blob/main/images/Picture12.png"/>
    <br>
    <em>app.js 'buildPlots' function</em>
    <br>
    <img src="https://github.com/robertjbowen/Plot.ly-Challenge/blob/main/images/Picture3.png"/><img src="https://github.com/robertjbowen/Plot.ly-Challenge/blob/main/images/Picture5.png"/>
    <br>
    <em>Rendered Bar and Gauge Charts in the Dashboard</em>
    <img src="https://github.com/robertjbowen/Plot.ly-Challenge/blob/main/images/Picture4.png"/>
    <br>
    <em>Rendered Bubble Chart in the Dashboard</em>
</p>


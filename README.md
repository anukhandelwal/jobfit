# JobFitt
![jobfit](Images/JobFit.png)


### Our Team:

* Aiyanna Liz Mathew	
*	Anu Khandelwal 
* Aruna Amaresan			
* Aswathy Mohan
* Pallavi Donwad

### Overview
Team Athena is looking to build a job fit recommender to indicate top highly likely position titles with mapping salary that would fit a given job seeker’s current skills, education, education level, years of experience and other factors. 

### Business Problem
With the changing technology trends with automation, analytics, cloud computing and machine learning becoming more popular, it is challenging currently for a fresh grad or an experienced job seeker to understand the kinds of titles and salaries that would actually map to their current skills. They end-up feeding the same info to multiple sites and apply on different sites. 

It would help:
*   The job seeker to understand the value of their skills more and target their job application process. 
*   Check out Current trends within US 
*   Get access to data

Eventually, this would help the entire recruiting ecosystem that includes company career sites, job boards, applicant tracking systems, and staffing agencies to improve site engagement and candidate conversion.

### Goal 
The goal is to provide an app where a user would input info on skills, major, college (last attended), education level. These would form the independent X variables. Give this info, we would provide highly likelihood of title and salaries that map the user’s skills. This would be the dependent Y variables.

To do this, the plan would be to train a model using random forest algorithm and/or clustering with datasets found and/or using API calls to provide highly likelihood of title and salaries that map the user’s skills. 

### Method to our Madness!
1.	Our goal is to first tackle sharing likely recommendation of title and mapping salaries for fresh Grads
If time permits, we would like to:
2.	Apply a new model with training and test set to train for experienced job seekers.

### Tasks to be done: 
*   Cleansing Data 
*   Training and testing model (machine learning) – Mostly 2 models (Random Forest and TBD)
*   Front end – Index HTML page   (visualization and then form based input)
*   Front end - About Page
*   Front end - Visualizations page for historical data info and/or API data 
*   Flask App -> to call on API
*   Logic to ensure form info is submitted back into testing set
*   Mongo DB backend
*   Visualization and plots to show on front end web pages using D3, plotly and/or leaflet 
*   APIs to call from monster or some other website

### Tools to be used: (TODO ADD OTHER LINKS)
*   Machine learning using KMeans, Random forest algorithm and Deep Machine learning using sklearn libraries using sklearn and pickle
*   MongoDB for backend database
*   Python, Pandas, json, ast, Flask, PyMongo for hosting app, routing endpoints and connecting with Mongo DB backend for predict and scoring
*   For Front end – Bootstrap , CSS and visualization using plotly, chloropleth and TOADD OTHERS . 

### Dataset links and other links:  (TODO UPDATE)
For college fresh grad: 
a)	https://www.kaggle.com/wsj/college-salaries 
b)	https://data.world/fivethirtyeight/college-majors/workspace/file?filename=women-stem.csv
c)	https://data.world/fivethirtyeight/college-majors/workspace/file?filename=recent-grads.csv
For experienced job seeker dataset: 
a)	https://www.kaggle.com/madhab/jobposts/data
b)	https://www.kaggle.com/PromptCloudHQ/us-jobs-on-monstercom (TBD)
Natural language classifier:
a)	From google: https://cloud.google.com/natural-language/docs/reference/rest/ 
b)	From IBM: https://console.bluemix.net/docs/services/natural-language-classifier/getting-started.html#natural-language-classifier 
#### Other useful links:
*   https://ikdd.acm.org/Site/CoDS2016/datachallenge.html 
http://www.nltk.org/book/ch06.html

### Our Takeaways
*   Trends show that the kobs are growing and we are looking to see more of robotic and automation repalcing the secretary and admin jobs
*   There is difference in job growth in numbers vs salary growth in those careers 
*   Certian skills and jobs seem to indicate a trend in paterns on where the jobs are spread out 

### Next Steps!
*   Gather enough datasets to replace second step of our proprietery alogirthm with a Neural Network machine learning model like RandomForest and DML 
*   For Current Trends - Do web scraping from other websote to get news and show on trends page 
*   Provide Search functionality 

### Roadmap
*   App would suggest positions available right now in careers websites that map the title and salaries that were suggested 
*   Find what skill gaps to be updated to achieve the job position needs for a job seeker. 



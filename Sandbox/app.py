# Dependencies
import pymongo
from pymongo import MongoClient
from flask import(
    Flask,
    render_template,
    jsonify,
    request,
    redirect,
    url_for
    )
import numpy as np
import pandas as pd
import json
import ast
import numbers 
import pickle
from sklearn.cluster import KMeans
import os
#import predict_score_users - To ensure it works when hosting app on heroku - Need to see if importing this would work.


# Initialize the Flask application
app = Flask(__name__)

# MongoDB Connection
client = MongoClient('mongodb://Aiyana:jobfitt@ds253889.mlab.com:53889/jobfitt')
# Get the sampleDB database
db = client.get_database()
# Initialize the collections to variables
Education_Experience_collection = db.Education_Experience
Alternate_Titles_collection = db.Alternate_Titles 
Job_State_Salary_collection = db.Job_State_Salary 
Knowledge_Cluster_collection  = db.Knowledge_Cluster 
Salary_State_Year_collection = db.Salary_State_Year
Occupation_collection = db.Occupation 
user_input_collection = db.user_data

# App route definitions
@app.route("/")
@app.route("/index")
def landing():
    return(render_template("index.html"))

@app.route("/survey")
def survey():
    return(render_template("mysearch.html"))

@app.route("/result")
def result():
    return(render_template("results.html"))

@app.route("/trends")
def trends():
    return(render_template("trends.html"))

@app.route("/about")
def about():
    return(render_template("about.html"))
@app.route("/data")
def dataSearch():
    return(render_template("dataSearch.html"))

@app.route("/Education_Experience")
def pymongo_Education_Experience_display():
    Education_Experience_result=[]
    print("Retrieving Data from Mongo Education_Experience")
    cursor = Education_Experience_collection.find({})
    for document in cursor:
        document.pop("_id")
        Education_Experience_result.append(document)
    return jsonify(Education_Experience_result)


@app.route("/Alternate_Titles")
def pymongo_Alternate_Titles_display():
    Alternate_Titles_result=[]
    print("Retrieving Data from Mongo Alternate_Titles")
    cursor = Alternate_Titles_collection.find({})
    for document in cursor:
        document.pop("_id")
        Alternate_Titles_result.append(document)
    return jsonify(Alternate_Titles_result)


@app.route("/Job_State_Salary")
def pymongo_Job_State_Salary_display():
    Job_State_Salary_result=[]
    print("Retrieving Data from Mongo Job_State_Salary")
    cursor = Job_State_Salary_collection.find({})
    for document in cursor:
        document.pop("_id")
        Job_State_Salary_result.append(document)
    return jsonify(Job_State_Salary_result)


@app.route("/Knowledge_Cluster")
def pymongo_Knowledge_Cluster_display():
    Knowledge_Cluster_result=[]
    print("Retrieving Data from Mongo Knowledge_Cluster")
    cursor = Knowledge_Cluster_collection.find({})
    for document in cursor:
        document.pop("_id")
        Knowledge_Cluster_result.append(document)
    return jsonify(Knowledge_Cluster_result)


@app.route("/Salary_State_Year")
def pymongo_Salary_State_Year_display():
    Salary_State_Year_result=[]
    print("Retrieving Data from Mongo Salary_State_Year")
    cursor = Salary_State_Year_collection.find({})
    
    for document in cursor:
        document.pop("_id")
        try:
            document["Salary_2015"]=float(document["Salary_2015"].replace("$","").replace(",",""))
            document["Salary_2017"]=float(document["Salary_2017"].replace("$","").replace(",",""))
        except:
            pass
        Salary_State_Year_result.append(document)
    return jsonify(Salary_State_Year_result)

@app.route("/Occupation")
def pymongo_Occupation_display():
    Occupation_result=[]
    print("Retrieving Data from Mongo Occupation")
    cursor = Occupation_collection.find({})
    for document in cursor:
        document.pop("_id")
        Occupation_result.append(document)
    return jsonify(Occupation_result)

@app.route('/Predict_Score_Users', methods=['POST'])
def pymongo_Predict_Score_Users():
    
    # Read input info  => Read the hidden input that has info submitted by user 
    # user_input = request.form["USERINPUT"] 
    #user_dict1 = request.form.get()
    #user_dict1 = request.form.get("USERINPUT")
    #first_name = request.form.get("Name")
    #phone1 = request.form.get("Phone")
    print('In Predict Score users - Printing user input')
    user_dict1 = request.form.get('data')
    print(user_dict1)

    input_dict = ast.literal_eval(user_dict1)
    print(input_dict['Name'])
    print(input_dict['Skills'])

    result_id = user_input_collection.insert(input_dict)  #posting.__dict__
    # Give info of inserted IDs
    print(f"Inserted record ID: {result_id}")


    #Write info into collection with predicted values 
    print("Reading user input info")
    #print (user_input)

    #Write info in the collection object 
    Knowledge_Cluster_result=[]
    print("Retrieving Data from Mongo Knowledge_Cluster")
    cursor = Knowledge_Cluster_collection.find({})
    for document in cursor:
        document.pop("_id")
        Knowledge_Cluster_result.append(document)

    #TODO -> Also pass the user_response collection on latest submission
    skills_input = {}
    skills_input = input_dict['Skills']
    print("SKILLS INPUT TO predict_title_grouping")
    print(skills_input)
    print(f"Type of skills_input to Predict: {type(skills_input)}")
    
    predicted_title_group = predict_title_grouping(Knowledge_Cluster_result, skills_input)

    #Get the Education Experinece Scoring Data present 
    Education_Experience_result=[]
    print("Retrieving Data from Mongo Education_Experience")
    cursor = Education_Experience_collection.find({})
    for document in cursor:
        document.pop("_id")
        Education_Experience_result.append(document)

    #Read the Occupation collection info and pass it to the function 
    Occupation_result=[]
    print("Retrieving Data from Mongo Occupation")
    cursor = Occupation_collection.find({})
    for document in cursor:
        document.pop("_id")
        Occupation_result.append(document)

    #TODO -> Also pass the user_response collection on latest submission
    scored_titles =  score_user(input_dict['Work Experience Level'], 
                                                    input_dict['Education Level'],
                                                    predicted_title_group, 
                                                    Education_Experience_result, 
                                                    Occupation_result)
    print (scored_titles)
    #STored the result in mondoDB collection
    #result_collection = db.results
    #result_ids = result_collection.insert_many(scored_titles)  #posting.__dict__
    # Give info of inserted IDs
    #print(result_ids.inserted_ids)
    #STep 1: Write this data into a JSON file
    with open('static/Data/results.json', 'w') as resultFileHandle:
        json.dump(scored_titles, resultFileHandle)
    # Step 2: Write inputs shared by user ad prediction into json file 
    # Step 3: return a redirect to results page 
    #return redirect(url_for('result'))
    return jsonify(scored_titles)

@app.route("/Alternate_Titles_User")
def pymongo_Display_Alternate_Titles_For_User():
    Alternate_Titles_result=[]
    print("Retrieving Data from Mongo Alternate_Titles")
    cursor = Alternate_Titles_collection.find({})
    for document in cursor:
        document.pop("_id")
        Alternate_Titles_result.append(document)

    #TODO -> Also pass the user_response collection on latest submission
    user_alt_titles = show_alternate_titles(Alternate_Titles_result)
    return jsonify(user_alt_titles)

#extra route
@app.route("/result_output")
def results_info():
   DF=pd.read_json("static/Data/results.json")
   DF=DF.T.to_dict().values()

   return jsonify(list(DF))

@app.route("/results_bar_plot")
def results_bar_plot():
    DF=pd.read_json("static/Data/results.json")
    labels=[]
    values=[]
    y_axis=[]
    for index,item in DF.iterrows():
        db_obj=Salary_State_Year_collection.find_one({"Job_Title":item["Title"]})
        labels.append(item["Title"])
        try:
            values.append(db_obj["Salary_2017"])
        except:
            all_obj =Salary_State_Year_collection.find_one({"Job_Title":"All Occupations"})
            values.append(all_obj["Salary_2017"])
            
    # Convert the y axis currency into a integer list
    #for val in values:
    #    y_axis.append(int(val.replace("$","").replace(",","")))
        
    # Create and Sort the dataframe in descending order of salaries
    bar_graph=pd.DataFrame({"x":labels,"y":values})
    bar_graph=bar_graph.sort_values(by=["y"],ascending=False)
    
    # Store the dataframe as dictionary before returning the variable to the route
    labels=bar_graph["x"].tolist()
    values=bar_graph["y"].tolist()
    bar_graph_variable={"x":labels,"y":values}
    
    # Return the bar_graph_variable
    return jsonify(bar_graph_variable)

@app.route("/results_map_plot")
def results_map_plot():
    DF=pd.read_json("static/Data/results.json")
    map_variable={}
    for index,item in DF.iterrows():
        title=item["Title"]
        values=[]
        cursor=Job_State_Salary_collection.find({"Job_Title":item["Title"]})
        for document in cursor:
            doc={"State":document["State"],
                "Salary":document["Salary"].replace("$","").replace(",",""),
                "Title":document["Job_Title"]}
            values.append(doc)
        map_variable[title]=values
    return jsonify(map_variable)
    

@app.route("/results_line_plot")
def results_line_plot():
    DF=pd.read_json("static/Data/results.json")
    line_variable={}
    titles=[]
    
    x_axis=["2015","2017"]
    for index,item in DF.iterrows():
        y_axis=[]
        db_obj=Salary_State_Year_collection.find_one({"Job_Title":item["Title"]})
        titles.append(item["Title"])
        print(item["Title"])
        try:
            y_axis.append(int(db_obj["Salary_2015"].replace("$","").replace(",","")))
            y_axis.append(int(db_obj["Salary_2017"].replace("$","").replace(",","")))
        except:
            all_obj =Salary_State_Year_collection.find_one({"Job_Title":"All Occupations"})
            y_axis.append(int(all_obj["Salary_2015"].replace("$","").replace(",","")))
            y_axis.append(int(all_obj["Salary_2017"].replace("$","").replace(",","")))
        line_variable[item["Title"]]={"Title":item["Title"],
                                     "x":x_axis,
                                     "y":y_axis}
   
    
    # Return the bar_graph_variable
    return jsonify(line_variable)


# See below for details on what this module does
#import numpy as np
#import pandas as pd
#import numbers 
#import pickle
#from sklearn.cluster import KMeans
#import json 

# # Career Classify Helper (Predict and Score Users)
# Helps identify probable likely of a candidate's chances for a specific career (job title) based on their knowledge area, education level and experinece level. 
# 
# Input: TODO: Update write-up here 
# - KMeans Model The array or groups of clustered titles for the user's skills (derived from Kmeans clustering neural network)
# - We use the Kmeans cluster to predict and then 
# - Education Level and Experinece Level of user (Note: We are not going right now into details of exprienece under what title info. For now, just generalizing years of experinece.)
# - Uses the Education and Experience Level parsed out by my team. Date was parsed, cleansed from onenet datasource by our team - Here weights were given based on US National data collected on surveys from candidates all over the US by onetcenter 
# (https://www.onetcenter.org/db_releases.html)
# 
# Output:
# - Scores and shares (in desceendign order) the career titles that are high liikely and map to users' skill, educaltion level and experinece level. (Note: We can return the top 5 or top 3 to the users as desired)
# 
# 
# 
# ## The Dataset
# The following properties of each career title are measured and included within the CSV:
# 
# * Title: Job Title 
# * Education: Shares whether it is High School Diploma or Bachelors or Masters Degree (in string form)
# * Education Level: Number mapping to Education Level
# * Data Value_Education: Weight for Education Level for that specific title
# * Work Experience Level: Number mapping for Experience Level 
# * Work Experience: Experience (in words) whether it is in months or years
# * Data Value_Experience: Weight for Education Level for that specific title
# 
# Below is a calculated column value that you would see later as we pull all titles parsed out by Kmeans for that user's skills
# * Score: Calculated variable based on sum of (Education Level * Wt for Ed Level) + (Work Experience Level * Wt for Experience) = Scores are for each row for that title

def predict_title_grouping(Knowledge_Cluster_result=[], skills=[], *args):
    #Result Data to be sent back

    print("Entered Predit Title Grouping")
    for skill in skills:
        print(skills[skill])
    print (f"Type of skill variable: {type(skills)}")
    print (f"Whole Object SKILLS:{skills}")

    #Load the Kmeans model and predict to get the highlighly likely cluster group based on skills entered by user
    MYDIR = os.path.dirname(__file__)
    filepath=os.path.join(MYDIR,'static','Models','kmeans_knowledge_cluster.sav')
    loaded_model = pickle.load(open(filepath, 'rb'))
    #loaded_model = pickle.load(open('static/Models/kmeans_knowledge_cluster.sav', 'rb'))
	
    #TODO: Update to read from MongoDB the Data to write response from user into a temporary response info
    # For now, read from CSV the input data submitted by user
    #test_data = pd.read_csv("static/Data/test_data.csv") # this would have been input by user
    skills_df = pd.DataFrame([skills], columns=skills.keys())
    #skills_df = pd.DataFrame.from_dict(skills, orient='columns')
    #test_data.head()
    #For debugging - print all input values
    #expected_target=test_data["Title"]

    #Drop output target column
    #test_data = test_data.drop(['Title', 'Education Level', 'Work Experience Level'],axis=1)
    #print(test_data)
    print(skills_df)

    #Get all X variables for debugging purposes to print latet
    #feature_name=test_data.columns
    
    #print(expected_target)
    #print(test_data)

    #print(feature_name)

    #Load the Knowledge Cluster groupings
    read_cluster_grouping = pd.DataFrame(Knowledge_Cluster_result)
    cluster_group_df = read_cluster_grouping.set_index("Class")
    print(cluster_group_df)

    #Predict 
    result = loaded_model.predict(skills_df)#test_data)
    print("The test data belongs to Class: ", result[0])

    #Share result 
    selected_title_group =cluster_group_df.loc[cluster_group_df.index==result[0]]
    print("The jobs are listed below:")
    print(selected_title_group.values)
    print("***************************")
    print(selected_title_group)
    print("***************************")

    title_group = selected_title_group.values.tolist()

    '''
    for row_dict in Knowledge_Cluster_result:
        print(row_dict['Class'])
        print(row_dict['Title'])
    

    title_group =  [ {'Class': 95, 'Title': 'Online Merchants'},
                     {'Class': 95, 'Title': 'Business Intelligence Analysts'},
                     {'Class': 95, 'Title': 'Real Estate Brokers'},
                     {'Class': 95, 'Title': 'Marketing Managers'},
                     {'Class': 95, 'Title': 'Management Analysts'} ] 
    '''
    return selected_title_group


def score_user(exp_level, ed_level, predicted_title_group=[], Education_Experience_result=[], Occupation_result=[], *args):
    
    title_list = predicted_title_group["Title"]
    print("***Predicted Title Grouping based on user knowledge areas****")
    print(title_list)
    print("*************END OF Predicted Title Grouping ****************")
    print(f'Experience Level Input: {exp_level}')
    print(f'Education Level Input: {ed_level}')
    print("*************END OF EDUCATION EXPERIENCE LEVEL ****************")

    Ed_Exp = pd.DataFrame(Education_Experience_result)

    #Read input data for now from test_data 
    #TODO: Update to read from MongoDB the Data to write response from user into a temporary response info
    # For now, read from CSV the input data submitted by user
    #test_data = pd.read_csv("static/Data/test_data.csv") # this would have been input by user 
    #test_data.head()
    #For debugging - print all input values
    #expected_target=test_data["Title"]

    #Select only Education and Experience columns
    #test_data_filtered = test_data[['Education Level', 'Work Experience Level']]
    #print(test_data_filtered)
    #ed_level = test_data_filtered.iloc[0]['Education Level']
    #exp_level = test_data_filtered.iloc[0]['Work Experience Level']

    #Filter out based on predicted user title grouping 
    Ed_Exp_filtered = pd.DataFrame(Ed_Exp[Ed_Exp["Title"].isin(title_list)])
    #print (Ed_Exp_filtered)

    #Calculate the scores for each row in fitered list
    Ed_Exp_filtered['Score'] =((Ed_Exp_filtered['Education Level'] * Ed_Exp_filtered['Data Value_Education']) +
                           (Ed_Exp_filtered['Work Experience Level'] * Ed_Exp_filtered['Data Value_Experience']))

    #Filter further based on user's Eductation Level and Experinece level for tht specific title list
    print(f"Education Level: {ed_level}")
    print(f"Experience Level: {exp_level}")

    user_ed_list = [ed_level]
    user_exp_list = [exp_level]
    Ed_Exp_User_filtered = pd.DataFrame(Ed_Exp_filtered[(Ed_Exp_filtered["Education Level"].isin(user_ed_list)) & 
                                                (Ed_Exp_filtered["Work Experience Level"].isin(user_exp_list))])

    #Order it based on highlest scores
    Ed_Exp_User_Ordered = Ed_Exp_User_filtered.sort_values(by='Score', ascending=False)
    Ed_Exp_User_Ordered.head(10)

    Additonal_JobTitle_Details = pd.DataFrame(Occupation_result)
    JobDetails_pd = Additonal_JobTitle_Details[['Title', 'Description', 'Technology', 'CoreTasks']]
    JobDetails_pd.head() 

    #Merge on title and get all additional detauls realted to the job title like job description, technology and others 
    final_scored_title_list = pd.merge(Ed_Exp_User_Ordered, JobDetails_pd, on ='Title')
    final_scored_title_list.head()

    #Write as an array of dictionary items and send info back 
    score_titles_list = final_scored_title_list.to_dict(orient='records')
    
    #with open('static/Data/results.json', 'w') as resultFileHandle:
    #   resultFileHandle.write(score_titles_list)

    '''
    score_titles = [ 
                    { 'Title': 'Marketing Managers', 
                      'Education': 'Master''s Degree', 
                      'Education Level': 8, 
                      'Data Value_Education': 24.36,
                      'Work Experience Level': 10,
                      'Work Experience': '>8 year and upto and including 10 year',
                      'Data Value_Experience': 33.9,
                      'Score': 534.78 }, 
                    { 'Title': 'Distance Learning Coordinators', 
                      'Education': 'Master''s Degree', 
                      'Education Level': 8, 
                      'Data Value_Education': 63.64,
                      'Work Experience Level': 10,
                      'Work Experience': '>8 year and upto and including 10 year',
                      'Data Value_Experience': 0,
                      'Score': 509.12 },  
                    { 'Title': 'Management Analysts', 
                      'Education': 'Master''s Degree', 
                      'Education Level': 8, 
                      'Data Value_Education': 46.15,
                      'Work Experience Level': 10,
                      'Work Experience': '>8 year and upto and including 10 year',
                      'Data Value_Experience': 3.85,
                      'Score': 407.70 }
                    ] '''
    return score_titles_list
    #return final_scored_title_list


def show_alternate_titles(Alternate_Titles_result=[], *args):

    #Read the user input title info - For now, read from test_Data csv file TODO: Update to read from mongo 
    test_data = pd.read_csv("static/Data/test_data.csv") # this would have been input by user 

    #Select only Title column to user has any current title 
    test_data_filtered = test_data[['Title']]
    current_title = test_data_filtered.iloc[0]['Title']
    print(f"Current Title (if any): {current_title}")
    
    #Read Alternate Title list
    Alternate_Titles = pd.DataFrame(Alternate_Titles_result)
    #print(Alternate_Titles)
    AltTitles_pd = Alternate_Titles[['Title', 'Alternate Title', 'Short Title']]
    AltTitles_pd.head() 

    mapping_title = pd.DataFrame()

    #Check and see if current title is empty
    Title_Empty = False
    if (not current_title):
        Title_Empty = True

    #Look for alternate titles only if current title is not empty
    if (Title_Empty == False):
        curr_user_title_list = [current_title]
        mapping_title = AltTitles_pd[(AltTitles_pd['Alternate Title'].isin(curr_user_title_list))]
        if (mapping_title.empty):
            mapping_title = AltTitles_pd[(AltTitles_pd['Short Title'].isin(curr_user_title_list))]

    mapping_title = mapping_title.reset_index(drop=True)
    mapping_title.head()

    user_alternate_titles_pd = mapping_title["Title"]
    print("***********List of ALTERNATE TITLES***********")
    print(user_alternate_titles_pd)
    print("***********End of List of ALTERNATE TITLES***********")

    #Convert to dictionary and return back
    user_alternate_titles = user_alternate_titles_pd.values.tolist()
    return user_alternate_titles


# Run the Application
if __name__ == "__main__":
	app.run(debug = True,port=3316) 

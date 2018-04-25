# Created by: Aruna Amaresan 
# Created Date: April 20th 2018 
#
# Last Modified: April 22nd 2018 
# Last Modified by: Aruna Amaresan
# See below for details on what this module does
import numpy as np
import pandas as pd
import numbers 
import pickle
from sklearn.cluster import KMeans

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

def predict_title_grouping(Knowledge_Cluster_result=[], *args):
	#Result Data to be sent back


	#Load the Kmeans model and predict to get the highlighly likely cluster group based on skills entered by user
	loaded_model = pickle.load(open('static/Models/kmeans_knowledge_cluster.sav', 'rb'))

	#TODO: Update to read from MongoDB the Data to write response from user into a temporary response info
	# For now, read from CSV the input data submitted by user
	test_data = pd.read_csv("static/Data/test_data.csv") # this would have been input by user 
	#test_data.head()
	#For debugging - print all input values
	#expected_target=test_data["Title"]

	#Drop output target column
	test_data = test_data.drop(['Title', 'Education Level', 'Work Experience Level'],axis=1)
	print(test_data)

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
	result = loaded_model.predict(test_data)
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


def score_user(predicted_title_group=[], Education_Experience_result=[], Occupation_result=[], *args):
	
	title_list = predicted_title_group["Title"]
	print("***Predicted Title Grouping based on user knowledge areas****")
	print(title_list)
	print("*************END OF Predicted Title Grouping ****************")

	Ed_Exp = pd.DataFrame(Education_Experience_result)

	#Read input data for now from test_data 
	#TODO: Update to read from MongoDB the Data to write response from user into a temporary response info
	# For now, read from CSV the input data submitted by user
	test_data = pd.read_csv("static/Data/test_data.csv") # this would have been input by user 
	#test_data.head()
	#For debugging - print all input values
	#expected_target=test_data["Title"]

	#Select only Education and Experience columns
	test_data_filtered = test_data[['Education Level', 'Work Experience Level']]
	#print(test_data_filtered)
	ed_level = test_data_filtered.iloc[0]['Education Level']
	exp_level = test_data_filtered.iloc[0]['Work Experience Level']

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
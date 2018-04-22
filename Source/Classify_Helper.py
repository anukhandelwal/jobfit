
# coding: utf-8

# In[27]:


# Created by Aruna Amaresan 
# Created Date: April 20th 2018 
# Last Modified: April 21st 2018 
# See below for details on what this module does
import numpy as np
import pandas as pd
import numbers 
import pickle
from sklearn.cluster import KMeans


# # Career Classify Helper
# Helps identify probable likely of a candidate's chances for a specific career (job title) based on their education level and experinece lveel. 
# 
# Input: 
# - The array or groups of clustered titles for the user's skills (derived from Kmeans clustering neural network)
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

# In[28]:


Ed_Exp = pd.read_csv('../Data/Education_Experience.csv')
Ed_Exp.head()


# ## Input Preprocessing

# In[76]:


#Test Data for now 

input_cluster_list1 = [
                        [9, "Statisticians"], 
                        [9, "Database Architects"],
                        [9, "Software Quality Assurance Engineers and Testers"],
                        [9, "Computer User Support Specialists"],
                        [9, "Mathematical Technicians"],
                        [9, "Computer Systems Analysts"],
                        [9, "Web Developers"], 
                        [9, "Software Developers, Applications"],
                        [9, "Computer Programmers"],
                        [9, "Electronic Drafters"]
                    ]

input_cluster_list2 = [
                        [77, "Information Security Analysts"], 
                        [77, "Telecommunications Engineering Specialists"],
                        [77, "Computer Network Architects"],
                        [77, "Computer Systems Engineers/Architects"],
                        [77, "Database Administrators"], 
                        [77, "Software Developers, Systems Software"],
                        [77, "Computer Network Support Specialists"], 
                        [77, "Network and Computer Systems Administrators"]
                    ]




# In[29]:


#Load the Kmeans model and predict to get the highlighly likely cluster group based on skills entered by user

loaded_model = pickle.load(open('../Models/kmeans_knowledge_cluster.sav', 'rb'))
#testdf=pd.read_csv("../Data/KnowledgeCleansed_Clusters.csv")
#testdf=testdf.set_index("Class")
#skills=pd.read_csv("../Data/knowledgecleansed.csv")
#skills.head()


# In[30]:


# Administration and Management	Clerical	Economics and Accounting	Sales and Marketing	
# Customer and Personal Service	Personnel and Human Resources	Production and Processing	
# Food Production	Computers and Electronics	Engineering and Technology	Design	
# Building and Construction	Mechanical	Mathematics	Physics	Chemistry	Biology	Psychology	Sociology and Anthropology	Geography	Medicine and Dentistry	Therapy and Counseling	Education and Training	English Language	Foreign Language	Fine Arts	History and Archeology	Philosophy and Theology	Public Safety and Security	Law and Government	Telecommunications	Communications and Media	Transportation	Title
test_data = pd.read_csv("../Data/test_data.csv") # this would have been input by user 

test_data.head()


# In[31]:


expected_target=test_data["Title"]
input_data=test_data.drop("Title",axis=1)
feature_name=test_data.columns

print(expected_target)
print(input_data)
print(feature_name)


# In[32]:


test_data.head()

test_data=test_data.drop("Title",axis=1)

test_data.head()


# In[33]:


#Read cluster grouping done by KMeans Cluster model
read_cluster_grouping = pd.read_csv("../Data/KnowledgeCleansed_Clusters.csv")
cluster_group_df = read_cluster_grouping.set_index("Class")

cluster_group_df.head()


# In[34]:


print(cluster_group_df.index)


# In[35]:


result = loaded_model.predict(test_data)
print("The test data belongs to Class: ", result[0])


# In[37]:


selected_title_group =cluster_group_df.loc[cluster_group_df.index==result[0]]
print("The jobs are:",selected_title_group.values)

selected_title_group.head()


# In[ ]:


#Convert to array of arrays 


# In[25]:


#Get all the clustered titles in aformat to filter our bug daatframe list 
title_list = selected_title_group["Title"]

print(title_list)

'''for title_set in selected_title_group:
    for row in title_set:
        print(row)
        if (isinstance(row, numbers.Number) == False):
            #It is a text value and append the title
            title_list.append(row)
'''

#print(row[1])
#title_list.append(row[1])
print("******List of Titles parsed out*********")
for title in title_list:
    print(title)
print("******End of List of Titles parsed out********")


# In[38]:


#Read scoring data set from onenet that is cleansed 
Ed_Exp = pd.read_csv('../Data/Education_Experience.csv')
Ed_Exp.head()


# ## Data Pre-Processing

# In[39]:


Ed_Exp_filtered = pd.DataFrame(Ed_Exp[Ed_Exp["Title"].isin(title_list)])
#df[df['A'].isin([3, 6])]
#print (Ed_Exp_filtered)
Ed_Exp_filtered.head(50)

#Calculate the scores for each row
#df['Z'] = df.loc[:, 'B':'Y'].sum(1)

#df['z'] = np.sqrt(df['x']**2 + df['y']**2)

Ed_Exp_filtered['Score'] =((Ed_Exp_filtered['Education Level'] * Ed_Exp_filtered['Data Value_Education']) +
                           (Ed_Exp_filtered['Work Experience Level'] * Ed_Exp_filtered['Data Value_Experience']))


Ed_Exp_filtered.head()                                 


# In[40]:


#Get user's input on Education Level and Experience

while True:
    try:
        print("*****Education Level**************")
        print ("1 - Less than High School Diploma")
        print ("2 - High School Diploma")
        print ("3 - Post Secondary Certificate")
        print ("4 - Some College Course")
        print ("5 - Associate's Degree")
        print ("6 - Bachelors's Degree")
        print ("7 - Post-Baccalaureate Certificate")
        print ("8 - Master's Degree")
        print ("9 - Post-Master's Certificate")
        print ("10 - First Professional Degree")
        print ("11 - Doctoral Degree")
        print ("12 - Post-Doctoral Training")
        print("******End of Education Levels*******")
        ed_level = int(input("Please enter suitable Education Level (1-12):"))
    except ValueError:
        print("Sorry, I didn't understand that.")
        #better try again... Return to the start of the loop
        continue
    else:
        #edd_level was successfully parsed!
        #we're ready to exit the loop.
        break

print(f"Education Level: {ed_level}")


# In[41]:


#Get experinece level 

while True:
    try:
        print("*******Experience Level***********")
        print ("1 - No experience")
        print ("2 - Upto 1 month experience")
        print ("3 - (1-3 months) experience")
        print ("4 - (3-6 months) experience")
        print ("5 - (6 months - 1 year) experience")
        print ("6 - (1-2 years) experience")
        print ("7 - (2-4 years) experience")
        print ("8 - (4-6 years) experience")
        print ("9 - (6-8 years) experience")
        print ("10 - (8-10 years) experience")
        print ("11 - (> 10 years) experience")
        print("*******End of Experience Level******")
        exp_level = int(input("Please enter suitable Experience Level (1-11):"))
    except ValueError:
        print("Sorry, I didn't understand that.")
        #better try again... Return to the start of the loop
        continue
    else:
        #edd_level was successfully parsed!
        #we're ready to exit the loop.
        break

print(f"Experience Level: {exp_level}")


# In[42]:


#Take as input the data that the user entered currently also in the calculation 


#print("*******Your current Title***********")

#print("*******End of current title*******")
current_title = str(input("Please enter current title:"))


print(f"Current Title: {current_title}")


# In[43]:


#Filter the user list basd on user experinece and education level under the clustered group of titles
# Shows results for the user scores 
print(f"Education Level: {ed_level}")
print(f"Experience Level: {exp_level}")
print(f"Current Title: {current_title}")

user_ed_list = [ed_level]
user_exp_list = [exp_level]

Ed_Exp_User_filtered = pd.DataFrame(Ed_Exp_filtered[(Ed_Exp_filtered["Education Level"].isin(user_ed_list)) & 
                                                (Ed_Exp_filtered["Work Experience Level"].isin(user_exp_list))])

#df[(df['col1'] >= 1) & (df['col1'] <=1 )]
#df[df['A'].isin([3, 6])]
#print (Ed_Exp_filtered)
Ed_Exp_User_filtered.head(50)



# In[44]:


Curr_Title_user_filtered = pd.DataFrame()
Title_Empty = False

if (not current_title): 
    Title_Empty = True
    curr_user_title_list = [current_title]
    Curr_Title_user_filtered = Ed_Exp_filtered[(Ed_Exp_filtered["Title"].isin(curr_user_title_list))]

#if current title is empty, then look up alternate titles info to find the appropriate title 
Curr_Title_user_filtered.head()


# In[45]:


Alternate_Titles = pd.read_csv('../Data/AlternateTitles.csv')
Alternate_Titles.head()

AltTitles_pd = Alternate_Titles[['Title', 'Alternate Title', 'Short Title']]

AltTitles_pd.head() 


#df1 = df[['a','b']]


# In[87]:


#AltTitles_pd.to_csv('../Data/AlternateTitlesCleansed.csv')



# In[46]:


print (Curr_Title_user_filtered.empty)


# In[47]:


curr_user_title_list = [current_title]

mapping_title = pd.DataFrame()

if ((Curr_Title_user_filtered.empty == True) and (Title_Empty == False)):
    #Need to find if I can find the data in alternate title 
    mapping_title = AltTitles_pd[(AltTitles_pd["Alternate Title"].isin(curr_user_title_list))]


mapping_title = mapping_title.reset_index(drop=True)

mapping_title.head()


# In[48]:


#return the alternate titles
Alternate_titles = mapping_title["Title"]

print(Alternate_titles)
    
#mapping_title = AltTitles_pd[(AltTitles_pd["Alternate Title"].isin(curr_user_title_list))]

#mapping_title.head()


# ## Score and Make Predictions Based on probability of users education and experience

# In[49]:


#Print user career opportunities - 

#Print results based on classification possibilities 
#user_career_options = {}

Ed_Exp_User_Ordered = Ed_Exp_User_filtered.sort_values(by='Score', ascending=False)

Ed_Exp_User_Ordered.head(20)



# In[50]:



for index, row in Ed_Exp_User_Ordered.iterrows():
    print (row['Title'], row['Education'], row['Work Experience'])


# In[12]:





# In[15]:





# ## Quantify our Trained Model

# In[16]:





# In[34]:





# ## Make Predictions

# In[36]:





# In[21]:





# In[17]:





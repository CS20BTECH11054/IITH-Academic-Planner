**To run the program successfully, follow the steps below:**
1. when running for the first time, run npm install
2. Go to the backend folder and use npm start to start the server.
3. Then go to the client folder and run npm start to start the website.

**How to use the website:**

After entering the website, 

**Home Page:**
1. First user should sign in with google, before accessing any functionalities.
2. Then, in Home page he can add tasks and click on a date in the calendar to see tasks on that day.
3. To Add Tasks, he should enter date in MM/DD/YYYY format only. 
4. All the daily tasks and weekly tasks are shown below in the website.

**Timetable Page:**
1. Here, the user can click on update button to get all current sem courses and slots added by user from database and they will be automatically shown at their corresponding slots.
2. Then, a user can add slots by typing the slot name and slot type.

**Courses Page:**
1. In this page, user can add courses to his account. So, that all current sem courses will be used in Timetable page to show timetable.
2. Then, the user can click on mycourses button to fetch all his courses, then click on CGPA/MAXCGPA for corresponding GPA calculations.
3. User can also delete a course from his account by selecting a course and delete it from his account.

Note: Some parts backend integration of this page was not completed, due to lack of time.

**CourseRoad Page**:
1. In this page, user can select a department, then all core courses will be automatically loaded to semesters.
2. Based on whether prerequisites are satisfied or timetable clashes, we show them with an exclamation mark.
3. Course in green color means no clashes, a red color with exclamation mark means some clash occured.
4. Courses can be added to course road by searching and when click on semester name, then remaining type of credits are shown.
5. The courses are draggable from one sem to another.

Note: Some parts backend integration of this page was not completed, due to lack of time.


**Implementation Details**:

React-router dom was used for navigation purposes, and defaultly whenever the website opens, user is directed to homepage. The Header page and Navbar is present in everypage and was implemented in Components folder. Then, we have pages folder where main code of the pages of home, course, courseroad and Timetable are implemented. Some components of CourseRoad and Timetable are implemented in components folder to maintain modularity and for easy extension of code.

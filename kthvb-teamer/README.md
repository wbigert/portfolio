# Description
Teamer is an App used for sports teams to schedule practices and events. However, I was unhappy with the existing queue system, since it doesn't allow participants to place themselves in a queue. This Python program handles an external queue system that works automatically with Teamer by mimicking web requests. Further, I automate the assignment of ball duty for KTH Volleyball (the act of carrying the balls and antennas from our storage to our hall). I used this privately over summer to organize my own Volleyball practices on Teamer. As IT manager and President of KTH Volleyball I also made us transition from using Facebook Messanger for handling practice attendance and ball duty, to using Teamer and this automation script. This greatly reduced the amount of manual work needed, and allows us to track a history of attendance to report to IdrottOnline to receive LOK-stöd for our coached practices.

# How to use
### After populating the following .env variables:
    CONNECTION_STRING=<mongo_db_connection_string>
    TEAMER_LOGIN="&email=<email_url_encoded>&password=<password>"
    TEAMER_MEMBER="<member_id>-<member_first_name>-<member_last_name>"
    TEAM_NAME="<team_id>-<team_name_spaces_replaced_with_dash>"

### It will work in the following way:
- Always leave the Teamer max participants limit empty when creating events. 
- Enter a custom event title such as "Training 28PPL 3BD" to set your limit. Any number placed before "PPL" will be used as the maximum number of participants for that event, and the queue system will be active. And any number before BD will be used as the number of members called for ball duty.
- The Teamer login information in your environmental variable must be for an account with admin powers.
- When a user accepts an event when it is already full, that person will be automatically set to "Declined" and will receive an email that they have been put in the queue.
- When a user accepts a second time after already being in the queue, they will be removed from it and will receive an email indicating this.
- When a user that already has a spot changes to "Declined", the first person in the queue for that will be changed to "Accepted" automatically and will receive an email indicating this.
- 5 hours prior to an event's starting time, the ball duty system will call the X amount of people with the least ball duties in the current season. If a player declines (perhaps they will not make it in time before practice) a new person will be called, and the database ball duty count will be updated accordingly. 

### Things to note
- The system utilizes Teamtalk discussions and creates them repeatedly to notify members of their queue spots. This will create a lot of Teamtalk discussion posts, so if you were planning to use Teamtalk, then perhaps do not use this system.

